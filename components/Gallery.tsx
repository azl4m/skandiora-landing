import Image from "next/image";
import { getGallery } from "@/lib/cms/content";
import { imageProps } from "@/lib/cms/image";

export default async function Gallery() {
  const photos = await getGallery();
  if (!photos.length) return null;
  return (
    <section className="section-space px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3.5 mb-5.5">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">
            Students &amp; campuses
          </div>
        </div>
        <div className="grid grid-cols-2 min-[620px]:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[3/4] border border-gold/20 rounded-[18px] overflow-hidden"
            >
              {photo.image ? (
                <Image
                  {...imageProps(photo.image)}
                  alt={photo.caption}
                  fill
                  sizes="(min-width: 860px) 25vw, (min-width: 620px) 33vw, 50vw"
                  className="object-cover"
                  style={photo.image.objectPosition ? { objectPosition: photo.image.objectPosition } : undefined}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-center p-4 bg-[linear-gradient(150deg,#121E31,#0B1422)]">
                  <span className="text-xs tracking-[0.12em] uppercase text-muted">
                    {photo.caption}
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
