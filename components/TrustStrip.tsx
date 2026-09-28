import { site } from "@/lib/site";

const items = [
  "Veteran-owned",
  `Since ${site.since}`,
  `${site.clientsApprox}+ clients`,
  "Spring Hill / Brooksville",
];

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-t border-navy/10 py-6 text-center ${className}`}
      role="list"
      aria-label="Trust signals"
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-navy sm:text-base">
        {items.map((item, i) => (
          <span key={item} className="inline-flex items-center gap-2" role="listitem">
            {i > 0 && (
              <span className="text-electric" aria-hidden="true">
                •
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
