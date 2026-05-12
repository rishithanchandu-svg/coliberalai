import { IMG } from "@/lib/constants";
import { ArrowUpRight, Phone } from "lucide-react";
import { useDemoModal } from "@/components/LeadFormModal";

export const Hero = () => {
  const { open } = useDemoModal();
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Texture background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.45]"
        style={{
          backgroundImage: `url(${IMG.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F8F7F4]/0 via-[#F8F7F4]/40 to-[#F8F7F4]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 gap-6">
        {/* Eyebrow */}
        <div className="col-span-12 flex items-center gap-3 fade-up">
          <span className="inline-block w-10 h-px bg-[#1A1A1A]/50" />
          <span className="eyebrow">Voice AI for Coaching · Real Estate · E-commerce · Agencies · Salons · Home Services · SaaS</span>
        </div>

        {/* Headline */}
        <h1
          data-testid="hero-headline"
          className="col-span-12 lg:col-span-11 font-heading font-light tracking-[-0.02em] text-[#1A1A1A] leading-[1.02] text-5xl sm:text-6xl md:text-7xl lg:text-[96px] mt-6 fade-up"
          style={{ animationDelay: "80ms" }}
        >
          Never miss a lead{" "}
          <span className="italic font-normal text-[#D94832]">again.</span>
          <br />
          Our AI voice agents handle
          <br />
          the phone, <span className="italic">24/7.</span>
        </h1>

        {/* Sub-copy + CTAs */}
        <div
          className="col-span-12 lg:col-span-7 mt-10 fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-lg md:text-xl text-[#5C5C5C] leading-relaxed max-w-xl">
            Appointment booking, lead qualification, and customer support — delivered by
            voice agents that sound <span className="text-[#1A1A1A]">100% human</span>.
            Deployed in 14 days. Billed by the minute, not the month.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={open}
              data-testid="hero-cta-button"
              className="btn-primary group"
            >
              Book a free voice demo
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a href="#demo" data-testid="hero-secondary-cta" className="btn-secondary">
              <Phone className="w-4 h-4" />
              Hear it in action
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-[#5C5C5C]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94832] animate-pulse" />
              Live in 14 days
            </span>
            <span>· &lt; 700ms response latency</span>
          </div>
        </div>

        {/* Asymmetric stats card */}
        <aside
          className="hidden lg:flex col-span-5 mt-10 self-end fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <div className="ml-auto w-full max-w-sm bg-white/70 backdrop-blur border border-[rgba(26,26,26,0.1)] rounded-3xl p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5C5C5C] mb-4">
              Last 30 days · Pilot clients
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-6xl text-[#1A1A1A] leading-none">
                38<span className="text-[#D94832]">%</span>
              </span>
              <span className="text-sm text-[#5C5C5C]">more booked appointments</span>
            </div>
            <div className="mt-6 h-px bg-[rgba(26,26,26,0.1)]" />
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-heading text-4xl text-[#1A1A1A] leading-none">0</span>
              <span className="text-sm text-[#5C5C5C]">missed calls after 6pm</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
