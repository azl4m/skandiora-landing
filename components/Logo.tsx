type LogoProps = {
  mark?: number;
  nameSize?: string;
  taglineSize?: string;
  gap?: string;
};

export default function Logo({
  mark = 46,
  nameSize = "text-[22px]",
  taglineSize = "text-[9px]",
  gap = "gap-3",
}: LogoProps) {
  return (
    <span className={`flex items-center ${gap}`}>
      <span
        className="flex items-center justify-center shrink-0 rounded-[10px] bg-cream text-ink shadow-[0_0_0_1px_rgba(212,168,87,0.35),0_8px_22px_rgba(0,0,0,0.5)]"
        style={{ width: mark, height: mark }}
      >
        <span className="font-heading font-semibold" style={{ fontSize: mark * 0.46 }}>
          S
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
