import type { FlagItem } from "@/data/destinations";

type FlagTickerProps = {
  items: FlagItem[];
  duration: string;
  reverse?: boolean;
};

export default function FlagTicker({ items, duration, reverse }: FlagTickerProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((f) => (
          <div
            key={f.key}
            className="flex-none flex items-center gap-3.5 bg-surface-raised border border-gold/22 rounded-2xl py-3.5 px-5.5 mr-3.5"
          >
            <span
              className="w-11 h-[30px] rounded flex-none shadow-[0_2px_8px_rgba(0,0,0,0.6)] bg-gold/16 bg-cover bg-center"
              style={{ backgroundImage: `url(${f.flag})` }}
            />
            <span className="flex flex-col gap-1">
              <span className="text-base text-cream whitespace-nowrap">{f.name}</span>
              <span className="text-[11px] tracking-[0.14em] uppercase text-muted whitespace-nowrap">
                {f.note}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
