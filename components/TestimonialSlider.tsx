"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

export function TestimonialSlider({ copy }: { copy: Dictionary["testimonials"] }) {
  const [index, setIndex] = useState(0);
  const count = copy.slides.length;
  const slide = copy.slides[index] ?? copy.slides[0];
  const position = copy.position.replace("{current}", String(index + 1)).replace("{total}", String(count));

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <div className="mt-8" aria-roledescription="carousel" aria-label={copy.heading}>
      <p role="note" className="max-w-3xl border border-gold bg-[#fff8e6] px-4 py-3 text-sm font-semibold leading-relaxed text-ink">
        {copy.notice}
      </p>
      <div aria-live="polite" className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{position}</p>
        <article className="cme-card mt-3 border border-white/15 bg-white p-6 text-ink" aria-roledescription="slide">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6B4F00]">{slide.kicker}</p>
          <blockquote className="mt-3 text-xl font-semibold leading-snug text-navy">
            <p>{slide.quote}</p>
          </blockquote>
          <p className="mt-4 text-sm text-ink">{slide.attribution}</p>
        </article>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center border-2 border-gold bg-gold px-4 text-sm font-semibold text-ink hover:bg-gold-deep"
          onClick={() => go(index - 1)}
        >
          {copy.prev}
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center border-2 border-white px-4 text-sm font-semibold text-white hover:bg-white hover:text-navy"
          onClick={() => go(index + 1)}
        >
          {copy.next}
        </button>
      </div>
    </div>
  );
}
