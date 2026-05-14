import { createContext, useCallback, useContext, useState } from "react";
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
    setForm({
      name: "",
      work_email: "",
      company_name: "",
      industry: "",
    });
    setStatus("idle");
    setErrors({});
  };

  const onClose = (next) => {
    setIsOpen(next);
    if (!next) setTimeout(reset, 200);
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
    evt.preventDefault();

    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("work_email", form.work_email);
      formData.append("company_name", form.company_name);
      formData.append("industry", form.industry);

      await fetch(
        "https://script.google.com/macros/s/AKfycbzoMQK6AVqVSYq_HDPo5mqfA7vIRyk6TrbYjIb-qsO-iuUeuUoNevzDGlE4C-Y8x6VY/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      setStatus("success");

      toast.success("You're in — we'll be in touch within 1 business day.");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("Couldn't submit. Please try again.");
    }
  };

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e?.target ? e.target.value : e,
    }));

  return (
    <DemoModalContext.Provider value={{ open }}>
      {children}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!max-w-[520px] bg-[#F8F7F4] rounded-3xl p-0 overflow-hidden">

          {status === "success" ? (
            <div className="p-10 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Booked. Thank you.
                </DialogTitle>

                <DialogDescription>
                  We'll contact you within one business day.
                </DialogDescription>
              </DialogHeader>

              <button
                onClick={() => onClose(false)}
                className="mt-6 px-4 py-2 bg-black text-white rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-8 space-y-4">

              <DialogHeader>
                <DialogTitle>Tell us about your business</DialogTitle>
                <DialogDescription>
                  30-second form — we’ll reach out soon.
                </DialogDescription>
              </DialogHeader>

              <Field
                label="Your name"
                value={form.name}
                error={errors.name}
                onChange={update("name")}
              />

              <Field
                label="Work email"
                value={form.work_email}
                error={errors.work_email}
                onChange={update("work_email")}
              />

              <Field
                label="Company name"
                value={form.company_name}
                error={errors.company_name}
                onChange={update("company_name")}
              />

              <div>
                <Label>Industry</Label>

                <Select
                  value={form.industry}
                  onValueChange={update("industry")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>

                  <SelectContent>
                    {INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.industry && (
                  <p className="text-red-500 text-sm">
                    {errors.industry}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-black text-white py-3 rounded-xl flex justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book demo
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DemoModalContext.Provider>
  );
};

const Field = ({ label, value, onChange, error }) => (
  <div>
    <Label>{label}</Label>

    <Input value={value} onChange={onChange} />

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default DemoModalProvider;
