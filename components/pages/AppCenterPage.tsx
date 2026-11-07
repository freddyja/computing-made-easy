import Link from "next/link";
import { allApps, appGroups } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionary";
import { locales, publicHref, type Locale } from "@/lib/routes";

export function AppCenterPage({ locale, d }: { locale: Locale; d: Dictionary; interest?: string }) {
  const copy = d.appCenter;
  return (
    <div className="flex min-h-full flex-1 flex-col bg-paper text-navy">
      <a
        href="#directory"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        {d.skip}
      </a>
      <header className="border-b border-gold/40 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <Link href={publicHref(locale, "home")} className="text-sm font-semibold text-gold hover:text-gold-deep">
              {copy.back}
            </Link>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{copy.kicker}</p>
            <p className="text-lg font-semibold text-white">Freddy&apos;s App Central</p>
          </div>
          <nav aria-label={d.languageLabel} className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]">
            {locales.map((item) => {
              const current = item === locale;
              return (
                <Link
                  key={item}
                  href={publicHref(item, "app-center")}
                  hrefLang={item === "pt-br" ? "pt-BR" : item}
                  lang={item === "pt-br" ? "pt-BR" : item}
                  aria-current={current ? "true" : undefined}
                  className={`px-2 py-2 ${current ? "bg-gold text-navy" : "text-white/85 hover:text-gold"}`}
                >
                  {item === "pt-br" ? "PT" : item.toUpperCase()}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main id="directory" className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{copy.body}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-navy">
          {allApps.length} {copy.sites}
        </p>
        <div className="mt-12 space-y-12">
          {appGroups.map((group) => (
            <section key={group.id} id={group.id === "tools" ? "tools" : group.id} aria-labelledby={`group-${group.id}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-gold pb-3">
                <h2 id={`group-${group.id}`} className="text-2xl font-semibold text-navy">
                  {copy.groups[group.id]}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy">
                  {group.apps.length} {copy.sites}
                </p>
              </div>
              <ul className="divide-y divide-line">
                {group.apps.map((app) => {
                  const label = app.name.replaceAll("\n", " ");
                  return (
                    <li key={app.href}>
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid gap-2 py-5 hover:bg-white sm:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-6"
                        aria-label={`${label} (${copy.opensNew})`}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy">
                          {app.subcategory}
                        </span>
                        <span>
                          <span className="block font-semibold text-navy">
                            {app.name.split("\n").map((line, index) => (
                              <span key={`${app.href}-${index}`} className="block">
                                {line}
                              </span>
                            ))}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">{app.tagline}</span>
                        </span>
                        <span className="text-sm font-semibold text-navy underline decoration-navy underline-offset-4 hover:decoration-2">
                          {copy.visit}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted">
          {allApps.length} {copy.sites}. {copy.footer}
        </p>
      </main>
    </div>
  );
}
