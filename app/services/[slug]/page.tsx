import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import StudyAbroadDetail from "@/components/StudyAbroadDetail";
import DomesticAdmissionDetail from "@/components/DomesticAdmissionDetail";
import CreditTransferDetail from "@/components/CreditTransferDetail";
import SupportServiceDetail from "@/components/SupportServiceDetail";
import { services, getService } from "@/data/services";
import { shareMetadata } from "@/lib/share-image";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    ...shareMetadata(service.metaTitle, service.metaDescription, `/services/${service.slug}`),
  };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  if (slug === "study-abroad") return <StudyAbroadDetail service={service} />;
  if (slug === "study-in-india") return <DomesticAdmissionDetail service={service} />;
  if (slug === "credit-transfer") return <CreditTransferDetail service={service} />;
  if (slug === "visa-assistance" || slug === "attestation") return <SupportServiceDetail service={service} />;
  return <ServiceDetail service={service} />;
}
