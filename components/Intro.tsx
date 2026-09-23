import ApproachRibbon from "./ApproachRibbon";

const understand = ["Your academic background.", "Your ambitions.", "Your preferred course.", "Your budget.", "Your eligibility.", "Your future plans."];

export default function Intro() {
  return (
    <section className="section-space px-4.5">
      <div className="max-w-[860px] mx-auto text-center">
        <div className="text-xs tracking-[0.24em] uppercase text-gold">Why Skandiora</div>
        <h2 className="font-heading font-semibold text-[clamp(28px,3.6vw,44px)] text-cream leading-[1.15] mt-3.5">
          We don&apos;t believe in one-size-fits-all guidance.
        </h2>
        <p className="text-base leading-[1.7] text-body-text mt-5 max-w-[58ch] mx-auto">
          At Skandiora Immigration, a good education decision starts with understanding you —
          not simply matching you to whatever is available.
        </p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-7 text-[15px] text-[#C3CFDE]">
          {understand.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gold/16">
          <ApproachRibbon items={["Listen", "Understand", "Explore", "Compare", "Guide", "Support"]} />
        </div>

        <p className="text-base leading-[1.7] text-body-text mt-7 max-w-[58ch] mx-auto">
          From your first counselling session to admission, documentation, visa preparation and
          pre-departure support, we&apos;re here to help you move forward with greater confidence.
        </p>
      </div>
    </section>
  );
}
