import type { Metadata } from "next";
import { shareMetadata } from "@/lib/share-image";
import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import FaqSection from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import {
  popularDestinations,
  europeDestinations,
  alsoExploreDestinations,
  type DestinationEntry,
} from "@/data/destinations";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "Destinations" }];

const destinationFaqs = [
  {
    q: "Which study-abroad destinations does Skandiora Immigration cover?",
    a: "Popular destinations including the UK, USA, Canada, Australia, New Zealand and Dubai; across Europe including Ireland, Germany, France, Italy, Spain, Poland, Malta and more; plus Singapore, Mauritius and other suitable destinations.",
  },
  {
    q: "How do I choose the right country to study in?",
    a: "Your destination should match your goals — not simply be a popular choice. We help you explore options based on your academic profile, course preference, eligibility, budget and career goals.",
  },
  {
    q: "Can Skandiora Immigration help with both study-abroad and domestic admissions?",
    a: "Yes. Alongside international destinations, we provide domestic admission assistance across Kerala, Tamil Nadu, Karnataka and Andhra Pradesh for students who prefer to study closer to home.",
  },
];

const description =
  "Explore study-abroad destinations with Skandiora Immigration's counsellors in Kochi, Trivandrum and Chennai — options matched to your profile, interests and budget.";

export const metadata: Metadata = {
  title: "Study Destinations Worldwide",
  description,
  alternates: { canonical: "/destinations" },
  ...shareMetadata("Study Destinations Worldwide | Skandiora Immigration", description, "/destinations"),
};

function DestinationGroup({ heading, items }: { heading: string; items: DestinationEntry[] }) {
  return (
    <div className="mb-10">
      <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">{heading}</div>
      <div className="flex flex-wrap gap-3">
        {items.map((d) => (
          <span
            key={d.name}
            className="flex items-center gap-2.5 bg-surface-raised border border-gold/22 rounded-xl py-2.5 px-4"
          >
            <span
              className="w-6 h-4 rounded-[2px] flex-none bg-gold/16 bg-cover bg-center"
              style={{ backgroundImage: `url(https://flagcdn.com/w40/${d.code}.png)` }}
            />
            <span className="text-sm text-cream">{d.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={faqSchema(destinationFaqs)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow="Your global education journey starts here"
        title="Dream big. Explore more. Choose wisely."
        intro={[
          "Your destination should match your goals — not simply be a popular choice. Explore education opportunities across leading international destinations and discover pathways that may suit your academic profile and career aspirations.",
        ]}
      />

      <section className="section-space section-band px-4.5">
        <div className="max-w-[1240px] mx-auto">
          <DestinationGroup heading="Popular destinations" items={popularDestinations} />
          <DestinationGroup heading="Europe" items={europeDestinations} />
          <DestinationGroup heading="Also explore" items={alsoExploreDestinations} />
        </div>
      </section>

      <section className="section-space px-4.5">
        <div className="max-w-[840px] mx-auto text-center">
          <h2 className="font-heading font-semibold text-[clamp(24px,3vw,34px)] text-cream leading-[1.2] mb-3">
            The right destination isn&apos;t the same for every student.
          </h2>
          <p className="text-base leading-[1.7] text-body-text max-w-[58ch] mx-auto">
            We help you explore options based on your academic profile, course preference,
            eligibility, budget and career goals.
          </p>
          <p className="text-[13px] leading-[1.6] text-muted max-w-[64ch] mx-auto mt-6 italic">
            Destination and institution suitability depends on the student&apos;s profile,
            eligibility, course requirements and applicable regulations.
          </p>
        </div>
      </section>

      <FaqSection items={destinationFaqs} />

      <CtaBanner
        title="Not sure which destination fits you?"
        body="Send us your marksheets and goals — we'll tell you honestly what's possible."
      />
    </>
  );
}
