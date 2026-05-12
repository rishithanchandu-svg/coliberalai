import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INDUSTRIES = [
  "Coaching & Consulting",
  "Real Estate",
  "E-commerce",
  "Agencies",
  "Salons",
  "Home Services",
  "SaaS",
  "Other",
];

const DemoModalContext = createContext({ open: () => {} });

export const useDemoModal = () => useContext(DemoModalContext);

export const DemoModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [form, setForm] = useState({
    name: "",
    work_email: "",
    company_name: "",
    industry: "",
  });
  const [errors, setErrors] = useState({});

  const open = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setIsOpen(true);
  }, []);

  const reset = () => {
    setForm({ name: "", work_email: "", company_name: "", industry: "" });
    setStatus("idle");
    setErrors({});
  };

  const onClose = (next) => {
    setIsOpen(next);
    if (!next) {
      // small delay so the fade-out looks clean
      setTimeout(reset, 200);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.work_email.trim()) e.work_email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.work_email))
      e.work_email = "Invalid email";
    if (!form.company_name.trim()) e.company_name = "Required";
    if (!form.industry) e.industry = "Pick one";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (evt) => {
    evt?.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;
    setStatus("submitting");
    try {
      await axios.post(`${API}/leads`, form);
      setStatus("success");
      toast.success("You're in — we'll be in touch within 1 business day.");
    } catch (err) {
      setStatus("idle");
      toast.error("Couldn't submit. Please try again.");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));

  return (
    <DemoModalContext.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          data-testid="demo-modal"
          className="!max-w-[520px] bg-[#F8F7F4] border border-[rgba(26,26,26,0.1)] rounded-3xl p-0 overflow-hidden"
        >
          {status === "success" ? (
            <div className="p-10 text-center" data-testid="demo-modal-success">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#D94832]/10 text-[#D94832] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <DialogHeader className="space-y-3">
                <DialogTitle className="font-heading text-3xl font-light text-[#1A1A1A] tracking-tight text-center">
                  Booked. <span className="italic text-[#D94832]">Thank you.</span>
                </DialogTitle>
                <DialogDescription className="text-[#5C5C5C] text-base text-center">
                  We'll reach out within one business day to schedule your live
                  voice-agent demo — tailored to{" "}
                  <span className="text-[#1A1A1A]">{form.industry}</span>.
                </DialogDescription>
              </DialogHeader>
              <button
                onClick={() => onClose(false)}
                className="mt-8 btn-secondary !py-3"
                data-testid="demo-modal-close"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-8 md:p-10">
              <DialogHeader className="space-y-3 text-left">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5C5C5C]">
                  / Book your demo
                </div>
                <DialogTitle className="font-heading text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight leading-tight">
                  Tell us about your business.
                </DialogTitle>
                <DialogDescription className="text-[#5C5C5C] text-[15px]">
                  30-second form. We'll reply within one business day with a time
                  for a live voice demo.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-7 space-y-5">
                <Field
                  id="lead-name"
                  label="Your name"
                  error={errors.name}
                  inputProps={{
                    value: form.name,
                    onChange: update("name"),
                    placeholder: "Alex Morgan",
                    autoComplete: "name",
                    "data-testid": "lead-name-input",
                  }}
                />
                <Field
                  id="lead-email"
                  label="Work email"
                  error={errors.work_email}
                  inputProps={{
                    type: "email",
                    value: form.work_email,
                    onChange: update("work_email"),
                    placeholder: "alex@company.com",
                    autoComplete: "email",
                    "data-testid": "lead-email-input",
                  }}
                />
                <Field
                  id="lead-company"
                  label="Company name"
                  error={errors.company_name}
                  inputProps={{
                    value: form.company_name,
                    onChange: update("company_name"),
                    placeholder: "Acme Coaching",
                    autoComplete: "organization",
                    "data-testid": "lead-company-input",
                  }}
                />
                <div>
                  <Label
                    htmlFor="lead-industry"
                    className="eyebrow block mb-2"
                  >
                    Industry
                  </Label>
                  <Select
                    value={form.industry}
                    onValueChange={(v) => update("industry")(v)}
                  >
                    <SelectTrigger
                      id="lead-industry"
                      data-testid="lead-industry-select"
                      className="h-12 bg-transparent border border-[rgba(26,26,26,0.2)] rounded-xl px-4 font-body text-[15px] text-[#1A1A1A] focus:ring-[#D94832] focus:border-[#D94832]"
                    >
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#F8F7F4] border border-[rgba(26,26,26,0.1)] rounded-xl">
                      {INDUSTRIES.map((ind) => (
                        <SelectItem
                          key={ind}
                          value={ind}
                          data-testid={`lead-industry-opt-${ind.replace(/[^a-z]/gi, "-").toLowerCase()}`}
                          className="font-body text-[15px]"
                        >
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="mt-1 text-xs text-[#D94832]">{errors.industry}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                data-testid="lead-submit-button"
                disabled={status === "submitting"}
                className="mt-8 btn-primary w-full justify-center disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Book my demo
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-xs text-[#5C5C5C] text-center">
                By submitting you agree to be contacted about coliberalai. No spam — ever.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DemoModalContext.Provider>
  );
};

const Field = ({ id, label, error, inputProps }) => (
  <div>
    <Label htmlFor={id} className="eyebrow block mb-2">
      {label}
    </Label>
    <Input
      id={id}
      {...inputProps}
      className={`h-12 bg-transparent border rounded-xl px-4 font-body text-[15px] text-[#1A1A1A] placeholder:text-[#5C5C5C]/60 focus-visible:ring-1 focus-visible:ring-[#D94832] focus-visible:border-[#D94832] ${
        error ? "border-[#D94832]" : "border-[rgba(26,26,26,0.2)]"
      }`}
    />
    {error && <p className="mt-1 text-xs text-[#D94832]">{error}</p>}
  </div>
);

export default DemoModalProvider;
