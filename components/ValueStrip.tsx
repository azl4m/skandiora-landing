const items = [
  "Abroad admissions",
  "Domestic admissions",
  "MBBS",
  "Credit transfer",
  "Education loans",
  "Language training",
  "Attestation",
  "Accommodation",
  "Visa assistance",
];

const looped = items.concat(items).map((label, i) => ({ key: `${label}-${i}`, label }));

export default function ValueStrip() {
  return (
    <section
      className="bg-[#0D1728] text-[#E8EDF5] py-4.5 border-t border-b border-gold/18 overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: "30s" }}
      >
        {looped.map((item) => (
          <span
            key={item.key}
            className="flex items-center gap-x-[clamp(14px,4vw,52px)] px-[clamp(7px,2vw,26px)] text-[clamp(11px,2.6vw,13px)] tracking-[0.12em] uppercase text-[rgba(232,237,245,0.82)] whitespace-nowrap"
          >
            {item.label}
            <span className="text-gold" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
