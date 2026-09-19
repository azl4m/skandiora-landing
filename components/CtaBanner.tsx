import Link from "next/link";

type CtaBannerProps = {
  title?: string;
  body?: string;
};

export default function CtaBanner({
  title = "Not sure which path fits you?",
  body = "Talk to a counsellor and we'll help you explore your options honestly — no pressure, no one-size-fits-all answers.",
}: CtaBannerProps) {
  return (
    <section className="px-4.5 pb-[clamp(52px,8vw,96px)]">
      <div className="max-w-[1240px] mx-auto [background:linear-gradient(160deg,#0E1A2C,#070D18)] rounded-[26px] p-[clamp(28px,4vw,52px)] grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(20px,4vw,48px)] items-center text-[#E8EDF5]">
        <div className="min-w-0">
          <h2 className="font-heading font-semibold text-[clamp(28px,3.4vw,40px)] text-white m-0 mb-3 leading-[1.15]">
            {title}
          </h2>
          <p className="text-base leading-[1.7] text-[rgba(232,237,245,0.78)] m-0 max-w-[46ch]">{body}</p>
        </div>
        <Link
          href="/#contact"
          className="justify-self-start bg-gold text-[#12243C] py-4 px-7.5 rounded-full text-[13px] tracking-[0.08em] uppercase hover:bg-white hover:text-[#F5F1E8] transition-colors"
        >
          Talk to a counsellor
        </Link>
      </div>
    </section>
  );
}
