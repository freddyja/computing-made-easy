import { Button } from "@/components/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import type { Dictionary } from "@/lib/dictionary";
import { publicHref, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function SecurityPage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const copy = d.security;
  return (
    <>
      <PageIntro kicker={copy.kicker} title={copy.title} lede={copy.lede}>
        <Button href={publicHref(locale, "contact")}>{copy.quote}</Button>
        <Button href={`tel:${site.phoneTel}`} variant="lightGhost">
          {site.phone}
        </Button>
      </PageIntro>
      <section className="bg-[#E7EEF5]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B4F00]">{copy.coverageKicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy">{copy.coverageTitle}</h2>
        <p className="mt-3 max-w-2xl text-ink">{copy.coverageNote}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {copy.items.map((item) => (
            <article key={item.title} className="cme-card cme-reveal border border-line border-t-4 border-t-flag-red bg-white p-6">
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{item.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#062C52] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{copy.pairTitle}</h2>
            <p className="mt-3 max-w-xl text-white/80">{copy.pairBody}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={publicHref(locale, "smart-home")} variant="ghost">
              {copy.viewSmart}
            </Button>
            <Button href={publicHref(locale, "contact")}>{d.nav.quote}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
