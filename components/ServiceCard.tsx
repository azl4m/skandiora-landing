import Link from "next/link";
import type { ServicePage } from "@/data/services";

export default function ServiceCard({ service }: { service: ServicePage }) {
  return (
    <article className="service-card relative flex flex-col [background:linear-gradient(150deg,#121E31,#0B1422)] border border-gold/20 rounded-[22px] p-7 shadow-[0_-2px_0_rgba(212,168,87,0.35),0_20px_40px_rgba(0,0,0,0.5)]">
      <span className="service-card-border" aria-hidden="true" />
      <span className="text-3xl" aria-hidden>
        {service.icon}
      </span>
      <h3 className="font-heading font-semibold text-2xl text-cream mt-4 mb-2.5 leading-[1.15]">
        {service.navTitle}
      </h3>
      <p className="text-[15px] leading-[1.65] text-body-text m-0 flex-1">{service.cardBody}</p>
      <div className="flex items-center gap-5 mt-6">
        <Link
          href={`/services/${service.slug}`}
          aria-label={`Learn more about ${service.navTitle}`}
          className="text-sm tracking-[0.04em] text-gold hover:text-cream transition-colors after:absolute after:inset-0 after:rounded-[22px] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold"
        >
          Learn more →
        </Link>
        <Link
          href="/#contact"
          className="relative z-10 text-sm tracking-[0.04em] text-muted hover:text-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Enquire
        </Link>
      </div>
    </article>
  );
}
