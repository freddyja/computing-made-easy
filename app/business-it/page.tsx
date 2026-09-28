import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  CloudIcon,
  MonitorIcon,
  PhoneIcon,
  WifiIcon,
  WrenchIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business IT",
  description: `Managed IT, repair, remote support, and wireless for Central Florida businesses — ${site.name}.`,
};

const services = [
  {
    title: "Managed IT & support",
    body: "Proactive monitoring, patching, and help-desk style support so issues get fixed before they slow you down.",
    icon: <MonitorIcon className="h-6 w-6" />,
  },
  {
    title: "Networks & Wi-Fi",
    body: "Business-grade wireless, switches, and structured cabling designed for offices, clinics, and retail floors.",
    icon: <WifiIcon className="h-6 w-6" />,
  },
  {
    title: "Cloud & backup",
    body: "Microsoft 365, file sync, and backup strategies that protect your data without adding busywork.",
    icon: <CloudIcon className="h-6 w-6" />,
  },
  {
    title: "Repair & on-site",
    body: "Hardware repair, workstation setup, and on-site visits across Spring Hill, Brooksville, and nearby.",
    icon: <WrenchIcon className="h-6 w-6" />,
  },
];

export default function BusinessItPage() {
  return (
    <>
      <section className="hero-mesh border-b border-navy/5">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold text-electric">Business IT</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            IT that keeps your business{" "}
            <span className="text-electric">moving</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Reliable networks, cloud solutions, and hands-on support from a
            veteran-owned team that&apos;s served Central Florida since{" "}
            {site.since}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Request a free quote
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="secondary">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What we help businesses with"
          description="Solid structure from typical CME engagements — pricing is scoped after a short discovery call, not listed as fixed packages."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric text-white">
                {s.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="How it works"
                title="Straightforward, local support"
              />
              <ol className="mt-6 space-y-4">
                {[
                  "Tell us what’s breaking or what you want to improve.",
                  "We assess your network, devices, and priorities.",
                  "You get a clear plan — then we implement and support it.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-navy/80">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl bg-navy p-8 text-white">
              <h3 className="text-xl font-bold">Talk with a local expert</h3>
              <p className="mt-2 text-sm text-blue-100">
                {site.owner} ({site.ownerCreds}) — ~{site.clientsApprox} clients
                served since {site.since}.
              </p>
              <Button href="/contact" className="mt-6 bg-white text-navy hover:bg-blue-50">
                Free quote →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
