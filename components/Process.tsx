import ProcessJourney from "./ProcessJourney";

export default function Process() {
  return (
    <section id="process" className="section-space section-band px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-[clamp(32px,4vw,48px)]">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">Why Skandiora Immigration?</div>
          <h2 className="font-heading font-semibold text-[clamp(30px,4.2vw,48px)] text-cream leading-[1.12] mt-3.5">
            Because your decision deserves more than a quick answer.
          </h2>
        </div>
        <ProcessJourney />
      </div>
    </section>
  );
}
