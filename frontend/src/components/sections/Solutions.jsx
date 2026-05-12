import { ArrowUpRight, GraduationCap, Home, ShoppingBag } from "lucide-react";
import { IMG } from "@/lib/constants";

const CARDS = [
  {
    key: "coaching",
    tag: "01 · Coaching & Consulting",
    title: "Qualify every inquiry. Book every discovery call.",
    body:
      "Answers inbound calls, qualifies the prospect, books the discovery session on your calendar and upsells into your signature program — warm, on-brand, 24/7.",
    bullets: ["Calendar sync", "Package upsells", "CRM handoff"],
    icon: GraduationCap,
    img: IMG.coaching,
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    key: "real-estate",
    tag: "02 · Real Estate",
    title: "Instant lead qualification & viewing booking.",
    body:
      "Answers every inbound within one ring, qualifies budget & timeline, then books showings directly on your agent's calendar.",
    bullets: ["CRM handoff", "SMS follow-up"],
    icon: Home,
    img: IMG.realEstate,
    span: "lg:col-span-5",
  },
  {
    key: "ecommerce",
    tag: "03 · E-commerce",
    title: "Phone-based order tracking & support.",
    body:
      "Handles WISMO calls, returns and subscription changes — pulling live data from Shopify, Stripe and your fulfillment stack.",
    bullets: ["Shopify · WooCommerce", "Refund authorization"],
    icon: ShoppingBag,
    img: IMG.ecommerce,
    span: "lg:col-span-5",
  },
];

export const Solutions = () => {
  return (
    <section
      id="solutions"
      data-testid="solutions-section"
      className="py-24 md:py-32 bg-[#F8F7F4]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">/ Verticals</div>
            <h2 className="font-heading font-light tracking-tight text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Built for the industries where{" "}
              <span className="italic text-[#D94832]">every call matters.</span>
            </h2>
          </div>
          <p className="text-[#5C5C5C] max-w-sm text-base md:text-lg">
            Three specialised voice agents. Same philosophy: sound human, close the loop,
            write everything back to your system of record.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.key}
                data-testid={`solution-card-${c.key}`}
                className={`group relative overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.1)] bg-[#151515] text-[#F8F7F4] min-h-[420px] lg:min-h-[480px] ${c.span} transition-all duration-500 hover:border-[rgba(26,26,26,0.4)]`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `url(${c.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/70 to-[#151515]/20"
                  aria-hidden
                />
                <div className="relative h-full p-8 md:p-10 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F8F7F4]/70">
                      {c.tag}
                    </span>
                    <Icon className="w-5 h-5 text-[#F8F7F4]/70" strokeWidth={1.5} />
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-heading font-light text-[#F8F7F4] text-3xl md:text-4xl leading-tight tracking-tight max-w-md">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-[#F8F7F4]/75 text-[15px] leading-relaxed max-w-md">
                      {c.body}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-[#F8F7F4]/25 text-[#F8F7F4]/80"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex items-center gap-2 text-[#F8F7F4] text-sm font-medium opacity-80 group-hover:opacity-100 transition">
                      Explore this agent
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
