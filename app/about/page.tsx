import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Founder from "@/components/Founder";
import JsonLd from "@/components/JsonLd";
import RevealOnScroll from "@/components/about/RevealOnScroll";
import { absoluteUrl, breadcrumbSchema, founderSchema } from "@/lib/schema";
import { getAboutPage, getFounder, getServices } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";
import { aboutHero, approach, closing, howWeHelp, officeLocations, paths, visionMission } from "@/data/about";
import styles from "./about.module.css";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "About" }];

const description =
  "Skandiora Immigration offers student-first education guidance for study in India and abroad. Meet our founder and discover how we help families choose a course, institution and country — from Kochi, Trivandrum and Chennai.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage();
  return pageMetadata(seo, { title: "About Us — Our Approach to Education Guidance", description, path: "/about" });
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Skandiora Immigration",
  url: absoluteUrl("/about"),
  description,
  about: { "@type": "EducationalOrganization", name: "Skandiora Immigration", url: absoluteUrl("/") },
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function Photo({ src, alt, sizes, className, preload = false }: { src: string; alt: string; sizes: string; className: string; preload?: boolean }) {
  return (
    <div className={`${styles.photo} ${className}`} data-reveal="image">
      <div className={styles.photoInner}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const [about, founder, services] = await Promise.all([getAboutPage(), getFounder(), getServices()]);
  return (
    <div id="about-page" className={styles.page}>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={founderSchema(founder)} />
      <RevealOnScroll rootId="about-page" />

      {/* 1 — Hero */}
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.grid} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <Breadcrumbs items={breadcrumbItems} />
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-reveal>{aboutHero.eyebrow}</p>
              <h1 id="about-title" className={`${styles.display} ${styles.heroTitle}`} data-reveal style={delay(80)}>{about.title}</h1>
              <p className={styles.heroStatement} data-reveal style={delay(180)}>{about.statement}</p>
              <p className={styles.heroBody} data-reveal style={delay(260)}>{about.text}</p>
            </div>
            <p className={styles.heroMeta} data-reveal style={delay(340)}>
              <span>Education guidance</span>
              <span>{officeLocations.join(" · ")}</span>
            </p>
          </div>
          <div className={styles.heroMedia}>
            <aside className={styles.principle} aria-label="Our guiding principle" data-reveal style={delay(200)}>
              <span className={styles.principleMark} aria-hidden="true">“</span>
              <p className={styles.principleLabel}>{aboutHero.principle.notLabel}</p>
              <p className={styles.principleQuestion}>{aboutHero.principle.notQuestion}</p>
              <p className={styles.principleLabel}>{aboutHero.principle.label}</p>
              <p className={`${styles.principleQuestion} ${styles.principleAnswer}`}>{aboutHero.principle.question}</p>
              <ol className={styles.principleSteps}>
                {approach.steps.map((step) => (
                  <li key={step.title}>
                    <span className={styles.principleStepNumber} aria-hidden="true">{String(step.number).padStart(2, "0")}</span>
                    <span className={styles.principleStepTitle}>{step.title}</span>
                  </li>
                ))}
              </ol>
              <a href="#approach" className={styles.principleLink}>
                {aboutHero.principle.link} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* 2 — Founder: the person behind a new company comes first */}
      <div className={styles.band}>
        <Founder />
      </div>

      {/* 3 — Vision & mission */}
      <section className={styles.section} aria-labelledby="purpose-title">
        <div className={styles.container}>
          <p className={styles.eyebrow} data-reveal>{visionMission.label}</p>
          <h2 id="purpose-title" className="sr-only">{visionMission.title}</h2>
          <div className={styles.purpose}>
            <div className={styles.purposeItem} data-reveal>
              <h3 className={styles.purposeLabel}>Our vision</h3>
              <p className={styles.purposeText}>{visionMission.vision}</p>
            </div>
            <div className={styles.purposeItem} data-reveal style={delay(140)}>
              <h3 className={styles.purposeLabel}>Our mission</h3>
              <p className={styles.purposeText}>{visionMission.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Our approach */}
      <section id="approach" className={`${styles.section} ${styles.band} ${styles.approach}`} aria-labelledby="approach-title">
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.approachHead}>
              <p className={styles.eyebrow} data-reveal>{approach.label}</p>
              <h2 id="approach-title" className={`${styles.display} ${styles.approachTitle}`} data-reveal style={delay(80)}>{approach.intro}</h2>
            </div>
          </div>
          <ol className={styles.steps}>
            {approach.steps.map((step, index) => (
              <li key={step.title} className={styles.step} data-reveal style={delay(index * 140)}>
                <span className={styles.stepNumber} data-count={step.number} aria-hidden="true">{String(step.number).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}><span className="sr-only">Step {step.number}: </span>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                {step.tags && (
                  <ul className={styles.tags} aria-label="What we look at">
                    {step.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — How we help: every service, one click away */}
      <section className={styles.section} aria-labelledby="help-title">
        <div className={`${styles.container} ${styles.grid}`}>
          <div className={styles.helpHead}>
            <p className={styles.eyebrow} data-reveal>{howWeHelp.label}</p>
            <h2 id="help-title" className={`${styles.display} ${styles.helpTitle}`} data-reveal style={delay(80)}>{howWeHelp.title}</h2>
            <p className={styles.helpBody} data-reveal style={delay(160)}>{howWeHelp.body}</p>
          </div>
          <ul className={styles.services} data-reveal style={delay(120)}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={styles.serviceLink}>
                  <span>{service.navTitle}</span>
                  <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — India & abroad */}
      <section className={`${styles.section} ${styles.band}`} aria-labelledby="paths-title">
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.pathsHead}>
              <p className={styles.eyebrow} data-reveal>{paths.label}</p>
              <h2 id="paths-title" className={`${styles.display} ${styles.pathsTitle}`} data-reveal style={delay(80)}>{paths.title}</h2>
            </div>
            <p className={styles.pathsBody} data-reveal style={delay(120)}>{paths.body}</p>
          </div>
          <div className={styles.panels}>
            {paths.options.map((option, index) => (
              <Link key={option.label} href={option.href} className={`${styles.panel} ${styles.zoom}`}>
                <Photo {...option.image} className={styles.panelPhoto} sizes="(min-width: 760px) 46vw, 92vw" />
                <div className={styles.panelBody} data-reveal style={delay(index * 120)}>
                  <h3 className={styles.panelLabel}>{option.label}</h3>
                  <span className={styles.panelMeta} aria-hidden="true">{index === 0 ? "20.59° N · 78.96° E" : "Worldwide"}</span>
                  <p className={styles.panelText}>{option.body}</p>
                  <span className={styles.panelLink}>{option.linkLabel} <ArrowRight size={15} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Closing */}
      <div className={styles.ctaWrap}>
        <CtaBanner
          eyebrow={closing.eyebrow}
          title={closing.title}
          body={closing.body}
          href={closing.primary.href}
          buttonLabel={closing.primary.label}
        >
          Offices in {officeLocations.join(" · ")} · <a href={closing.secondary.href} className="text-gold hover:underline">{closing.secondary.label}</a>
        </CtaBanner>
      </div>
    </div>
  );
}
