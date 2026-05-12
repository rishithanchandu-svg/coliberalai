from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Optional Google Sheets webhook (Apps Script Web App URL). If set, lead form
# submissions are forwarded to this URL which appends a row to a Google Sheet.
GOOGLE_SHEETS_WEBHOOK_URL = os.environ.get('GOOGLE_SHEETS_WEBHOOK_URL', '').strip()

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    work_email: EmailStr
    company_name: str = Field(min_length=1, max_length=160)
    industry: str = Field(min_length=1, max_length=60)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    work_email: str
    company_name: str
    industry: str
    submitted_at: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "coliberalai API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    status_obj = StatusCheck(**payload.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


def _forward_to_sheet(row: dict):
    """Blocking HTTP POST to Google Apps Script webhook. Raises on failure."""
    if not GOOGLE_SHEETS_WEBHOOK_URL:
        raise RuntimeError("GOOGLE_SHEETS_WEBHOOK_URL not configured")
    resp = requests.post(
        GOOGLE_SHEETS_WEBHOOK_URL,
        json=row,
        timeout=10,
        allow_redirects=True,
    )
    if not (200 <= resp.status_code < 300):
        raise RuntimeError(f"Sheet webhook returned HTTP {resp.status_code}")


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    if not GOOGLE_SHEETS_WEBHOOK_URL:
        raise HTTPException(
            status_code=503,
            detail=(
                "Lead capture is not configured yet. Ask the site owner to set the "
                "GOOGLE_SHEETS_WEBHOOK_URL environment variable."
            ),
        )

    now = datetime.now(timezone.utc).isoformat()
    lead_id = str(uuid.uuid4())

    row = {
        "id": lead_id,
        "name": payload.name.strip(),
        "work_email": payload.work_email.lower().strip(),
        "company_name": payload.company_name.strip(),
        "industry": payload.industry.strip(),
        "submitted_at": now,
    }

    try:
        await asyncio.to_thread(_forward_to_sheet, row)
    except Exception as exc:
        logger.error("Google Sheets webhook failed: %s", exc)
        raise HTTPException(
            status_code=502,
            detail="Could not save your details right now. Please try again.",
        )

    return Lead(**row)


# Mount router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
