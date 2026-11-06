import { appGroups, allApps } from "@/lib/apps";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/routes";

export function AppCenterPage({ d }: { d: Dictionary; locale: Locale; interest?: string }) {
  const copy = d.appCenter;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric-deep">{copy.kicker}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{copy.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{copy.body}</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-navy">
        {allApps.length} {copy.sites}
      </p>
      <div className="mt-12 space-y-12">
        {appGroups.map((group) => (
          <section key={group.id} id={group.id === "tools" ? "tools" : group.id} aria-labelledby={`group-${group.id}`}>
            <div className="flex items-baseline justify-between gap-4 border-b border-navy pb-3">
              <h2 id={`group-${group.id}`} className="text-2xl font-semibold text-navy">
                {copy.groups[group.id]}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
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
                      className="grid gap-2 py-5 sm:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-6"
                      aria-label={`${label} (${copy.opensNew})`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-electric-deep">
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
                      <span className="text-sm font-semibold text-navy underline decoration-electric underline-offset-4">
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
    </div>
  );
}
