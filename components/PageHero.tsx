import Breadcrumbs from "./Breadcrumbs";

type Crumb = { href?: string; label: string };

type PageHeroProps = {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro?: string[];
};

export default function PageHero({ breadcrumbs, eyebrow, title, intro }: PageHeroProps) {
  return (
    <section
      className="px-4.5 pt-[clamp(32px,6vw,64px)] pb-[clamp(40px,6vw,72px)]"
      style={{
        background:
          "radial-gradient(1000px 420px at 82% -10%, rgba(212,168,87,0.14), transparent 60%), #ffffff",
      }}
    >
      <div className="max-w-[1240px] mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <div className="text-xs tracking-[0.24em] uppercase text-gold mt-6">{eyebrow}</div>
        <h1 className="font-heading font-semibold text-[clamp(32px,5vw,58px)] leading-[1.08] text-cream mt-3.5 max-w-[18ch] text-pretty">
          {title}
        </h1>
        {intro?.map((p) => (
          <p key={p} className="text-[clamp(16px,1.4vw,18px)] leading-[1.7] text-body-text max-w-[62ch] mt-4">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
