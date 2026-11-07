"use client";

import { useState, type FormEvent } from "react";
import { buildMailto, interestValues, parseInterest, validateContact } from "@/lib/contact";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { Button } from "./Button";

export function ContactForm({
  d,
  interest,
}: {
  d: Dictionary;
  interest?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState(false);
  const selected = parseInterest(interest);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      interest: String(data.get("interest") || ""),
      message: String(data.get("message") || ""),
    };
    const nextErrors = validateContact(input, d.form.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus(false);
      const targetName = nextErrors.name ? "name" : nextErrors.email ? "email" : "message";
      form.querySelector<HTMLElement>(`[name="${targetName}"]`)?.focus();
      return;
    }
    window.location.href = buildMailto(input);
    setStatus(true);
  }

  return (
    <form
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-white p-5 sm:p-7"
      aria-describedby="mailto-note"
    >
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="mb-4 text-sm font-semibold text-flag-red">
          {d.form.errors.summary}
        </p>
      )}
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
            defaultValue={selected}
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
      <p id="mailto-note" className="mt-4 text-sm leading-relaxed text-muted">
        {d.form.explanation}
      </p>
      <Button type="submit" className="mt-4">
        {d.form.submit}
      </Button>
      {status && (
        <p role="status" className="mt-4 text-sm leading-relaxed text-navy">
          {d.form.status}{" "}
          <a className="font-semibold text-electric-deep underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="mt-4 text-sm text-muted">
        {d.form.sameDay.split(site.phone)[0]}
        <a className="font-semibold text-electric-deep" href={`tel:${site.phoneTel}`}>
          {site.phone}
        </a>
        {d.form.sameDay.split(site.phone)[1] ?? ""}
      </p>
    </form>
  );
}
