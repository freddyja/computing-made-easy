import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import { publicHref, type Locale, type PageId } from "@/lib/routes";
import { site } from "@/lib/site";

const links: { page: PageId; key: "home" | "businessIt" | "smartHome" | "security" | "contact" }[] = [
  { page: "home", key: "home" },
  { page: "business-it", key: "businessIt" },
  { page: "smart-home", key: "smartHome" },
  { page: "security", key: "security" },
  { page: "contact", key: "contact" },
];

export function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <footer className="mt-auto border-t-4 border-gold bg-navy-2 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-gold">{site.smartHomeBrand}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">{d.footer.blurb}</p>
          <p className="mt-4 text-sm font-semibold text-gold">{d.footer.service}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{d.nav.explore}</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.page}>
                <Link href={publicHref(locale, link.page)} className="text-sm text-white/90 hover:text-gold active:text-gold">
                  {d.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{d.nav.contact}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${site.phoneTel}`} className="text-white hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-white hover:text-gold">
                {site.email}
              </a>
            </li>
            <li className="text-white/80">{site.address.full}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/30 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {site.name}. {d.footer.rights}
      </div>
    </footer>
  );
}
