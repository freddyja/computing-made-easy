import { site } from "./site";

export const interestValues = [
  "business-it",
  "smart-home",
  "security",
  "general",
  "ai",
] as const;

export type InterestValue = (typeof interestValues)[number];

/** Stable English mailbox tokens. AI is a proposed option; the token stays explicit. */
export const interestSubject: Record<InterestValue, string> = {
  "business-it": "Business IT",
  "smart-home": "Smart Home",
  security: "Security",
  general: "General question",
  ai: "AI",
};

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseInterest(value: string | undefined): InterestValue {
  if (value && (interestValues as readonly string[]).includes(value)) {
    return value as InterestValue;
  }
  return "smart-home";
}

export function validateContact(
  input: ContactInput,
  messages: { name: string; email: string; message: string },
): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = messages.name;
  if (!emailPattern.test(input.email.trim())) errors.email = messages.email;
  if (!input.message.trim()) errors.message = messages.message;
  return errors;
}

export function buildMailto(input: ContactInput): string {
  const interest = parseInterest(input.interest);
  const name = input.name.trim();
  const subject = `Website inquiry — ${interestSubject[interest]} — ${name || "New lead"}`;
  const body = [
    `Name: ${name}`,
    `Email: ${input.email.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Interest: ${interestSubject[interest]}`,
    "",
    input.message.trim(),
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
