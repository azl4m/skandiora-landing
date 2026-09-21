import Image from "next/image";
import { ArrowRight } from "lucide-react";
import StudyEnquiryLink from "./StudyEnquiryLink";

type DestinationCardProps = {
  name: string;
  image: string;
  description: string;
  course: string;
};

export default function DestinationCard({ name, image, description, course }: DestinationCardProps) {
  return (
    <StudyEnquiryLink course={course} destination={name} className="destination-card group relative block aspect-[4/5] overflow-hidden rounded-[20px] border border-gold/25 bg-[#101A2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
      <Image src={image} alt="" fill sizes="(max-width: 639px) 82vw, (max-width: 999px) 46vw, 280px" className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />
      <h3 className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#07101D]/85 px-4 py-2 text-sm font-medium text-cream backdrop-blur-sm">{name}</h3>
      <div className="destination-card-description absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04080F] via-[#04080F]/90 to-transparent px-5 pb-5 pt-14 opacity-0 translate-y-2 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 motion-reduce:transition-none">
        <p className="text-sm leading-relaxed text-[#EAF0FA]">{description}</p>
        <span className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-gold-soft">Enquire about medicine <ArrowRight size={17} aria-hidden="true" /></span>
      </div>
      <span className="sr-only">Enquire about medical study in {name}</span>
    </StudyEnquiryLink>
  );
}
