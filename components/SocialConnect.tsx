import { AtSign } from "lucide-react";
import { socialLinks } from "@/data/socials";

function SocialIcon({ id }: { id: typeof socialLinks[number]["id"] }) {
  if (id === "threads") return <AtSign size={23} strokeWidth={1.5} aria-hidden="true" />;
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {id === "x" && <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.2l8.3-9.5L2.8 2h6.5l4.5 6.9L18.9 2ZM17.4 20h2.1L8.2 4H6z" />}
    {id === "instagram" && <g stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></g>}
    {id === "facebook" && <path fill="currentColor" d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.3 1.2 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />}
    {id === "linkedin" && <g fill="currentColor"><circle cx="4.5" cy="4.5" r="2" /><path d="M3 8h3v13H3zM9 8h3v1.8c.9-1.4 2.1-2.1 3.8-2.1 3.1 0 5.2 1.9 5.2 5.9V21h-3.5v-6.7c0-2.1-.7-3.3-2.3-3.3-1.8 0-2.7 1.2-2.7 3.3V21H9z" /></g>}
  </svg>;
}

export default function SocialConnect() {
  return (
    <section aria-labelledby="social-heading" className="px-5 min-[640px]:px-8 py-6">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center min-[640px]:justify-between gap-4 border-y border-gold/15 py-4">
        <h2 id="social-heading" className="sr-only min-[640px]:not-sr-only min-[640px]:font-heading min-[640px]:text-2xl min-[640px]:text-cream">Connect with <span className="text-gold-soft">Skandiora.</span></h2>
        <ul className="flex flex-nowrap items-center gap-2 min-[640px]:gap-3">
          {socialLinks.map((social) => (
            <li key={social.id} className="shrink-0">
              <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name} aria-label={"Visit Skandiora on " + social.name + " (opens in a new tab)"} className="grid size-11 place-items-center rounded-full border border-gold/20 bg-[#0C1625] text-gold transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none">
                <SocialIcon id={social.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
