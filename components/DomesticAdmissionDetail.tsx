import { ArrowRight, BriefcaseBusiness, Check, GraduationCap, HeartPulse, Hotel, MapPin, Plane, Settings2, Stethoscope } from "lucide-react";
import type { ServicePage } from "@/data/services";
import { domesticCourses, domesticStates } from "@/data/domestic-admissions";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import ContactForm from "./ContactForm";
import CtaBanner from "./CtaBanner";
import FaqSection from "./Faq";
import JsonLd from "./JsonLd";
import StudyEnquiryLink from "./StudyEnquiryLink";

const icons = { Stethoscope, Settings2, BriefcaseBusiness, HeartPulse, Hotel, Plane, GraduationCap };
const sectionClass = "max-w-[1240px] mx-auto px-5 min-[640px]:px-8";
const headingClass = "font-heading text-[clamp(30px,4vw,46px)] leading-[1.12] text-cream text-pretty";
const labelClass = "text-[11px] uppercase tracking-[0.2em] text-gold mb-3";

export default function DomesticAdmissionDetail({ service }: { service: ServicePage }) {
  const breadcrumbs = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: "Domestic admissions" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <section className="pt-7 pb-12 min-[900px]:pt-10 min-[900px]:pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(212,168,87,0.09),transparent_60%)]">
        <div className={sectionClass}>
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid min-[1000px]:grid-cols-[1.1fr_1fr] gap-10 min-[1000px]:gap-16 mt-9 items-start">
            <div className="min-w-0 min-[1000px]:pt-5">
              <p className={labelClass}>{service.eyebrow}</p>
              <h1 className="font-heading text-[clamp(42px,5.2vw,66px)] leading-[1.04] text-cream tracking-[-0.02em] text-pretty">Domestic admissions,<br /><span className="text-gold-soft">elevated.</span></h1>
              <p className="font-heading text-[25px] leading-snug text-cream mt-5 max-w-[35ch]">{service.summary}</p>
              {service.intro.map((paragraph) => <p key={paragraph} className="text-base leading-[1.8] text-body-text mt-4 max-w-[54ch]">{paragraph}</p>)}
              <a href="#contact" className="inline-flex items-center gap-3 min-h-12 mt-6 rounded-full bg-gold px-6 py-3 text-sm font-medium text-[#0A1220] hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Get personalised guidance <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div id="contact" className="min-w-0 scroll-mt-28"><ContactForm variant="domestic" /></div>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} pb-14 min-[900px]:pb-20`} aria-labelledby="domestic-network-heading">
        <p className={labelClass}>Closer to home. Open to possibilities.</p>
        <h2 id="domestic-network-heading" className={headingClass}>Our admission network</h2>
        <p className="mt-4 mb-7 text-base leading-relaxed text-body-text">Explore college options across four South Indian states. Select a state to add it to your enquiry.</p>
        <div className="grid min-[540px]:grid-cols-2 min-[1000px]:grid-cols-4 gap-4">
          {domesticStates.map((state, index) => (
            <StudyEnquiryLink key={state} destination={state} className="group rounded-[20px] border border-gold/20 bg-[linear-gradient(145deg,#131E30,#0B1422)] p-6 hover:border-gold/55 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <div className="flex justify-between items-center"><MapPin size={24} strokeWidth={1.5} className="text-gold" aria-hidden="true" /><span className="text-xs tabular-nums text-muted">0{index + 1}</span></div>
              <h3 className="font-heading text-[28px] text-cream mt-6">{state}</h3>
              <span className="mt-3 flex justify-between items-center text-sm text-gold-soft">Discuss college options <ArrowRight size={16} aria-hidden="true" /></span>
            </StudyEnquiryLink>
          ))}
        </div>
      </section>

      <section className={`${sectionClass} pb-14 min-[900px]:pb-20`} aria-labelledby="domestic-courses-heading">
        <p className={labelClass}>Find a course that fits</p>
        <h2 id="domestic-courses-heading" className={headingClass}>Explore your options</h2>
        <p className="mt-4 mb-7 text-base leading-relaxed text-body-text">Start with your interests. Select a course area to discuss suitable colleges and admission requirements.</p>
        <div className="grid min-[540px]:grid-cols-2 min-[1000px]:grid-cols-3 gap-4">
          {domesticCourses.map((course) => {
            const Icon = icons[course.icon];
            return <StudyEnquiryLink key={course.name} course={course.name} className="group rounded-[18px] border border-gold/18 bg-[#0B1422] p-6 hover:border-gold/55 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <div className="flex items-center justify-between"><Icon size={24} strokeWidth={1.5} className="text-gold" aria-hidden="true" /><ArrowRight size={16} className="text-muted group-hover:text-gold" aria-hidden="true" /></div>
              <h3 className="text-lg font-medium text-cream mt-5">{course.name}</h3>
              <p className="text-sm leading-relaxed text-body-text mt-2">{course.description}</p>
            </StudyEnquiryLink>;
          })}
        </div>
      </section>

      <section className={`${sectionClass} pb-14 min-[900px]:pb-20`}>
        <div className="grid min-[760px]:grid-cols-2 gap-5">
          {[service.checklist, service.checklist2].map((block) => block && <div key={block.heading} className="rounded-[20px] border border-gold/16 bg-[#101A2B] p-6 min-[640px]:p-8">
            <h2 className="font-heading text-[28px] leading-tight text-cream">{block.heading}</h2>
            <ul className="mt-5 space-y-4">{block.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-body-text"><Check size={17} className="shrink-0 mt-0.5 text-gold" aria-hidden="true" />{item}</li>)}</ul>
          </div>)}
        </div>
        <div className="grid min-[760px]:grid-cols-3 gap-6 mt-10 border-y border-gold/16 py-8">
          {[["For parents", "Greater clarity."], ["For students", "More possibilities."], ["For the future", "A better-informed decision."]].map(([label, text]) => <div key={label}><p className={labelClass}>{label}</p><p className="font-heading text-[26px] leading-tight text-cream">{text}</p></div>)}
        </div>
      </section>

      <FaqSection items={service.faqs} title="Your domestic admission questions, answered" />
      <CtaBanner title={service.closingHeadline} body={service.closingBody} href="#contact" buttonLabel="Enquire now" />
    </>
  );
}
