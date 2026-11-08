"use client";

import { useEffect, useRef, useState } from "react";
import { countText, motionTiming } from "@/lib/motion";

export function CountUp({
  finalText,
  target,
  from,
}: {
  finalText: string;
  target: string;
  from: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(finalText);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;
    const targetNumber = Number(target);
    const fromNumber = Number(from);
    if (!Number.isFinite(targetNumber) || !Number.isFinite(fromNumber)) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / motionTiming.countMs);
          const eased = 1 - (1 - progress) ** 3;
          const value = Math.round(fromNumber + (targetNumber - fromNumber) * eased);
          setText(countText(finalText, target, String(value)));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setText(finalText);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [finalText, from, target]);

  return (
    <span ref={ref} data-count-final={finalText}>
      {text}
    </span>
  );
}
