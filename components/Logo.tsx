import Image from "next/image";

type LogoProps = {
  /** The emblem uploaded in Sanity (Company details → Logo); the built-in emblem is used when empty. */
  src?: string | null;
  /** Size of the square logo tile in pixels. */
  mark?: number;
  nameSize?: string;
  taglineSize?: string;
  gap?: string;
  /** Preload the emblem — only for the above-the-fold header logo. */
  preload?: boolean;
};

const BUILT_IN_EMBLEM = "/logo-mark.webp";

export default function Logo({
  src,
  mark = 46,
  nameSize = "text-[22px]",
  taglineSize = "text-[9px]",
  gap = "gap-3",
  preload = false,
}: LogoProps) {
  // The emblem sits on a small ivory tile with a thin gold border, fitted whatever its shape.
  const emblemBox = Math.round(mark * 0.78);
  return (
    <span className={`flex items-center ${gap}`}>
      <span
        className="grid shrink-0 place-items-center"
        style={{
          width: mark,
          height: mark,
          borderRadius: Math.round(mark * 0.24),
          background: "linear-gradient(145deg, #fffdf8, #f4ecdc)",
          boxShadow: "inset 0 0 0 1px rgba(144, 101, 30, 0.28)",
        }}
      >
        <span className="relative block" style={{ width: emblemBox, height: emblemBox }}>
          <Image src={src || BUILT_IN_EMBLEM} alt="" fill sizes={`${emblemBox}px`} preload={preload} className="object-contain" />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-semibold tracking-[0.16em] text-cream ${nameSize}`}>
          SKANDIORA
        </span>
        <span className={`${taglineSize} tracking-[0.32em] text-gold mt-[5px]`}>IMMIGRATION</span>
      </span>
    </span>
  );
}
