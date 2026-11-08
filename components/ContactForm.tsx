"use client";

import { useEffect, useState, type FormEvent } from "react";
import { interestValues, parseInterest, validateContact, type ContactInput } from "@/lib/contact";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { mailtoFallback, submitContact, type ContactTransport, type SubmitResult } from "@/lib/submit";
import { Button } from "./Button";

export function ContactForm({
  d,
  interest,
  transport,
}: {
  d: Dictionary;
  interest?: string;
  transport?: ContactTransport;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "submitting" | "success" | "unconfigured" | "error">("idle");
  const [selected, setSelected] = useState(parseInterest(interest));
  const [mailto, setMailto] = useState(`mailto:${site.email}`);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("interest");
    if (!query) return;
    const frame = requestAnimationFrame(() => setSelected(parseInterest(query)));
    return () => cancelAnimationFrame(frame);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input: ContactInput = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      interest: String(data.get("interest") || ""),
      message: String(data.get("message") || ""),
    };
    const honeypot = String(data.get("company_website") || "");
    setMailto(mailtoFallback(input));
    const nextErrors = validateContact(input, d.form.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setPhase("idle");
      const targetName = nextErrors.name ? "name" : nextErrors.email ? "email" : "message";
      form.querySelector<HTMLElement>(`[name="${targetName}"]`)?.focus();
      return;
    }
    setPhase("submitting");
    const result: SubmitResult = await submitContact(input, honeypot, d.form.errors, transport);
    if (result.ok) {
      setPhase("success");
      return;
    }
    if (result.code === "invalid" && result.errors) {
      setErrors(result.errors);
      setPhase("idle");
      return;
    }
    setPhase(result.code === "unconfigured" ? "unconfigured" : "error");
  }

  const failed = phase === "unconfigured" || phase === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="cme-card border border-line border-t-4 border-t-gold bg-white p-5 sm:p-7" aria-describedby="form-note" aria-busy={phase === "submitting"}>
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="mb-4 text-sm font-semibold text-flag-red">
          {d.form.errors.summary}
        </p>
      )}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          {d.form.honeypot}
          <input name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy">
          {d.form.name}
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "err-name" : undefined}
            className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 font-normal text-navy"
          />
          {errors.name && (
            <span id="err-name" className="mt-1 block text-sm font-medium text-flag-red">
              {errors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-navy">
          {d.form.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "err-email" : undefined}
            className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 font-normal text-navy"
          />
          {errors.email && (
            <span id="err-email" className="mt-1 block text-sm font-medium text-flag-red">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy">
          {d.form.phone}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={d.form.phoneOptional}
            className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 font-normal text-navy placeholder:text-muted"
          />
        </label>
        <label className="block text-sm font-semibold text-navy">
          {d.form.interest}
          <select
            name="interest"
            value={selected}
            onChange={(event) => setSelected(parseInterest(event.target.value))}
            className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 font-normal text-navy"
          >
            {interestValues.map((value) => (
              <option key={value} value={value}>
                {d.form.interests[value].label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-navy">
        {d.form.message}
        <textarea
          name="message"
          required
          rows={5}
          placeholder={d.form.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "err-message" : undefined}
          className="mt-1.5 w-full resize-y border border-line bg-white px-3 py-2.5 font-normal text-navy placeholder:text-muted"
        />
        {errors.message && (
          <span id="err-message" className="mt-1 block text-sm font-medium text-flag-red">
            {errors.message}
          </span>
        )}
      </label>
      <p id="form-note" className="mt-4 text-sm leading-relaxed text-ink">
        {d.form.explanation}
      </p>
      <Button type="submit" className="mt-4">
        {phase === "submitting" ? d.form.submitting : d.form.submit}
      </Button>
      {phase === "submitting" && (
        <p role="status" className="mt-4 text-sm font-semibold text-navy">
          {d.form.submitting}
        </p>
      )}
      {phase === "success" && (
        <p role="status" className="mt-4 text-sm font-semibold text-navy">
          {d.form.success}
        </p>
      )}
      {failed && (
        <p role="alert" className="mt-4 text-sm leading-relaxed text-ink">
          {phase === "unconfigured" ? d.form.unconfigured : d.form.unavailable}{" "}
          <a className="font-semibold text-navy underline" href={mailto}>
            {d.form.fallbackEmail}
          </a>
          . {d.form.status}{" "}
          <a className="font-semibold text-navy underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="mt-4 text-sm text-ink">
        {d.form.sameDay.split(site.phone)[0]}
        <a className="font-semibold text-navy underline" href={`tel:${site.phoneTel}`}>
          {site.phone}
        </a>
        {d.form.sameDay.split(site.phone)[1] ?? ""}
      </p>
    </form>
  );
}
