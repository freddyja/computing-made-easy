import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  CameraIcon,
  HomeIcon,
  PhoneIcon,
  ShieldIcon,
  WifiIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description: `Cameras, doorbells, sensors, and network security for Central Florida homes and businesses — ${site.name}.`,
};

const offerings = [
  {
    title: "Cameras & doorbells",
    body: "Clear outdoor and indoor cameras, smart doorbells, and apps that make it easy to see who’s at the door.",
    icon: <CameraIcon className="h-6 w-6" />,
  },
  {
    title: "Sensors & alerts",
    body: "Door/window sensors, motion, and entry alerts that fit how your household actually lives.",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    title: "Network security",
    body: "Hardened Wi-Fi, guest networks, and device hygiene so cameras and smart gear stay on a safe path.",
    icon: <WifiIcon className="h-6 w-6" />,
  },
  {
    title: "Whole-home peace of mind",
    body: "We design for Florida weather and real-world use — clean installs, labeled gear, and training for your family.",
    icon: <ShieldIcon className="h-6 w-6" />,
  },
];

export default function SecurityPage() {
  return (
    <>
      <section className="hero-mesh border-b border-navy/5">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold text-electric">Security</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Protection you can{" "}
            <span className="text-electric">count on</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Cameras, doorbells, sensors, and network security — installed and
            explained so your family (or team) actually uses it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Get a free quote
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
          eyebrow="Coverage"
          title="Security built around your property"
          description="No invented price list — we scope cameras and sensors after understanding your layout and goals."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {offerings.map((o) => (
            <article
              key={o.title}
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric text-white">
                {o.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Pair security with a smarter home
            </h2>
            <p className="mt-2 max-w-lg text-muted">
              Many clients combine cameras with our Smart Touch Homes packages
              for one cohesive setup.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/smart-home" variant="outline">
              View smart home →
            </Button>
            <Button href="/contact">Free quote →</Button>
          </div>
        </div>
      </section>
    </>
  );
}
