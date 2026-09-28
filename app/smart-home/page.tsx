import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  CheckIcon,
  DollarIcon,
  HomeIcon,
  InfoIcon,
  ShieldIcon,
  StarIcon,
  WrenchIcon,
} from "@/components/icons";
import { site, smartHomePackages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Smart Home",
  description: `Smart Touch Homes — Alexa-friendly packages for Florida homes. Basic, Standard, and Premium installs by ${site.name}.`,
};

const whyUs = [
  {
    title: "Veteran-owned",
    body: "Proudly serving our community with integrity.",
    icon: <ShieldIcon className="h-7 w-7 text-electric" />,
  },
  {
    title: "Expert install",
    body: "Professional, clean installs built for Florida weather.",
    icon: <WrenchIcon className="h-7 w-7 text-electric" />,
  },
  {
    title: "Simple tech",
    body: "Intuitive setups that are easy to use every day.",
    icon: <HomeIcon className="h-7 w-7 text-electric" />,
  },
  {
    title: "Save money",
    body: "Energy-efficient setups that lower costs over time.",
    icon: <DollarIcon className="h-7 w-7 text-electric" />,
  },
];

export default function SmartHomePage() {
  return (
    <>
      <section className="hero-mesh border-b border-navy/5">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold text-electric">
            {site.smartHomeBrand}
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Make your home{" "}
            <span className="text-electric">smarter</span>
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Simple setup", "Secure", "Efficient"].map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-electric-soft px-3 py-1 text-xs font-semibold text-navy"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Seamless Alexa ecosystem integration with weatherproof installs
            built for Florida living. Co-led with {site.coOwner}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Get free consultation
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href="#packages" variant="outline">
              View packages ↗
            </Button>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Packages"
          title="Choose the perfect smart home solution."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {smartHomePackages.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                pkg.popular
                  ? "border-electric ring-2 ring-electric/20"
                  : "border-navy/10"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-electric px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  <StarIcon className="h-3 w-3" /> Popular
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-soft text-electric">
                <HomeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">{pkg.name}</h3>
              <p className="text-sm text-muted">{pkg.subtitle}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-navy/80">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-2xl font-bold text-navy">{pkg.price}</p>
              <Button
                href="/contact"
                variant={pkg.popular ? "primary" : "outline"}
                className="mt-4 w-full"
              >
                Choose plan
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-muted">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Starting package ranges from the live site — final price depends on
            your home&apos;s needs and custom scope. Confirm before quoting.
          </span>
        </p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why us"
            title="Why Florida homeowners choose us"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-2xl border border-navy/5 bg-white p-5"
              >
                <div className="shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready for a smarter home?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-blue-100">
            Free consultation — we&apos;ll walk your space and recommend the
            right package.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" className="bg-white text-navy hover:bg-blue-50">
              Book consultation →
            </Button>
            <Button
              href={`tel:${site.phoneTel}`}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Call {site.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
