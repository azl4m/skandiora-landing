import Link from "next/link";
import GlobeLoader from "./GlobeLoader";

const stats = [
  { value: "20+", label: "Destinations explored" },
  { value: "4", label: "South Indian states" },
  { value: "100%", label: "Recognised institutions" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative px-4.5 pt-[clamp(40px,8vw,110px)] pb-[clamp(40px,6vw,88px)]"
      style={{
        background:
          "radial-gradient(1000px 520px at 82% -10%, rgba(212,168,87,0.16), transparent 60%), #070D18",
      }}
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(32px,5vw,64px)] items-center">
        <div className="@container min-w-0 animate-rise">
          <ul className="flex w-full items-center justify-between gap-[clamp(4px,1cqw,8px)] border border-gold/45 rounded-full py-2 px-[clamp(9px,2.5cqw,16px)] text-[clamp(8px,2.45cqw,12px)] leading-none tracking-[0.04em] uppercase text-gold-soft whitespace-nowrap">
            {["Education guidance", "Admission support", "Journey support"].map((label) => (
              <li key={label} className="flex items-center gap-[clamp(4px,1cqw,7px)]">
                <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-gold" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <h1 className="font-heading font-semibold text-[clamp(40px,6.4vw,72px)] leading-[1.04] tracking-[-0.01em] text-cream mt-5.5 text-pretty">
            Your future deserves the right decision.
          </h1>
          <p className="text-[clamp(16px,1.6vw,19px)] leading-[1.65] text-body-text max-w-[52ch] mt-5">
            Choosing where to study, what to study and how to build your career is a decision
            that can shape your future. We start by understanding your academic background,
            ambitions, budget and eligibility — then guide you toward the destination, course
            and pathway that actually fits you.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-8.5">
            <Link
              href="/#contact"
              className="bg-gold text-white py-4 px-7.5 rounded-full text-sm tracking-[0.06em] shadow-[0_14px_30px_rgba(212,168,87,0.28)] hover:bg-[#0F2A4E] transition-colors"
            >
              Book a free assessment
            </Link>
            <Link
              href="/services"
              className="border border-gold/38 text-cream py-4 px-7.5 rounded-full text-sm tracking-[0.06em] hover:border-cream hover:bg-gold/12 transition-colors"
            >
              Explore our services
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-[clamp(20px,4vw,48px)] gap-y-5 mt-[clamp(36px,5vw,54px)] pt-6.5 border-t border-gold/16">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-[34px] font-semibold text-cream">{s.value}</div>
                <div className="text-xs tracking-[0.14em] uppercase text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 relative flex justify-center">
          <div
            className="relative w-full max-w-[500px] min-[1024px]:max-w-[600px] aspect-square grid place-items-center"
            style={{
              background: "radial-gradient(ellipse at 48% 45%, rgba(216,210,196,0.09), transparent 67%)",
            }}
          >
            <div
              className="absolute inset-[15%] rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle at 28% 20%, rgba(212,168,87,0.12), transparent 55%)",
              }}
            />

            <div className="absolute inset-0">
              <GlobeLoader />
            </div>

            <div className="absolute left-0 right-0 bottom-2 text-center text-[10px] tracking-[0.28em] uppercase text-gold/80">
              Study · work · settle
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
