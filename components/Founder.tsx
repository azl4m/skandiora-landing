import Image from "next/image";
import { getFounder } from "@/lib/cms/content";
import { imageProps } from "@/lib/cms/image";
import styles from "./Founder.module.css";

export default async function Founder() {
  const founder = await getFounder();
  const [experience] = founder.credentials;

  return (
    <section aria-labelledby="founder-heading" className="section-space px-4.5">
      <div className={`max-w-[1240px] mx-auto ${styles.grid}`}>
        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              {...imageProps(founder.image)}
              alt={founder.image.placeholder ? "" : `Portrait of ${founder.name}`}
              fill
              sizes="(min-width: 900px) 440px, (min-width: 480px) 440px, 92vw"
              style={founder.image.objectPosition ? { objectPosition: founder.image.objectPosition } : undefined}
            />
          </div>
          {experience && (
            <div className={styles.badge} aria-hidden="true">
              <span className={styles.badgeValue}>{experience.label}</span>
              <span className={styles.badgeText}>{experience.detail}</span>
            </div>
          )}
        </div>

        <div>
          <p className={styles.eyebrow}>Meet the founder</p>
          <h2 id="founder-heading" className={styles.name}>{founder.name}</h2>
          <p className={styles.role}>{founder.role}</p>
          <p className={styles.headline}>{founder.headline}</p>
          <div className={styles.bio}>
            {founder.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <ul className={styles.credentials} aria-label={`${founder.name}'s experience and education`}>
            {founder.credentials.map((item) => (
              <li key={item.detail} className={styles.credential}>
                <span className={styles.credentialLabel}>{item.label}</span>
                <span className={styles.credentialDetail}>{item.detail}</span>
              </li>
            ))}
          </ul>
          <p className={styles.signoff}>{founder.signoff}</p>
        </div>
      </div>
    </section>
  );
}
