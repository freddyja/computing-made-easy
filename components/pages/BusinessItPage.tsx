import Link from "next/link";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import type { Dictionary } from "@/lib/dictionary";
import { publicHref, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function BusinessItPage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const copy = d.business;
  return (
    <>
      <PageIntro kicker={copy.kicker} title={copy.title} lede={copy.lede}>
        <Button href={publicHref(locale, "contact")}>{copy.primary}</Button>
        <Button href={`tel:${site.phoneTel}`} variant="lightGhost">
          {site.phone}
        </Button>
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-navy">{copy.servicesHeading}</h2>
        <p className="mt-3 max-w-2xl text-muted">{copy.servicesNote}</p>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {copy.items.map((item) => (
            <article key={item.title} className="grid gap-2 py-6 sm:grid-cols-[240px_1fr] sm:gap-8">
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric-deep">{copy.processKicker}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy">{copy.processTitle}</h2>
            <ol className="mt-6 space-y-4">
              {copy.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-navy">
                  <span className="font-mono text-sm text-electric-deep">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-line bg-navy p-8 text-white">
            <h2 className="text-2xl font-semibold">{copy.expertTitle}</h2>
            <p className="mt-3 leading-relaxed text-white/80">{copy.expertBody}</p>
            <Link href={`${publicHref(locale, "home")}#credentials`} className="mt-4 inline-block text-sm font-semibold underline">
              {copy.expertLink}
            </Link>
            <div className="mt-6">
              <Button href={publicHref(locale, "contact")} variant="light">
                {copy.quote}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
