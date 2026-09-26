import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { featuredServices } from "@/data/services";
import { getServices, getServicesPage } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "Services" }];

const description =
  "Explore Skandiora Immigration's services in Kochi, Trivandrum and Chennai: study abroad, MBBS, domestic admissions, credit transfer, attestation and visa guidance.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getServicesPage();
  return pageMetadata(seo, { title: "Education Guidance Services", description, path: "/services" });
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()]);
  const primary = featuredServices(services);
  const related = services.filter((s) => !s.featured);

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.text ? [page.text] : undefined}
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
