import { steps } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="px-4.5 py-[clamp(52px,8vw,110px)]">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-[clamp(32px,4vw,48px)]">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">Why Skandiora Immigration?</div>
          <h2 className="font-heading font-semibold text-[clamp(30px,4.2vw,48px)] text-cream leading-[1.12] mt-3.5">
            Because your decision deserves more than a quick answer.
          </h2>
        </div>
        <div className="grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {steps.map((st) => (
            <div
              key={st.no}
              className="relative py-7 px-6 rounded-[18px] bg-[#101A2B] border border-gold/16"
            >
              <div className="font-heading text-[44px] font-semibold text-gold/70 leading-none">
                {st.no}
              </div>
              <h3 className="text-lg font-medium text-cream mt-3.5 mb-2">{st.title}</h3>
              <p className="text-sm leading-[1.65] text-[#93A3B8] m-0">{st.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
