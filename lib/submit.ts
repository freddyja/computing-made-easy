import { buildMailto, parseInterest, validateContact, type ContactErrors, type ContactInput } from "./contact";

export const contactEndpoint = "/contact-submit.php";

export type SubmitCode = "unconfigured" | "invalid" | "rejected" | "error";

export type SubmitResult =
  | { ok: true; delivered: true }
  | { ok: false; code: SubmitCode; errors?: ContactErrors };

export type ContactTransport = (body: ContactPayload) => Promise<{ status: number; body: unknown }>;

export type ContactPayload = ContactInput & { company_website: string };

/** A success state is allowed only when the server says the message was delivered. */
export function interpretSubmitResponse(status: number, body: unknown): SubmitResult {
  if (!body || typeof body !== "object") {
    return { ok: false, code: status >= 500 ? "error" : "unconfigured" };
  }
  const record = body as { ok?: unknown; delivered?: unknown; code?: unknown; errors?: ContactErrors };
  if (record.ok === true && record.delivered === true) {
    return { ok: true, delivered: true };
  }
  if (
    record.code === "unconfigured" ||
    record.code === "invalid" ||
    record.code === "rejected" ||
    record.code === "error"
  ) {
    return { ok: false, code: record.code, errors: record.errors };
  }
  return { ok: false, code: status >= 500 ? "error" : "unconfigured" };
}

export async function submitContact(
  input: ContactInput,
  honeypot: string,
  messages: { name: string; email: string; message: string },
  transport?: ContactTransport,
): Promise<SubmitResult> {
  const errors = validateContact(input, messages);
  if (Object.keys(errors).length) return { ok: false, code: "invalid", errors };
  if (honeypot.trim()) return { ok: false, code: "rejected" };

  const payload: ContactPayload = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    interest: parseInterest(input.interest),
    message: input.message.trim(),
    company_website: honeypot,
  };

  try {
    const response = transport
      ? await transport(payload)
      : await postContact(payload);
    return interpretSubmitResponse(response.status, response.body);
  } catch {
    return { ok: false, code: "error" };
  }
}

async function postContact(payload: ContactPayload): Promise<{ status: number; body: unknown }> {
  const response = await fetch(contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  try {
    return { status: response.status, body: JSON.parse(text) as unknown };
  } catch {
    return { status: response.status, body: null };
  }
}

export function mailtoFallback(input: ContactInput): string {
  return buildMailto(input);
}
