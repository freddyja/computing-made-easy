import Image from "next/image";
import Link from "next/link";
import { CredentialList } from "@/components/CredentialList";
import { Flag } from "@/components/Flag";
import { Button } from "@/components/Button";
import type { Dictionary } from "@/lib/dictionary";
import { focusIds, focusLinks, homeSectionOrder, publicHref, type FocusId, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

function focusCopy(d: Dictionary, id: FocusId) {
  if (id === "ai") return d.focus.ai;
  if (id === "smart-home") return d.focus.smartHome;
  if (id === "business-it") return d.focus.businessIt;
  return d.focus.security;
}

export function HomePage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const sections = {
    service: (
      <section data-section="service" className="tech-grid border-b border-line" data-copy-status={d.hero.copyStatus}>
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_1.2fr_0.85fr] lg:gap-10 lg:py-20">
          <div className="flag-frame bg-white">
            <Flag title={d.flag.title} />
            <p className="mt-3 pr-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{d.flag.caption}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric-deep">
              {site.name}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl">
              <span className="block">{d.hero.line1}</span>
              <span className="mt-2 block">{d.hero.line2.replaceAll("-", "\u2011")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/85">{d.hero.story}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${site.phoneTel}`} variant="ghost">
                {d.hero.call}
              </Button>
              <Button href={publicHref(locale, "contact")}>{d.hero.quote}</Button>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{d.hero.endorsement}</p>
          </div>
          <figure className="flag-frame bg-white">
            <Image
              src="/brand/portrait.jpg"
              alt={d.hero.portraitAlt}
              width={720}
              height={720}
              priority
              className="aspect-square w-full object-cover"
            />
            <figcaption className="mt-3 pr-4">
              <span className="block font-semibold text-navy">{d.hero.portraitCaption}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-electric-deep">
                {d.hero.portraitMeta}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
    ),
    credentials: (
      <section
        id={d.credentials.id}
        data-section="credentials"
        data-copy-status={d.credentials.copyStatus}
        className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20"
        aria-labelledby="credentials-heading"
      >
        <h2 id="credentials-heading" className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          {d.credentials.heading}
        </h2>
        <div className="mt-8">
          <CredentialList d={d} />
        </div>
      </section>
    ),
    focus: (
      <section
        id={d.focus.id}
        data-section="focus"
        className="border-t border-line bg-white"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 id="services-heading" className="max-w-3xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {d.focus.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{d.focus.lede}</p>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-y border-line py-4 text-sm font-semibold text-navy" role="list">
            {d.trust.map((item) => (
              <span key={item} role="listitem">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 divide-y divide-line">
            {focusIds.map((id) => {
              const copy = focusCopy(d, id);
              const links = focusLinks(locale, id);
              return (
                <article key={id} className="grid gap-4 py-8 lg:grid-cols-[auto_1fr_auto] lg:gap-8" data-copy-status={copy.copyStatus}>
                  <p className="font-mono text-sm text-electric-deep">{copy.index}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-navy">{copy.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.body}</p>
                    {"note" in copy && typeof copy.note === "string" && (
                      <p className="mt-3 text-sm text-navy">{copy.note}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <Link href={links.primary} className="text-sm font-semibold text-navy underline decoration-electric underline-offset-4">
                      {copy.primary}
                    </Link>
                    <Link href={links.secondary} className="text-sm font-semibold text-electric-deep">
                      {copy.secondary}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ),
    close: (
      <section data-section="close" className="bg-navy text-white">
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
    image: `${site.domain}/brand/portrait.jpg`,
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
