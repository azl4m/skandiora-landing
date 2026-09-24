import { BookOpen, CircleCheck, Compass, GraduationCap, Target, Wallet } from "lucide-react";
import ApproachRibbon from "./ApproachRibbon";

const understand = [
  { text: "Your academic background.", icon: GraduationCap },
  { text: "Your ambitions.", icon: Target },
  { text: "Your preferred course.", icon: BookOpen },
  { text: "Your budget.", icon: Wallet },
  { text: "Your eligibility.", icon: CircleCheck },
  { text: "Your future plans.", icon: Compass },
];

export default function Intro() {
  return (
    <section aria-labelledby="why-skandiora-heading" className="px-4.5 py-[clamp(40px,5vw,64px)]">
      <div className="max-w-[1240px] mx-auto text-left">
        <div className="text-xs tracking-[0.24em] uppercase text-gold">Why Skandiora</div>
        <h2 id="why-skandiora-heading" className="font-heading font-semibold text-[clamp(28px,3.6vw,44px)] text-cream leading-[1.15] mt-3 max-w-[28ch] text-pretty">
          We don&apos;t believe in one-size-fits-all guidance.
        </h2>
        <p className="text-base leading-[1.7] text-body-text mt-4 max-w-[58ch] text-pretty">
          At Skandiora Immigration, a good education decision starts with understanding you —
          not simply matching you to whatever is available.
        </p>

        <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 min-[900px]:grid-cols-3 gap-x-6 min-[640px]:gap-x-8 gap-y-4 min-[640px]:gap-y-5 max-w-[860px] mt-7 min-[640px]:mt-8">
          {understand.map(({ text, icon: Icon }) => (
            <li key={text} className="flex min-w-0 items-start gap-3">
              <Icon size={19} strokeWidth={1.5} aria-hidden="true" className="shrink-0 mt-0.5 text-gold" />
              <span className="text-sm min-[640px]:text-[15px] leading-6 text-body-text">{text}</span>
            </li>
          ))}
        </ul>

        <div className="max-w-[860px] mt-7 min-[640px]:mt-8 pt-6 border-t border-gold/16">
          <ApproachRibbon align="left" items={["Listen", "Understand", "Explore", "Compare", "Guide", "Support"]} />
        </div>

        <p className="text-base leading-[1.7] text-body-text mt-5 max-w-[58ch] text-pretty">
          From your first counselling session to admission, documentation, visa preparation and
          pre-departure support, we&apos;re here to help you move forward with greater confidence.
        </p>
      </div>
    </section>
  );
}
