import { Button } from "@/components/Button";
import { PageIntro } from "@/components/pages/PageIntro";
import type { Dictionary } from "@/lib/dictionary";
import { publicHref, type Locale } from "@/lib/routes";
import { site, smartHomePackages } from "@/lib/site";

export function SmartHomePage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const copy = d.smartHome;
  return (
    <>
      <PageIntro kicker={copy.kicker} title={copy.title} lede={copy.lede}>
        <div className="mb-2 flex flex-wrap gap-2">
          {copy.badges.map((badge) => (
            <span key={badge} className="border border-gold/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
              {badge}
            </span>
          ))}
        </div>
        <Button href={publicHref(locale, "contact")}>{copy.consult}</Button>
        <Button href="#packages" variant="lightGhost">
          {copy.viewPackages}
        </Button>
      </PageIntro>
      <section id="packages" className="scroll-target bg-[#E7EEF5]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B4F00]">{copy.packagesKicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy">{copy.packagesTitle}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {smartHomePackages.map((pkg) => {
            const text = copy.packages[pkg.id];
            return (
              <article
                key={pkg.id}
                className={`cme-card cme-reveal flex flex-col border p-6 ${
                  pkg.popular ? "border-gold bg-navy text-white" : "border-line border-t-4 border-t-[#7EB6E0] bg-white text-navy"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{text.name}</h3>
                  {pkg.popular && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{copy.popular}</span>
                  )}
                </div>
                <p className={`mt-1 text-sm ${pkg.popular ? "text-white/80" : "text-ink"}`}>{text.subtitle}</p>
                <p className={`mt-5 font-mono text-2xl font-medium ${pkg.popular ? "text-gold" : "text-navy"}`}>{pkg.price}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm leading-relaxed">
                  {text.features.map((feature) => (
                    <li key={feature} className={`border-t pt-2 ${pkg.popular ? "border-white/15" : "border-line"}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button href={`${publicHref(locale, "contact")}?interest=smart-home`} variant={pkg.popular ? "solid" : "ghost"} className="mt-6 w-full">
                  {copy.choose}
                </Button>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink">{copy.disclaimer}</p>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#062C52]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.whyKicker}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{copy.whyTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.why.map((item) => (
              <article key={item.title} className="cme-card cme-reveal border border-white/15 border-t-4 border-t-gold bg-navy p-5 text-white">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-3xl font-semibold">{copy.readyTitle}</h2>
          <p className="mt-3 max-w-xl text-white/80">{copy.readyBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={publicHref(locale, "contact")} variant="light">
              {copy.book}
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="lightGhost">
              {site.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
