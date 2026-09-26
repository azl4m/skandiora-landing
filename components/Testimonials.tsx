import CardCarousel from "./CardCarousel";
import styles from "./Testimonials.module.css";
import { getTestimonials } from "@/lib/cms/content";

const initials = (name: string) =>
  name.split(/\s+/).filter((word) => /^\p{L}/u.test(word)).map((word) => word[0].toUpperCase()).slice(0, 2).join("");

export default async function Testimonials({ note }: { note?: string }) {
  // Genuine testimonials only; the section hides until at least one is published and shown.
  const testimonials = await getTestimonials();
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
