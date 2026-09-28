import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.phone}, email ${site.email}, or send a message — ${site.address.full}.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-electric">Contact</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Let&apos;s make tech{" "}
          <span className="text-electric">easy</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Tell us what you need — Business IT, Smart Home, or Security. Prefer
          to talk? Call anytime.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition hover:border-electric/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-white">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-muted">Phone</span>
              <span className="text-lg font-bold text-navy">{site.phone}</span>
            </span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition hover:border-electric/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-white">
              <MailIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-muted">Email</span>
              <span className="break-all text-base font-bold text-navy">
                {site.email}
              </span>
            </span>
          </a>
          <div className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-white">
              <MapPinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-muted">Address</p>
              <p className="font-bold text-navy">{site.address.line1}</p>
              <p className="text-navy">
                {site.address.city}, {site.address.state}
              </p>
              <p className="mt-2 text-sm text-muted">
                Serving {site.serviceArea}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">
            Owner: {site.owner} ({site.ownerCreds}). Veteran-owned since{" "}
            {site.since}.
          </p>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
