import CardCarousel from "./CardCarousel";
import styles from "./Testimonials.module.css";
import { getTestimonials, type Testimonial } from "@/lib/cms/content";

// Built-in design placeholders, used only until testimonials are added in Sanity.
const samples: Testimonial[] = [
  { name: "Sample profile 01", service: "Study abroad guidance", quote: "Having someone explain the course and destination options clearly made the next step feel easier to understand." },
  { name: "Sample profile 02", service: "Domestic admissions", quote: "We appreciated a conversation that considered the course, location and budget together, with room to ask our questions." },
  { name: "Sample profile 03", service: "MBBS abroad guidance", quote: "It helped to discuss the different study pathways and understand what we should check before choosing a university." },
  { name: "Sample profile 04", service: "Credit transfer guidance", quote: "Discussing my previous studies helped me understand which questions to ask and what documents to prepare next." },
];

const initials = (name: string) =>
  name.split(/\s+/).filter((word) => /^\p{L}/u.test(word)).map((word) => word[0].toUpperCase()).slice(0, 2).join("");

export default async function Testimonials({ note }: { note?: string }) {
  const testimonials = await getTestimonials(samples);
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials-heading" className="section-space px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-8 text-center min-[640px]:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Testimonials</p>
          <h2 id="testimonials-heading" className="mt-3 font-heading font-semibold text-[clamp(30px,4.2vw,48px)] leading-[1.12] text-cream">Every journey has a story.</h2>
          {note && <p className="mx-auto mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">{note}</p>}
        </div>
        <CardCarousel label="Testimonials" itemLabel="testimonials" slideWidth="min(84cqw, 380px)">
          {testimonials.map((item) => (
            <figure key={item.name + item.quote.slice(0, 20)} className={styles.card}>
              <span aria-hidden="true" className={styles.mark}>&ldquo;</span>
              {item.service && <span className={styles.tag}>{item.service}</span>}
              <blockquote className={styles.quote}><p>{item.quote}</p></blockquote>
              <figcaption className={styles.author}>
                <span aria-hidden="true" className={styles.avatar}>{initials(item.name)}</span>
                <span className={styles.name}>{item.name}</span>
              </figcaption>
            </figure>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
