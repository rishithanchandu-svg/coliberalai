# coliberalai — Product Requirements Document

## Original problem statement
Build a premium, high-conversion landing page for 'coliberalai', an AI agency
specializing in Human-Like Voice Agents for Clinics, Real Estate, and E-commerce.
Key sections: Hero, Audio Demo, Vertical Solutions (Medical/Real Estate/E-commerce),
ROI Calculator, "Book a Free Voice Demo" CTA.

## User choices
- Audio demo: plays a sample audio file (royalty-free placeholder)
- CTA: Links to external Calendly URL (placeholder: `https://calendly.com/coliberalai/voice-demo`)
- ROI Calculator: Interactive (two sliders → live computed output)
- Design vibe: Light editorial / modern SaaS
- Branding: Fresh identity created

## Architecture
- **Frontend**: React 19 (CRA/craco) + Tailwind + shadcn/ui (Accordion, Sonner)
- **Backend**: FastAPI template untouched (no backend features needed for MVP — static marketing page)
- **Fonts**: Playfair Display (headings), Manrope (body), JetBrains Mono (numbers/labels)
- **Colors**: Off-white `#F8F7F4`, cream `#EFECE6`, ink `#1A1A1A`, vermilion accent `#D94832`, dark inversion `#151515`
- **Layout**: Single-page at `/`, asymmetric editorial grid, bento-grid solutions, dark inverted footer

## User personas
- **Clinic operator / practice manager** — losing after-hours and overflow calls
- **Real estate broker** — needs instant lead response & viewing bookings
- **E-commerce ops lead** — drowning in WISMO / returns phone support
- **Agency decision-maker** — evaluating vendor quality, wants to hear voice quality live

## What's been implemented (2025-12)
- Sticky glass nav with smooth-scroll anchor links + primary CTA
- Hero: massive serif headline, sub-copy, dual CTA, asymmetric stats card, grain texture
- Trust marquee (horizontal scrolling, lucide icon + brand name)
- Audio Demo section: Play/Pause button, animated waveform, progress bar, transcript, HTML5 `<audio>` playing sample mp3
- Three vertical solution cards (Medical, Real Estate, E-commerce) with bg images, gradient overlays, vertical-specific bullets
- How It Works: editorial 3-step list (01/02/03) with Playfair numbering
- Interactive ROI Calculator: two sliders (monthly calls, avg lead value) with live-computed added revenue, hours saved, captured leads
- Testimonials section: primary quote + secondary card with pexels/unsplash avatars
- FAQ: shadcn Accordion with 6 Q&A
- Dark footer: massive serif CTA "Book a free voice demo." + Calendly link + secondary links
- data-testid on every interactive element

## Core requirements (static)
- Must sound like a premium, high-ticket B2B agency
- Every section must push toward "Book a Free Voice Demo" (Calendly)
- Fully responsive, fast-loading, no console errors

## Prioritized backlog
### P0 — Done
- [x] All required sections rendered and functional
- [x] Audio demo playable
- [x] ROI calculator interactive
- [x] Calendly CTAs wired

### P1 — Deferred for future iterations
- [ ] Replace placeholder Calendly URL with real one (currently `https://calendly.com/coliberalai/voice-demo`)
- [ ] Self-host the demo audio with a real AI voice-agent recording (current: soundhelix placeholder)
- [ ] Replace placeholder brand names in trust marquee with real logos once signed
- [ ] Add client case-study pages (linked from solution cards)
- [ ] Add "Request a transcript of a live call" optional lead-capture form
- [ ] Analytics events (PostHog already loaded): track CTA clicks, calculator usage, FAQ expansions
- [ ] SEO meta tags, OG images, JSON-LD organization schema

### P2
- [ ] Multi-language variants (EN/ES)
- [ ] Live voice demo powered by ElevenLabs / OpenAI realtime (replaces static mp3)
- [ ] Exit-intent modal with simplified booking form

## Next tasks
1. Hand off final Calendly URL + real demo recording to swap placeholders in `/app/frontend/src/lib/constants.js`
2. Add analytics event tracking on CTA / calculator / FAQ interactions
3. SEO + OG image generation
