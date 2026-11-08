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
      <section className="bg-[#E7EEF5]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-navy">{copy.servicesHeading}</h2>
        <p className="mt-3 max-w-2xl text-ink">{copy.servicesNote}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {copy.items.map((item) => (
            <article key={item.title} className="cme-card cme-reveal border border-line border-t-4 border-t-[#7EB6E0] bg-white p-6">
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{item.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#062C52] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.processKicker}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{copy.processTitle}</h2>
            <ol className="mt-6 space-y-4">
              {copy.steps.map((step, index) => (
                <li key={step} className="cme-card cme-reveal grid grid-cols-[2rem_1fr] gap-3 border border-white/15 bg-navy p-4 text-white">
                  <span className="font-mono text-sm text-gold">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="cme-card border border-gold/40 bg-navy p-8 text-white">
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
