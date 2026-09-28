import { Button } from "@/components/Button";
import { FunnelCard } from "@/components/FunnelCard";
import { TrustStrip } from "@/components/TrustStrip";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  HomeIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              IT and smart homes{" "}
              <span className="text-electric">that just work</span>
            </h1>
            <p className="mt-5 max-w-xl border-l-4 border-navy pl-4 text-base leading-relaxed text-navy/80 sm:text-lg">
              Veteran-owned support for businesses and homes across{" "}
              {site.serviceArea}. Since {site.since}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={`tel:${site.phoneTel}`}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {site.phone}
              </Button>
              <Button href="/contact" className="w-full sm:w-auto">
                Get a free quote
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Decorative hero graphic — CSS/SVG, no stock photo */}
          <div
            className="relative mx-auto hidden w-full max-w-md animate-fade-up-delay-1 lg:block"
            aria-hidden="true"
          >
            <div className="relative aspect-square">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <defs>
                  <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
                {/* network mesh */}
                <g stroke="#93C5FD" strokeWidth="1.5" opacity="0.5">
                  <circle cx="60" cy="80" r="4" fill="#2563EB" />
                  <circle cx="140" cy="40" r="3" fill="#2563EB" />
                  <circle cx="320" cy="70" r="4" fill="#2563EB" />
                  <circle cx="360" cy="160" r="3" fill="#2563EB" />
                  <circle cx="40" cy="200" r="3" fill="#2563EB" />
                  <line x1="60" y1="80" x2="140" y2="40" />
                  <line x1="140" y1="40" x2="320" y2="70" />
                  <line x1="320" y1="70" x2="360" y2="160" />
                  <line x1="60" y1="80" x2="40" y2="200" />
                  <line x1="140" y1="40" x2="200" y2="180" />
                </g>
                {/* house */}
                <rect x="110" y="180" width="180" height="140" rx="4" fill="#F8FAFC" stroke="#0B1F3A" strokeWidth="3" />
                <polygon points="100,185 200,110 300,185" fill="url(#roof)" />
                <rect x="175" y="250" width="50" height="70" rx="2" fill="#0B1F3A" />
                <rect x="130" y="210" width="36" height="36" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
                <rect x="234" y="210" width="36" height="36" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
                {/* solar */}
                <rect x="150" y="130" width="40" height="22" rx="2" fill="#93C5FD" opacity="0.9" transform="rotate(-18 150 130)" />
                <rect x="210" y="125" width="40" height="22" rx="2" fill="#93C5FD" opacity="0.9" transform="rotate(12 210 125)" />
                {/* wifi signal above */}
                <g transform="translate(200 95)" stroke="#2563EB" fill="none" strokeWidth="2.5">
                  <path d="M-18 8a28 28 0 0 1 36 0" />
                  <path d="M-11 14a16 16 0 0 1 22 0" />
                  <circle cx="0" cy="20" r="3" fill="#2563EB" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Three funnels */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="funnels-heading">
        <h2 id="funnels-heading" className="sr-only">
          Our services
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          <FunnelCard
            href="/business-it"
            title="Business IT"
            description="Reliable networks, cloud solutions, and proactive support to keep your business moving."
            icon={<BriefcaseIcon className="h-6 w-6" />}
            className="animate-fade-up-delay-1"
          />
          <FunnelCard
            href="/smart-home"
            title="Smart Home"
            description="Smart lighting, thermostats, entertainment, and automation tailored to your lifestyle."
            icon={<HomeIcon className="h-6 w-6" />}
            className="animate-fade-up-delay-2"
          />
          <FunnelCard
            href="/security"
            title="Security"
            description="Cameras, doorbells, sensors, and network security you can count on."
            icon={<ShieldIcon className="h-6 w-6" />}
            className="animate-fade-up-delay-3"
          />
        </div>
        <TrustStrip className="mt-4" />
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Ready when you are
            </h2>
            <p className="mt-2 max-w-lg text-muted">
              Talk with {site.owner} — local, veteran-owned help for IT, smart
              homes, and security.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`tel:${site.phoneTel}`} variant="secondary">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </Button>
            <Button href="/contact">Free quote →</Button>
          </div>
        </div>
      </section>
    </>
  );
}
