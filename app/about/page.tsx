import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { steps } from "@/data/process";
import {
  vision,
  missionParagraphs,
  missionClosing,
  journeyProfiles,
  bringWithYou,
  officeLocations,
} from "@/data/about";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "About" }];

export const metadata: Metadata = {
  title: "About Us — Vision & Mission",
  description:
    "Before you choose: Skandiora Immigration's vision, mission and approach to education guidance from our Trivandrum, Kochi and Chennai offices — because an education decision deserves more than an application form.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow="Before you choose"
        title="Because your child is not an application."
      />

      <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[760px]:grid-cols-2 gap-8">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Vision</div>
            <p className="text-[19px] leading-[1.6] text-cream m-0">{vision}</p>
          </div>
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Mission</div>
            <div className="flex flex-col gap-3.5">
              {missionParagraphs.map((p) => (
                <p key={p} className="text-[15px] leading-[1.7] text-body-text m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
        <div className="max-w-[840px] mx-auto text-center rounded-[22px] border border-gold/20 bg-[#101A2B] py-9 px-6">
          <p className="text-[15px] leading-[1.7] text-body-text m-0">{missionClosing.question}</p>
          <p className="text-lg text-cream font-heading font-medium mt-2">{missionClosing.answer}</p>
          <div className="mt-5 pt-5 border-t border-gold/16 text-sm text-muted">
            <p className="m-0">{missionClosing.line1}</p>
            <p className="m-0 mt-1 text-cream">{missionClosing.line2}</p>
          </div>
        </div>
      </section>

      <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-xs tracking-[0.24em] uppercase text-gold mb-4">
            Why Skandiora Immigration?
          </div>
          <h2 className="font-heading font-semibold text-[clamp(28px,3.6vw,44px)] text-cream leading-[1.15] mb-8 max-w-[20ch]">
            Because your decision deserves more than a quick answer.
          </h2>
          <div className="grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
            {steps.map((st) => (
              <div key={st.no} className="rounded-[18px] bg-[#101A2B] border border-gold/16 py-6 px-5">
                <div className="font-heading text-[38px] font-semibold text-gold/70 leading-none">
                  {st.no}
                </div>
                <h3 className="text-base font-medium text-cream mt-3 mb-1.5">{st.title}</h3>
                <p className="text-sm leading-[1.6] text-[#93A3B8] m-0">{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-4.5 py-[clamp(52px,8vw,96px)] text-[#E8EDF5]"
        style={{ background: "linear-gradient(160deg,#0E1A2C,#070D18)" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-heading font-semibold text-[clamp(26px,3.4vw,40px)] text-white leading-[1.2] mb-5">
            Not just a destination. Not just a course. It&apos;s your future.
          </h2>
          <p className="text-base leading-[1.7] text-[rgba(232,237,245,0.8)] max-w-[58ch] mx-auto mb-6">
            Every student has a different story.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px] text-[rgba(232,237,245,0.8)] mb-8">
            {journeyProfiles.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <p className="text-base leading-[1.7] text-white mb-5">
            Wherever you are in your journey, start with the right conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {bringWithYou.map((item) => (
              <span
                key={item}
                className="text-sm tracking-[0.02em] text-cream border border-gold/28 rounded-full py-2 px-4.5 bg-white/5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4.5 py-[clamp(40px,6vw,64px)]">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Office locations</div>
            <div className="flex flex-wrap gap-3">
              {officeLocations.map((city) => (
                <span
                  key={city}
                  className="text-sm text-cream border border-gold/24 rounded-full py-2 px-4.5 bg-surface-raised"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>
          <p className="font-heading text-lg text-cream m-0">
            Your future. Your choice. Your journey.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Start with your profile."
        body="Talk to our education guidance team and explore your options — Skandiora doesn't simply sell destinations."
      />
    </>
  );
}
