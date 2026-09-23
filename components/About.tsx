import Link from "next/link";
import { assurances } from "@/data/process";
import { vision } from "@/data/about";

export default function About() {
  return (
    <section
      id="about"
      className="section-space section-band px-4.5 text-[#E8EDF5] "
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(32px,5vw,64px)] items-center">
        <div className="min-w-0">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">Before you choose</div>
          <h2 className="font-heading font-semibold text-[clamp(30px,4.2vw,50px)] text-white leading-[1.12] mt-3.5 mb-5">
            Because your child is not an application.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[rgba(232,237,245,0.82)] max-w-[54ch] mb-4.5">
            {vision}
          </p>
          <p className="text-[17px] leading-[1.7] text-[rgba(232,237,245,0.82)] max-w-[54ch] mb-6">
            We don&apos;t begin with &ldquo;Where can we get admission?&rdquo; We begin with:
            &ldquo;What makes sense for this student?&rdquo;
          </p>
          <Link
            href="/about"
            className="text-sm tracking-[0.06em] text-white border-b border-gold/60 pb-[3px] hover:text-gold transition-colors"
          >
            Read our vision & mission →
          </Link>
        </div>
        <div className="min-w-0 grid grid-cols-2 gap-4">
          {assurances.map((a) => (
            <div
              key={a.stat}
              className="border border-gold/28 rounded-2xl py-5.5 px-5 bg-white/4"
            >
              <div className="font-heading text-[30px] font-semibold text-gold">{a.stat}</div>
              <div className="text-sm leading-[1.55] text-[rgba(232,237,245,0.8)] mt-2">
                {a.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
