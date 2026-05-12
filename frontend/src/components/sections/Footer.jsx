import { ArrowUpRight } from "lucide-react";
import { useDemoModal } from "@/components/LeadFormModal";

export const Footer = () => {
  const { open } = useDemoModal();
  return (
    <footer
      data-testid="footer-section"
      className="relative bg-[#151515] text-[#F8F7F4] overflow-hidden"
    >
      {/* Massive CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <div className="eyebrow !text-[#F8F7F4]/60 mb-6">/ Start the conversation</div>
        <h2 className="font-heading font-light tracking-tight leading-[0.95] text-[#F8F7F4] text-6xl sm:text-7xl md:text-8xl lg:text-[160px]">
          Book a free
          <br />
          <span className="italic text-[#D94832]">voice demo.</span>
        </h2>

        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-[#F8F7F4]/70 max-w-md text-base md:text-lg">
            20 minutes. We'll show you a live agent, tailored to your vertical, and map
            out a 14-day go-live plan for your team.
          </p>
          <button
            onClick={open}
            data-testid="footer-calendly-link"
            className="group inline-flex items-center gap-3 self-start px-8 py-5 rounded-full bg-[#D94832] hover:bg-[#B33824] text-[#F8F7F4] font-medium transition"
          >
            Book demo
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <div className="border-t border-[#F8F7F4]/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between text-sm text-[#F8F7F4]/60">
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl text-[#F8F7F4]">
              coliberal<span className="text-[#D94832]">.</span>ai
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] ml-2">
              Human-like voice AI
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#solutions" className="hover:text-[#F8F7F4] transition">Solutions</a>
            <a href="#how" className="hover:text-[#F8F7F4] transition">Process</a>
            <a href="#roi" className="hover:text-[#F8F7F4] transition">ROI</a>
            <a href="#faq" className="hover:text-[#F8F7F4] transition">FAQ</a>
          </div>
          <div>© {new Date().getFullYear()} coliberalai. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
