import Link from "next/link";
import { getService, relatedServices, services, type ServiceListBlock, type ServicePage } from "@/data/services";
import { flagLoopA, flagLoopB } from "@/data/destinations";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import ApproachRibbon from "./ApproachRibbon";
import CtaBanner from "./CtaBanner";
import FaqSection from "./Faq";
import FlagTicker from "./FlagTicker";
import JsonLd from "./JsonLd";
import RelatedServices from "./RelatedServices";
import ContactForm from "./ContactForm";
import DestinationCard from "./DestinationCard";
import CardCarousel from "./CardCarousel";
import { mbbsDestinations } from "@/data/mbbs-destinations";

function Checklist({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="rounded-[18px] bg-[#101A2B] border border-gold/16 p-6 min-[620px]:p-7">
      <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">{heading}</div>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 items-start text-[15px] leading-[1.6] text-[#C3CFDE]">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-none" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TagBlock({ heading, items, linkToContact }: ServiceListBlock) {
  return (
    <div>
      <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">{heading}</div>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) =>
          linkToContact ? (
            <Link
              key={item}
              href={`/?destination=${encodeURIComponent(item)}#contact`}
              className="text-sm tracking-[0.02em] text-cream border border-gold/24 rounded-full py-2 px-4.5 bg-surface-raised hover:border-gold hover:bg-gold/12 hover:text-gold transition-colors cursor-pointer"
            >
              {item}
            </Link>
          ) : (
            <span
              key={item}
              className="text-sm tracking-[0.02em] text-cream border border-gold/24 rounded-full py-2 px-4.5 bg-surface-raised"
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function ServiceDetail({ service }: { service: ServicePage }) {
  const isCreditTransfer = service.slug === "credit-transfer";
  const isMbbs = service.slug === "mbbs-abroad";
  const enquiryHref = isCreditTransfer || isMbbs ? "#contact" : "/#contact";
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { label: service.navTitle },
  ];
  const related = relatedServices(services, service.relatedSlugs);
  const seeAlsoService = service.seeAlso ? getService(service.seeAlso.slug) : undefined;

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={serviceSchema(service)} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}

      <section
        className="px-4.5 pt-[clamp(32px,6vw,64px)] pb-[clamp(40px,6vw,72px)]"
        style={{
          background:
            "radial-gradient(1000px 420px at 82% -10%, rgba(212,168,87,0.14), transparent 60%), #070D18",
        }}
      >
        <div className="max-w-[1240px] mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-3.5 mt-6">
            <span className="text-3xl" aria-hidden>
              {service.icon}
            </span>
            <div className="text-xs tracking-[0.24em] uppercase text-gold">{service.eyebrow}</div>
          </div>
          <h1 className="font-heading font-semibold text-[clamp(32px,5vw,58px)] leading-[1.1] text-cream mt-3.5 max-w-[22ch] text-pretty">
            {service.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-cream max-w-[62ch] mt-5 font-medium">
            {service.summary}
          </p>
          {service.intro.map((p) => (
            <p key={p} className="text-[clamp(16px,1.4vw,18px)] leading-[1.7] text-body-text max-w-[62ch] mt-4">
              {p}
            </p>
          ))}
          {service.seeAlso && seeAlsoService && (
            <p className="text-[15px] leading-[1.6] text-cream max-w-[62ch] mt-4">
              {service.seeAlso.note}{" "}
              <Link
                href={`/services/${seeAlsoService.slug}`}
                className="text-gold border-b border-gold/50 hover:text-cream transition-colors"
              >
                See our {seeAlsoService.navTitle} page →
              </Link>
            </p>
          )}
          <div className="flex flex-wrap gap-3.5 mt-8">
            <Link
              href={enquiryHref}
              className="bg-gold text-white py-3.5 px-7 rounded-full text-sm tracking-[0.06em] shadow-[0_14px_30px_rgba(212,168,87,0.28)] hover:bg-[#0F2A4E] transition-colors"
            >
              Book a free assessment
            </Link>
            <Link
              href="/services"
              className="border border-gold/38 text-cream py-3.5 px-7 rounded-full text-sm tracking-[0.06em] hover:border-cream hover:bg-gold/12 transition-colors"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      {isCreditTransfer && (
        <section id="contact" aria-labelledby="credit-transfer-enquiry-title" className="scroll-mt-28 px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[900px]:grid-cols-2 items-center gap-8 min-[900px]:gap-14">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">Free credit transfer consultation</p>
              <h2 id="credit-transfer-enquiry-title" className="font-heading text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-cream">Let’s explore how you can continue.</h2>
              <p className="mt-4 text-base leading-[1.7] text-body-text max-w-[46ch]">Start with your name and phone number. You can also share your previous course — our admissions team will guide you through the next steps.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">No marksheets or detailed academic history needed for this first enquiry.</p>
            </div>
            <ContactForm variant="credit-transfer" />
          </div>
        </section>
      )}

      {isMbbs && (
        <section aria-labelledby="mbbs-destinations-heading" className="px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Explore medical study destinations</p>
            <h2 id="mbbs-destinations-heading" className="font-heading text-[clamp(30px,4vw,46px)] leading-[1.12] text-cream">Your medical dream. A world of possibilities.</h2>
            <p className="mt-4 mb-8 max-w-[65ch] text-base leading-relaxed text-body-text">Explore each destination and select a country to discuss your medical study options with our team.</p>
            <CardCarousel singleRow label="Medical study destinations" itemLabel="destinations">
              {mbbsDestinations.map((destination) => <DestinationCard key={destination.name} {...destination} course="MBBS & Medicine" sizes="(max-width: 639px) 82vw, 300px" />)}
            </CardCarousel>
            <p className="mt-5 text-sm leading-relaxed text-muted">Programme names, entry requirements, language of instruction and licensing pathways vary by country and university. We help you understand what to check before applying.</p>
          </div>
        </section>
      )}

      {!isMbbs && service.tagSections && (
        <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
            {service.tagSections.map((block) => (
              <TagBlock key={block.heading} {...block} />
            ))}
          </div>
        </section>
      )}

      {service.showFlagTicker && (
        <section className="pb-[clamp(40px,6vw,64px)]">
          <div className="flex flex-col gap-3.5">
            <FlagTicker items={flagLoopA} duration="42s" />
            <FlagTicker items={flagLoopB} duration="52s" reverse />
          </div>
        </section>
      )}

      {(service.checklist || service.checklist2) && (
        <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[760px]:grid-cols-2 gap-5">
            {service.checklist && <Checklist heading={service.checklist.heading} items={service.checklist.items} />}
            {service.checklist2 && (
              <Checklist heading={service.checklist2.heading} items={service.checklist2.items} />
            )}
          </div>
        </section>
      )}

      {service.categories && (
        <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {service.categories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-[18px] bg-[#101A2B] border border-gold/16 p-6 min-[620px]:p-7"
              >
                <div className="flex items-center gap-3 mb-3.5">
                  {cat.icon && (
                    <span className="text-2xl" aria-hidden>
                      {cat.icon}
                    </span>
                  )}
                  <h3 className="text-lg font-medium text-cream m-0">{cat.title}</h3>
                </div>
                {cat.body && <p className="text-[15px] leading-[1.65] text-body-text m-0">{cat.body}</p>}
                {cat.items && (
                  <ul className="list-none p-0 m-0 flex flex-col gap-2.5 mt-1">
                    {cat.items.map((item) => (
                      <li key={item} className="flex gap-3 items-start text-[15px] leading-[1.6] text-[#C3CFDE]">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-none" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {service.ribbon && (
        <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
          <div className="max-w-[1240px] mx-auto py-8 border-y border-gold/16">
            <ApproachRibbon items={service.ribbon} />
          </div>
        </section>
      )}

      {(service.closingHeadline || service.closingBody || service.disclaimer) && (
        <section className="px-4.5 pb-[clamp(40px,6vw,72px)]">
          <div className="max-w-[840px] mx-auto text-center">
            {service.closingHeadline && (
              <h2 className="font-heading font-semibold text-[clamp(24px,3vw,34px)] text-cream leading-[1.2] mb-3">
                {service.closingHeadline}
              </h2>
            )}
            {service.closingBody && (
              <p className="text-base leading-[1.7] text-body-text max-w-[58ch] mx-auto">{service.closingBody}</p>
            )}
            {service.disclaimer && (
              <p className="text-[13px] leading-[1.6] text-muted max-w-[64ch] mx-auto mt-6 italic">
                {service.disclaimer}
              </p>
            )}
          </div>
        </section>
      )}

      <RelatedServices items={related} />

      <FaqSection items={service.faqs} />

      {isMbbs && (
        <section id="contact" aria-labelledby="mbbs-enquiry-heading" className="scroll-mt-28 px-4.5 pb-[clamp(52px,8vw,96px)]">
          <div className="max-w-[1240px] mx-auto grid min-[900px]:grid-cols-2 gap-8 min-[900px]:gap-14 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Your next step</p>
              <h2 id="mbbs-enquiry-heading" className="font-heading text-[clamp(30px,4vw,46px)] leading-[1.12] text-cream">Let’s explore your medical study options.</h2>
              <p className="mt-4 text-base leading-relaxed text-body-text">Choose a destination above or tell us where you would like to study. Our team will help you discuss your academic profile, budget and next steps.</p>
            </div>
            <ContactForm variant="mbbs" />
          </div>
        </section>
      )}

      <CtaBanner href={enquiryHref} />
    </>
  );
}
