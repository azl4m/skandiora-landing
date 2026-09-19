import Link from "next/link";
import type { ServicePage } from "@/data/services";

export default function RelatedServices({ items }: { items: ServicePage[] }) {
  if (items.length === 0) return null;

  return (
    <section className="px-4.5 pb-[clamp(40px,6vw,64px)]">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-xs tracking-[0.2em] uppercase text-gold mb-5">Related services</div>
        <div className="grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="flex items-start gap-3.5 rounded-[16px] bg-[#101A2B] border border-gold/16 p-5 hover:border-gold/40 transition-colors"
            >
              <span className="text-2xl" aria-hidden>
                {s.icon}
              </span>
              <span>
                <span className="block text-[15px] font-medium text-cream mb-1">{s.navTitle}</span>
                <span className="block text-sm leading-[1.5] text-muted">{s.cardBody}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
