import type { Dictionary } from "@/lib/dictionary";

const order = [
  "service",
  "certification",
  "bachelor",
  "associate",
  "honors",
  "since",
  "clients",
] as const;

export function CredentialList({
  d,
  compact = false,
}: {
  d: Dictionary;
  compact?: boolean;
}) {
  return (
    <dl className={compact ? "space-y-4" : "divide-y divide-line border-y border-line"}>
      {order.map((key) => {
        const item = d.credentials.items[key];
        const detail = "detail" in item ? item.detail : undefined;
        return (
          <div key={key} className={compact ? "" : "grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-electric-deep">
              {item.label}
            </dt>
            <dd className="text-base leading-relaxed text-navy">
              <span className="font-semibold">{item.value}</span>
              {detail && <span className="mt-1 block text-sm leading-relaxed text-muted">{detail}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
