import Link from "next/link";
import { flagLoopA, flagLoopB } from "@/data/destinations";
import FlagTicker from "./FlagTicker";

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="section-space section-band "
    >
      <div className="max-w-[1240px] mx-auto px-5 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">
            Your global education journey starts here
          </div>
          <h2 className="font-heading font-semibold text-[clamp(30px,4vw,48px)] text-cream leading-[1.12] mt-3.5 mb-2.5">
            Dream big. Explore more. Choose wisely.
          </h2>
          <p className="text-base leading-[1.7] text-body-text max-w-[52ch] m-0">
            Your destination should match your goals — not simply be a popular choice. Explore
            education opportunities across leading international destinations.
          </p>
        </div>
        <Link
          href="/destinations"
          className="text-sm tracking-[0.06em] text-cream border-b border-gold/60 pb-[3px] hover:text-gold transition-colors whitespace-nowrap"
        >
          Explore all destinations →
        </Link>
      </div>

      <div className="my-[clamp(30px,4vw,44px)]">
        <FlagTicker items={flagLoopA} duration="42s" />
      </div>
      <div className="mb-[clamp(30px,4vw,44px)]">
        <FlagTicker items={flagLoopB} duration="52s" reverse />
      </div>

      <div className="max-w-[1240px] mx-auto px-5">
        <div className="p-5.5 px-6.5 rounded-2xl bg-[#101A2B] border border-dashed border-gold/50 grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 gap-x-8">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
              Study in India
            </div>
            <p className="m-0 text-[15px] leading-[1.65] text-body-text">
              Prefer to stay closer to home? Direct and management-quota seats across{" "}
              <strong className="text-cream font-medium">
                Kerala, Tamil Nadu, Karnataka and Andhra Pradesh
              </strong>{" "}
              — engineering, degree, diploma, paramedical and management programmes.
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href="/services/study-in-india"
              className="text-sm tracking-[0.06em] text-cream border-b border-gold/60 pb-[3px] hover:text-gold transition-colors"
            >
              Check available seats for this intake →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
