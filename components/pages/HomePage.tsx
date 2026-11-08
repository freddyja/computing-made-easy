import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { CredentialList } from "@/components/CredentialList";
import { FaqList } from "@/components/FaqList";
import { Flag } from "@/components/Flag";
import { Button } from "@/components/Button";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import type { Dictionary } from "@/lib/dictionary";
import { focusIds, focusLinks, homeSectionOrder, publicHref, type FocusId, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

const focusAccent: Record<FocusId, string> = {
  ai: "border-l-gold",
  "smart-home": "border-l-[#7EB6E0]",
  "business-it": "border-l-white",
  security: "border-l-flag-red",
};

function focusCopy(d: Dictionary, id: FocusId) {
  if (id === "ai") return d.focus.ai;
  if (id === "smart-home") return d.focus.smartHome;
  if (id === "business-it") return d.focus.businessIt;
  return d.focus.security;
}

export function HomePage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const sections = {
    service: (
      <section data-section="service" className="hero-mesh on-blue border-b border-white/15 text-white" data-copy-status={d.hero.copyStatus}>
        <div className="hero-layout relative z-[1] mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:py-20">
          <div className="hero-flag flag-frame">
            <Flag title={d.flag.title} />
            <p className="mt-3 text-sm text-ink">{d.flag.caption}</p>
          </div>
          <div className="hero-identity">
            <p className="text-base font-semibold text-gold">{d.hero.line1}</p>
            <h1 className="mt-3 max-w-[20ch] text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white">
              {d.hero.line2}
            </h1>
            <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-white">{d.hero.story}</p>
          </div>
          <div className="hero-actions">
            <ul className="max-w-[60ch] space-y-2 text-base leading-snug text-white">
              <li>{d.credentials.items.certification.value}</li>
              <li>{d.credentials.items.bachelor.value}</li>
              <li>{d.credentials.items.since.value}</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${site.phoneTel}`} variant="lightGhost">
                <span className="sr-only">{d.hero.callAria}</span>
                <span aria-hidden="true">{d.hero.call}</span>
              </Button>
              <Button href={publicHref(locale, "contact")}>{d.hero.quote}</Button>
            </div>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-white/90">{d.hero.endorsement}</p>
          </div>
          <figure className="hero-portrait overflow-hidden rounded-lg bg-white text-ink">
            <Image
              src="/brand/freddy-profile-hero.jpg"
              alt={d.hero.portraitAlt}
              width={760}
              height={760}
              priority
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-base font-semibold">{d.hero.portraitCaption}</figcaption>
          </figure>
        </div>
      </section>
    ),
    credentials: (
      <section
        id={d.credentials.id}
        data-section="credentials"
        data-copy-status={d.credentials.copyStatus}
        className="scroll-target border-y border-white/10 bg-[#062C52]"
        aria-labelledby="credentials-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="credentials-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {d.credentials.heading}
          </h2>
          <div className="mt-8">
            <CredentialList d={d} />
          </div>
        </div>
      </section>
    ),
    focus: (
      <section
        id={d.focus.id}
        data-section="focus"
        className="scroll-target on-blue bg-navy text-white"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="services-heading" className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {d.focus.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{d.focus.lede}</p>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-y border-gold/40 py-4 text-sm font-semibold text-gold" role="list">
            {d.trust.map((item) => (
              <span key={item} role="listitem">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {focusIds.map((id) => {
              const copy = focusCopy(d, id);
              const links = focusLinks(locale, id);
              return (
                <article
                  key={id}
                  className={`cme-card cme-reveal grid gap-4 border border-white/15 border-l-4 bg-[#002B52] p-6 ${focusAccent[id]}`}
                  data-copy-status={copy.copyStatus}
                >
                  <p className="font-mono text-sm text-gold">{copy.index}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">{copy.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">{copy.body}</p>
                    {"note" in copy && typeof copy.note === "string" && <p className="mt-3 text-sm text-gold">{copy.note}</p>}
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <Link href={links.primary} className="text-sm font-semibold text-gold underline decoration-gold underline-offset-4 hover:text-gold-deep">
                      {copy.primary}
                    </Link>
                    {"secondary" in copy && links.secondary && (
                      <Link href={links.secondary} className="text-sm font-semibold text-white hover:text-gold">
                        {copy.secondary}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ),
    record: (
      <section
        id={d.stats.id}
        data-section="record"
        data-copy-status={d.stats.copyStatus}
        className="scroll-target bg-[#E7EEF5]"
        aria-labelledby="record-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="record-heading" className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {d.stats.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{d.stats.lede}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="cme-card cme-reveal border border-navy border-t-4 border-t-gold bg-navy p-6 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{d.stats.sinceLabel}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                <CountUp finalText={d.stats.sinceText} target="2004" from="2000" />
              </p>
            </article>
            <article className="cme-card cme-reveal border border-navy border-t-4 border-t-gold bg-navy p-6 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{d.stats.clientsLabel}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                <CountUp finalText={d.stats.clientsText} target="2500" from="0" />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{d.stats.clientsDetail}</p>
            </article>
          </div>
        </div>
      </section>
    ),
    questions: (
      <section id={d.faq.id} data-section="questions" className="scroll-target on-blue bg-navy" aria-labelledby="questions-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="questions-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {d.faq.heading}
          </h2>
          <FaqList items={d.faq.items} />
        </div>
      </section>
    ),
    examples: (
      <section
        id={d.testimonials.id}
        data-section="examples"
        data-copy-status={d.testimonials.copyStatus}
        className="scroll-target on-blue bg-[#062C52]"
        aria-labelledby="examples-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="examples-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {d.testimonials.heading}
          </h2>
          <TestimonialSlider copy={d.testimonials} />
        </div>
      </section>
    ),
    close: (
      <section data-section="close" className="border-t-4 border-gold bg-navy-2 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{d.close.heading}</h2>
            <p className="mt-3 max-w-xl text-white/80">{d.close.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`tel:${site.phoneTel}`} variant="light">
              {d.close.call}
            </Button>
            <Button href={publicHref(locale, "contact")} variant="lightGhost">
              {d.close.quote}
            </Button>
          </div>
        </div>
      </section>
    ),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.domain,
    telephone: site.phoneTel,
    email: site.email,
    image: `${site.domain}/brand/freddy-profile-hero.jpg`,
    founder: {
      "@type": "Person",
      name: site.owner,
      hasCredential: [
        site.service,
        site.certification,
        `${site.bachelor.name}, ${site.bachelor.school}, ${site.bachelor.place}, ${site.bachelor.date}`,
        `${site.associate.name}, ${site.associate.school}, ${site.associate.place}, ${site.associate.date}`,
        site.honors,
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: "US",
    },
    areaServed: ["Spring Hill", "Brooksville", "Central Florida"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {homeSectionOrder.map((id) => (
        <div key={id}>{sections[id]}</div>
      ))}
    </>
  );
}
