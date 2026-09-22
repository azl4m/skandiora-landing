import Link from "next/link";
import { ArrowUpRight, Check, FileCheck2, Globe2, MessageCircle } from "lucide-react";
import type { ServicePage } from "@/data/services";
import { site } from "@/data/site";
import { serviceWhatsappHref } from "@/lib/service-contact";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import CtaBanner from "./CtaBanner";
import FaqSection from "./Faq";
import JsonLd from "./JsonLd";

export default function SupportServiceDetail({ service }: { service: ServicePage }) {
  const visa = service.slug === "visa-assistance";
  const href = serviceWhatsappHref(service.slug)!;
  const Icon = visa ? Globe2 : FileCheck2;
  const breadcrumbs = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: service.navTitle }];
  const buttonLabel = visa ? "Request your private visa consultation" : "Discuss your attestation needs";
  return <>
    <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    <JsonLd data={serviceSchema(service)} />
    <JsonLd data={faqSchema(service.faqs)} />
    <section className="relative overflow-hidden px-5 min-[640px]:px-8 pt-8 pb-12 min-[900px]:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border border-white/5 before:absolute before:inset-10 before:rounded-full before:border before:border-white/5 after:absolute after:inset-20 after:rounded-full after:border after:border-white/5" />
      <div className="relative max-w-[1240px] mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <div className="grid min-[960px]:grid-cols-[1.35fr_0.8fr] items-start gap-9 min-[960px]:gap-16 mt-10">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">{service.eyebrow}</p>
            <h1 className="font-heading text-[clamp(40px,5vw,64px)] leading-[1.08] tracking-[-0.02em] text-pretty">{service.headlineLines.map((line, index) => <span key={line} className={`block ${index ? "text-gold-soft" : "text-cream"}`}>{line}</span>)}</h1>
            <p className="text-lg leading-relaxed text-cream mt-6">{service.summary}</p>
            {service.intro.map((paragraph) => <p key={paragraph} className="text-base leading-[1.8] text-body-text mt-4">{paragraph}</p>)}
            {visa && <p className="font-heading text-2xl leading-snug text-cream mt-6">Your plans deserve more than paperwork. They deserve the right guidance.</p>}
          </div>
          <aside className="relative overflow-hidden rounded-[26px] border border-gold/20 bg-[linear-gradient(145deg,#142035,#09111E)] p-6 min-[640px]:p-8">
            <Icon size={38} strokeWidth={1.25} className="text-gold mb-7" aria-hidden="true" />
            <h2 className="font-heading text-3xl leading-tight text-cream">A conversation is all it takes to begin.</h2>
            <p className="text-sm leading-relaxed text-body-text mt-4">{visa ? "Tell us where you want to go and what you have in mind." : "Tell us about your documents and where you need to use them."} Our team will guide your next step.</p>
            <a href={href} className="mt-6 flex items-center justify-center gap-3 rounded-full bg-gold px-5 py-4 text-sm font-medium text-[#0A1220] text-center hover:bg-gold-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"><MessageCircle size={19} className="shrink-0" aria-hidden="true" />{buttonLabel}<ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></a>
            <p className="mt-3 text-xs text-muted text-center">Opens WhatsApp. Tap Send to start the conversation.</p>
            <p className="mt-7 border-t border-white/10 pt-5 text-sm text-body-text">{site.offices.map((office) => office.city).join(" · ")}</p>
          </aside>
        </div>
      </div>
    </section>
    <section className="max-w-[1240px] mx-auto px-5 min-[640px]:px-8 pb-14 min-[900px]:pb-20" aria-labelledby="support-services-heading">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">How we can help</p>
      <h2 id="support-services-heading" className="font-heading text-[clamp(30px,4vw,42px)] leading-tight text-cream">{visa ? "Visa guidance for your next chapter." : "Our attestation services include"}</h2>
      <div className={`grid min-[620px]:grid-cols-2 ${visa ? "" : "min-[1050px]:grid-cols-3"} gap-4 mt-7`}>
        {service.categories?.map((category, index) => <article key={category.title} className="rounded-[20px] border border-gold/15 bg-[#0C1625] p-6">
          <span className="text-xs tracking-widest text-gold">0{index + 1}</span>
          <h3 className="text-xl font-heading text-cream mt-3">{category.title}</h3>
          <p className="text-sm leading-relaxed text-body-text mt-2">{category.body}</p>
        </article>)}
      </div>
      {service.seeAlso && <p className="text-sm text-body-text mt-6">{service.seeAlso.note} <Link href={`/services/${service.seeAlso.slug}`} className="text-gold underline underline-offset-4">Explore study abroad & student visa guidance</Link></p>}
      {service.disclaimer && <p className="mt-6 text-sm leading-relaxed text-muted max-w-[90ch]">{service.disclaimer}</p>}
    </section>
    {service.checklist && <section className="max-w-[1240px] mx-auto px-5 min-[640px]:px-8 pb-14 min-[900px]:pb-20">
      <h2 className="font-heading text-[clamp(30px,4vw,42px)] leading-tight text-cream">{service.checklist.heading}</h2>
      <ul className="grid min-[700px]:grid-cols-2 gap-x-12 gap-y-7 mt-7">{service.checklist.items.map((item) => {
        const [title, ...description] = item.split(": ");
        return <li key={item} className="flex gap-4"><Check size={20} className="text-gold shrink-0 mt-1" aria-hidden="true" /><div><h3 className="text-base text-cream font-medium">{title}</h3><p className="text-sm leading-relaxed text-body-text mt-2">{description.join(": ")}</p></div></li>;
      })}</ul>
    </section>}
    {service.ribbon && <ul className="max-w-[1240px] mx-auto px-5 min-[640px]:px-8 pb-14 flex flex-wrap gap-x-8 gap-y-4">{service.ribbon.map((item) => <li key={item} className="flex gap-2 items-center text-sm text-cream"><Check size={16} className="text-gold" aria-hidden="true" />{item}</li>)}</ul>}
    <FaqSection items={service.faqs} title={visa ? "Your visa consultation questions" : "Your attestation questions"} />
    <CtaBanner title={service.closingHeadline} body={service.closingBody} href={href} buttonLabel={visa ? "Request a private consultation" : "Contact us on WhatsApp"} eyebrow="Let's talk about your next step" />
  </>;
}
