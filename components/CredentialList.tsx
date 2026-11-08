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

export function CredentialList({ d }: { d: Dictionary; compact?: boolean }) {
  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {order.map((key) => {
        const item = d.credentials.items[key];
        const detail = "detail" in item ? item.detail : undefined;
        return (
          <div key={key} className="cme-card cme-reveal border border-line border-t-4 border-t-gold bg-white p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6B4F00]">{item.label}</dt>
            <dd className="mt-2 text-base leading-relaxed text-navy">
              <span className="font-semibold">{item.value}</span>
              {detail && <span className="mt-1 block text-sm leading-relaxed text-ink">{detail}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
