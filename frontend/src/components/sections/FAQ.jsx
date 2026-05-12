import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ITEMS = [
  {
    q: "Does it really sound human?",
    a: "Our agents use the latest low-latency voice models (sub-700ms). On blind tests, 78% of callers couldn't tell. Book a demo and judge for yourself.",
  },
  {
    q: "How long does deployment take?",
    a: "Most clients go live in 14 days. We shadow your team for 3 days, build the flow, train on your data, then roll forward from a single test number.",
  },
  {
    q: "What systems do you integrate with?",
    a: "Calendars (Google, Outlook, Calendly), CRMs (HubSpot, Salesforce, Pipedrive), Shopify, Stripe, Twilio and most REST APIs.",
  },
  {
    q: "How is pricing structured?",
    a: "A one-time setup fee plus per-minute usage. No seat licenses. You only pay for time the agent is actually on the line.",
  },
  {
    q: "What happens when the agent can't handle a call?",
    a: "It warm-transfers to a human, with the full transcript and caller context pre-delivered — your team never starts from scratch.",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-24 md:py-32 bg-[#F8F7F4]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="eyebrow mb-4">/ FAQ</div>
          <h2 className="font-heading font-light text-[#1A1A1A] text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Questions <span className="italic text-[#D94832]">we get</span> on
            every demo call.
          </h2>
          <p className="mt-6 text-[#5C5C5C] text-base max-w-sm">
            Missing something? We'll cover it live on the demo.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-[rgba(26,26,26,0.2)]"
          >
            {ITEMS.map((it, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[rgba(26,26,26,0.2)]"
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${i}`}
                  className="font-heading text-xl md:text-2xl font-light text-[#1A1A1A] hover:no-underline py-6 text-left tracking-tight"
                >
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#5C5C5C] text-base leading-relaxed pb-8 pr-12">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
