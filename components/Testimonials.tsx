import CardCarousel from "./CardCarousel";
import styles from "./Testimonials.module.css";

// Design placeholders only. Replace with approved, genuine feedback before launch.
const samples = [
  { name: "Sample profile 01", initials: "S1", subject: "Study abroad guidance", quote: "Having someone explain the course and destination options clearly made the next step feel easier to understand." },
  { name: "Sample profile 02", initials: "S2", subject: "Domestic admissions", quote: "We appreciated a conversation that considered the course, location and budget together, with room to ask our questions." },
  { name: "Sample profile 03", initials: "S3", subject: "MBBS abroad guidance", quote: "It helped to discuss the different study pathways and understand what we should check before choosing a university." },
  { name: "Sample profile 04", initials: "S4", subject: "Credit transfer guidance", quote: "Discussing my previous studies helped me understand which questions to ask and what documents to prepare next." },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="section-space px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-8 text-center min-[640px]:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Testimonials</p>
          <h2 id="testimonials-heading" className="mt-3 font-heading font-semibold text-[clamp(30px,4.2vw,48px)] leading-[1.12] text-cream">Every journey has a story.</h2>
          <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">Design preview — the names and feedback below are placeholders, not real testimonials.</p>
        </div>
        <CardCarousel label="Sample testimonial designs" itemLabel="testimonials" slideWidth="min(84cqw, 380px)">
          {samples.map((sample) => (
            <figure key={sample.name} className={styles.card}>
              <span aria-hidden="true" className={styles.mark}>&ldquo;</span>
              <span className={styles.tag}>{sample.subject}</span>
              <blockquote className={styles.quote}><p>{sample.quote}</p></blockquote>
              <figcaption className={styles.author}>
                <span aria-hidden="true" className={styles.avatar}>{sample.initials}</span>
                <span>
                  <span className={styles.name}>{sample.name}</span>
                  <span className={styles.role}>Sample feedback</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
