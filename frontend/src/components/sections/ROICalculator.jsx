import { useMemo, useState } from "react";
import { useDemoModal } from "@/components/LeadFormModal";
import { ArrowUpRight } from "lucide-react";

export const ROICalculator = () => {
  const { open } = useDemoModal();
  const [calls, setCalls] = useState(1200); // monthly inbound calls
  const [value, setValue] = useState(180); // avg value per converted lead ($)

  const { hoursSaved, addedRevenue, capturedLeads } = useMemo(() => {
    // Assumptions derived from pilot data:
    // - ~30% more leads captured (missed calls + after-hours)
    // - Avg handled call = 4 mins; 60% fully automated => staff time freed
    const avgMin = 4;
    const automationRate = 0.6;
    const hours = Math.round((calls * avgMin * automationRate) / 60);
    const extraLeads = Math.round(calls * 0.3);
    const rev = extraLeads * value;
    return { hoursSaved: hours, addedRevenue: rev, capturedLeads: extraLeads };
  }, [calls, value]);

  const money = (n) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <section
      id="roi"
      data-testid="roi-section"
      className="py-24 md:py-32 bg-[#EFECE6]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 gap-10 lg:gap-12">
        {/* Copy + Inputs */}
        <div className="col-span-12 lg:col-span-6">
          <div className="eyebrow mb-4">/ ROI Calculator</div>
          <h2 className="font-heading font-light tracking-tight text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Save 40+ hours a week. Capture{" "}
            <span className="italic text-[#D94832]">30% more leads.</span>
          </h2>
          <p className="mt-6 text-[#5C5C5C] text-lg max-w-lg">
            Pull the sliders. See what coliberalai would return for a business your size.
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <label className="eyebrow" htmlFor="calc-volume">
                  Monthly inbound calls
                </label>
                <span
                  data-testid="calc-volume-value"
                  className="font-heading text-3xl text-[#1A1A1A]"
                >
                  {calls.toLocaleString()}
                </span>
              </div>
              <input
                id="calc-volume"
                data-testid="calc-volume-slider"
                type="range"
                min="100"
                max="10000"
                step="50"
                value={calls}
                onChange={(e) => setCalls(Number(e.target.value))}
              />
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5C5C] mt-2">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-4">
                <label className="eyebrow" htmlFor="calc-value">
                  Avg value per converted lead
                </label>
                <span
                  data-testid="calc-value-value"
                  className="font-heading text-3xl text-[#1A1A1A]"
                >
                  {money(value)}
                </span>
              </div>
              <input
                id="calc-value"
                data-testid="calc-value-slider"
                type="range"
                min="25"
                max="2500"
                step="5"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5C5C] mt-2">
                <span>$25</span>
                <span>$2,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-[#F8F7F4] rounded-3xl border border-[rgba(26,26,26,0.1)] p-8 md:p-12 h-full flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5C5C5C]">
              Projected · Per month
            </span>

            <div className="mt-8 border-b border-[rgba(26,26,26,0.1)] pb-8">
              <div
                data-testid="roi-revenue"
                className="font-heading font-light text-[#D94832] text-6xl md:text-7xl lg:text-[96px] tracking-tight leading-none"
              >
                {money(addedRevenue)}
              </div>
              <div className="mt-3 text-[#5C5C5C]">
                added revenue from{" "}
                <span className="text-[#1A1A1A] font-medium">
                  {capturedLeads.toLocaleString()}
                </span>{" "}
                previously-missed leads
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div
                  data-testid="roi-hours"
                  className="font-heading text-5xl text-[#1A1A1A] leading-none"
                >
                  {hoursSaved}
                </div>
                <div className="eyebrow mt-3">Hours saved / mo</div>
              </div>
              <div>
                <div className="font-heading text-5xl text-[#1A1A1A] leading-none">24/7</div>
                <div className="eyebrow mt-3">Answer rate</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <button
                onClick={open}
                data-testid="roi-cta-button"
                className="btn-primary group"
              >
                Book a free demo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="text-xs text-[#5C5C5C] font-mono">
                * Estimates based on 60% automation rate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
