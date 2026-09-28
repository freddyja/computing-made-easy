"use client";

import { useState, FormEvent } from "react";
import { site } from "@/lib/site";
import { Button } from "./Button";

const interests = [
  "Business IT",
  "Smart Home",
  "Security",
  "General question",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Website inquiry — ${interest || "General"} — ${name || "New lead"}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Interest: ${interest}`,
        "",
        message,
      ].join("\n"),
    );

    // Client-side mailto — no paid backend for MVP
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Name
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-navy placeholder:text-muted/60 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-medium text-navy">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-navy placeholder:text-muted/60 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-navy placeholder:text-muted/60 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
            placeholder={site.phone}
          />
        </label>
        <label className="block text-sm font-medium text-navy">
          Service interest
          <select
            name="interest"
            className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-navy focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
            defaultValue="Smart Home"
          >
            {interests.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium text-navy">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1.5 w-full resize-y rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-navy placeholder:text-muted/60 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
          placeholder="Tell us what you need help with…"
        />
      </label>
      <Button type="submit" className="w-full sm:w-auto">
        Send message →
      </Button>
      {status === "ready" && (
        <p className="text-sm text-muted" role="status">
          Opening your email app… If nothing opens, email us at{" "}
          <a className="font-medium text-electric underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="text-xs text-muted">
        Or call{" "}
        <a className="font-semibold text-electric" href={`tel:${site.phoneTel}`}>
          {site.phone}
        </a>{" "}
        — we usually respond the same business day.
      </p>
    </form>
  );
}
