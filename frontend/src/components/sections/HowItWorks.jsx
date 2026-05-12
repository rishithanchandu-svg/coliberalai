const STEPS = [
  {
    n: "01",
    title: "Map your call flows",
    body:
      "We shadow your team for 3 days, transcribe your top 50 call types, and design the exact conversation tree.",
  },
  {
    n: "02",
    title: "Train on your data",
    body:
      "Your agent ingests past calls, SOPs, pricing and FAQs. It's calibrated for tone, accents and objection handling.",
  },
  {
    n: "03",
    title: "Go live in 14 days",
    body:
      "Forward a number. The agent answers, routes, and writes back to your CRM. Humans handle only the edge cases.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how"
      data-testid="how-it-works-section"
      className="py-24 md:py-32 bg-[#F8F7F4]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="eyebrow mb-4">/ Process</div>
        <h2 className="font-heading font-light tracking-tight text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
          Three weeks from kickoff to a phone line that{" "}
          <span className="italic text-[#D94832]">actually works.</span>
        </h2>

        <div className="mt-16 divide-y divide-[rgba(26,26,26,0.12)] border-y border-[rgba(26,26,26,0.12)]">
          {STEPS.map((s) => (
            <div
              key={s.n}
              data-testid={`step-${s.n}`}
              className="grid grid-cols-12 gap-6 py-10 md:py-14 group"
            >
              <div className="col-span-12 md:col-span-2 font-heading font-light text-5xl md:text-6xl text-[#1A1A1A]/20 group-hover:text-[#D94832] transition-colors">
                {s.n}
              </div>
              <h3 className="col-span-12 md:col-span-5 font-heading text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A] leading-tight">
                {s.title}
              </h3>
              <p className="col-span-12 md:col-span-5 text-[#5C5C5C] text-base md:text-lg leading-relaxed md:pt-2">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
