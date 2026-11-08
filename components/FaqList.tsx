"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

export function FaqList({ items }: { items: Dictionary["faq"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 space-y-3">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <article key={item.q} className="cme-card cme-reveal border border-white/15 border-t-4 border-t-gold bg-navy-2">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-white hover:text-gold"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.q}
                <span aria-hidden="true" className="font-mono text-gold">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
              <p className="px-5 pb-5 text-base leading-relaxed text-white/85">{item.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
