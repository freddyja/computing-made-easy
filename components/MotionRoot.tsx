"use client";

import { useEffect } from "react";

function inView(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

/** Adds the reveal class only when motion and IntersectionObserver are available. */
export function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".cme-reveal"));
    for (const node of nodes) {
      if (inView(node)) node.classList.add("is-shown");
    }
    document.documentElement.classList.add("cme-motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    for (const node of nodes) {
      if (!node.classList.contains("is-shown")) observer.observe(node);
    }
    return () => {
      document.documentElement.classList.remove("cme-motion");
      observer.disconnect();
    };
  }, []);
  return null;
}
