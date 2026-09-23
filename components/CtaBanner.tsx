import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type CtaBannerProps = {
  title?: string;
  body?: string;
  eyebrow?: string;
  href?: string;
  buttonLabel?: string;
  embedded?: boolean;
  children?: ReactNode;
};

export default function CtaBanner({
  title = "Not sure which path fits you?",
  body = "Talk to a counsellor and we'll help you explore your options honestly — no pressure, no one-size-fits-all answers.",
  eyebrow = "Your next step starts here",
  href = "/#contact",
  buttonLabel = "Talk to a counsellor",
  embedded = false,
  children,
}: CtaBannerProps) {
  return (
    <section className={embedded ? "mt-6" : "cta-section px-4.5 pb-[clamp(52px,8vw,96px)]"}>
      <div className="relative isolate overflow-hidden max-w-[1240px] mx-auto [background:linear-gradient(160deg,#0E1A2C,#070D18)] rounded-[26px] border border-gold/15 p-[clamp(24px,4vw,52px)] text-[#E8EDF5]">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 1240 400" preserveAspectRatio="xMidYMid slice" fill="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-white [mask-image:linear-gradient(to_right,rgba(0,0,0,0.3),black)]">
          <g stroke="currentColor" strokeLinecap="round">
            <path d="M -100 310 L 100 110" strokeWidth="46" opacity="0.025" />
            <path d="M 85 420 L 270 235" strokeWidth="12" opacity="0.04" />
            <path d="M 350 50 L 470 -70" strokeWidth="30" opacity="0.025" />
            <path d="M 590 130 L 800 -80" strokeWidth="64" opacity="0.035" />
            <path d="M 580 340 L 850 70" strokeWidth="5" opacity="0.065" />
            <path d="M 750 435 L 1140 45" strokeWidth="86" opacity="0.035" />
            <path d="M 1035 365 L 1290 110" strokeWidth="22" opacity="0.045" />
            <path d="M 1120 50 L 1290 -120" strokeWidth="9" opacity="0.055" />
            <path d="M 1200 420 L 1350 270" strokeWidth="48" opacity="0.025" />
          </g>
        </svg>
        <div className="relative grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,1fr)_auto] gap-8 min-[900px]:gap-12 items-center">
        <div className="min-w-0">
          <p className="flex items-center gap-3 text-[10px] min-[640px]:text-[11px] uppercase tracking-[0.2em] text-gold mb-4"><span aria-hidden="true" className="h-px w-8 bg-gold/60" />{eyebrow}</p>
          <h2 className="font-heading font-semibold text-[clamp(28px,3.4vw,40px)] text-white m-0 mb-3 leading-[1.15]">
            {title}
          </h2>
          <p className="text-base leading-[1.7] text-[rgba(232,237,245,0.78)] m-0 max-w-[46ch]">{body}</p>
          {children && <div className="mt-5 text-sm leading-relaxed text-muted">{children}</div>}
        </div>
        <Link
          href={href}
          className="group justify-self-end inline-flex min-h-14 max-w-full items-center justify-center gap-4 bg-gold text-[#12243C] py-4 px-6 min-[640px]:px-7.5 rounded-full text-[12px] min-[640px]:text-[13px] font-medium tracking-[0.08em] uppercase shadow-[0_8px_28px_rgba(212,168,87,0.12)] transition-shadow hover:shadow-[0_10px_34px_rgba(212,168,87,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </Link>
        </div>
      </div>
    </section>
  );
}
