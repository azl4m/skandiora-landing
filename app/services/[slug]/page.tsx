import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import StudyAbroadDetail from "@/components/StudyAbroadDetail";
import DomesticAdmissionDetail from "@/components/DomesticAdmissionDetail";
import CreditTransferDetail from "@/components/CreditTransferDetail";
import SupportServiceDetail from "@/components/SupportServiceDetail";
import { services } from "@/data/services";
import { getService } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return pageMetadata(
    { shareImage: service.shareImage },
    { title: service.metaTitle, description: service.metaDescription, path: `/services/${service.slug}` },
  );
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  if (slug === "study-abroad") return <StudyAbroadDetail service={service} />;
  if (slug === "study-in-india") return <DomesticAdmissionDetail service={service} />;
  if (slug === "credit-transfer") return <CreditTransferDetail service={service} />;
  if (slug === "visa-assistance" || slug === "attestation") return <SupportServiceDetail service={service} />;
  return <ServiceDetail service={service} />;
}
