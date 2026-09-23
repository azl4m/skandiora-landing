import { courseCategories } from "@/data/courses";

export default function Courses() {
  return (
    <section className="section-space px-4.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-xs tracking-[0.24em] uppercase text-gold">
          Find the course that fits your future
        </div>
        <h2 className="font-heading font-semibold text-[clamp(30px,4vw,48px)] text-cream leading-[1.12] mt-3.5 mb-4">
          Your interests matter. Your goals matter. Your choice matters.
        </h2>
        <p className="text-base leading-[1.7] text-body-text max-w-[56ch] mb-8">
          The right course can become the foundation of your future career. Our role is not
          simply to show you courses — our role is to help you understand your options that may
          align with your background, interests, eligibility and long-term plans.
        </p>
        <div className="flex flex-wrap gap-3">
          {courseCategories.map((c) => (
            <span
              key={c}
              className="text-sm tracking-[0.04em] text-cream border border-gold/24 rounded-full py-2.5 px-5 bg-surface-raised"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
