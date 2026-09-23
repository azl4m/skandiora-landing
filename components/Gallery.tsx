import Image from "next/image";
import { galleryFrames } from "@/data/gallery";

export default function Gallery() {
  return (
    <section className="section-space px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3.5 mb-5.5">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">
            Students &amp; campuses
          </div>
          <div className="text-sm text-muted">Drop your own photos into these frames.</div>
        </div>
        <div className="grid grid-cols-2 min-[620px]:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {galleryFrames.map((frame) => (
            <div
              key={frame.id}
              className="relative aspect-[3/4] border border-gold/20 rounded-[18px] overflow-hidden"
            >
              {frame.src ? (
                <Image
                  src={frame.src}
                  alt={frame.label}
                  fill
                  sizes="(min-width: 860px) 25vw, (min-width: 620px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-center p-4 bg-[linear-gradient(150deg,#121E31,#0B1422)]">
                  <span className="text-xs tracking-[0.12em] uppercase text-muted">
                    {frame.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
