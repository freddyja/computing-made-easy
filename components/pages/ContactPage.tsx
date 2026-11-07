import { ContactForm } from "@/components/ContactForm";
import { CredentialList } from "@/components/CredentialList";
import { PageIntro } from "@/components/pages/PageIntro";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export function ContactPage({
  d,
  interest,
}: {
  locale: Locale;
  d: Dictionary;
  interest?: string;
}) {
  const copy = d.contact;
  return (
    <>
      <PageIntro kicker={copy.kicker} title={copy.title} lede={copy.lede} />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <a href={`tel:${site.phoneTel}`} className="block border border-line bg-white p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-electric-deep">{copy.phone}</span>
            <span className="mt-1 block text-2xl font-semibold text-navy">{site.phone}</span>
          </a>
          <a href={`mailto:${site.email}`} className="block border border-line bg-white p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-electric-deep">{copy.email}</span>
            <span className="mt-1 block break-all text-lg font-semibold text-navy">{site.email}</span>
          </a>
          <div className="border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-electric-deep">{copy.address}</p>
            <p className="mt-1 text-lg font-semibold text-navy">{site.address.line1}</p>
            <p className="text-navy">
              {site.address.city}, {site.address.state}
            </p>
            <p className="mt-2 text-sm text-muted">{copy.serving}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted">{copy.owner}</p>
          <div>
            <h2 className="text-xl font-semibold text-navy">{copy.credentialsHeading}</h2>
            <div className="mt-4">
              <CredentialList d={d} compact />
            </div>
          </div>
        </div>
        <ContactForm d={d} interest={interest} />
      </section>
    </>
  );
}
