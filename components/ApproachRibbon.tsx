type ApproachRibbonProps = {
  items: string[];
};

export default function ApproachRibbon({ items }: ApproachRibbonProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 && (
            <span className="text-gold/70" aria-hidden>
              →
            </span>
          )}
          <span className="font-heading text-[clamp(16px,2.2vw,22px)] font-medium text-cream">
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}
