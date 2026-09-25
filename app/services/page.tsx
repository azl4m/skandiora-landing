import type { Metadata } from "next";
import { shareMetadata } from "@/lib/share-image";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { services, featuredServices } from "@/data/services";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "Services" }];

const description =
  "Explore Skandiora Immigration's services in Kochi, Trivandrum and Chennai: study abroad, MBBS, domestic admissions, credit transfer, attestation and visa guidance.";

export const metadata: Metadata = {
  title: "Education Guidance Services",
  description,
  alternates: { canonical: "/services" },
  ...shareMetadata("Education Guidance Services | Skandiora Immigration", description, "/services"),
};

export default function ServicesPage() {
  const primary = featuredServices(services);
  const related = services.filter((s) => !s.featured);

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow="What we do"
        title="Five services, one accountable team"
        intro={[
          "Every case is handled by a named counsellor who owns your file from first call to final approval — no handoffs, no surprise fees.",
        ]}
      />
      <section className="section-space px-4.5">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-2 min-[980px]:grid-cols-3 gap-5">
          {primary.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="section-space section-band px-4.5">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
            Related & specialised services
          </div>
          <p className="text-[15px] leading-[1.6] text-body-text max-w-[58ch] mb-6">
            These sit alongside the five above — MBBS abroad and education loans and language
            training connect to a student visa journey, and accommodation connects to visa
            services.
          </p>
          <div className="grid grid-cols-1 min-[620px]:grid-cols-2 min-[980px]:grid-cols-4 gap-5">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
