import Image from "next/image";

type LogoProps = {
  /** Height of the emblem in pixels. */
  mark?: number;
  nameSize?: string;
  taglineSize?: string;
  gap?: string;
  /** Preload the emblem — only for the above-the-fold header logo. */
  preload?: boolean;
};

// Transparent emblem cut from the brand logo; its natural aspect ratio is 164 × 192.
const EMBLEM_RATIO = 164 / 192;

export default function Logo({
  mark = 46,
  nameSize = "text-[22px]",
  taglineSize = "text-[9px]",
  gap = "gap-3",
  preload = false,
}: LogoProps) {
  return (
    <span className={`flex items-center ${gap}`}>
      <Image
        src="/logo-mark.webp"
        alt=""
        width={Math.round(mark * EMBLEM_RATIO)}
        height={mark}
        preload={preload}
        className="shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-semibold tracking-[0.16em] text-cream ${nameSize}`}>
          SKANDIORA
        </span>
        <span className={`${taglineSize} tracking-[0.32em] text-gold mt-[5px]`}>IMMIGRATION</span>
      </span>
    </span>
  );
}
