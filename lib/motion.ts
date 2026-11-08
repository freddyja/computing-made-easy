/** Reveal runs only when motion is allowed and the browser can observe visibility. */
export function motionEnabled(reducedMotion: boolean, hasObserver: boolean): boolean {
  return !reducedMotion && hasObserver;
}

/** Count-up display. The final published string is the resting value. */
export function countText(finalText: string, target: string, current: string): string {
  return finalText.replace(target, current);
}

export const motionTiming = {
  hoverMs: 240,
  revealMs: 520,
  countMs: 900,
  hoverLiftPx: 4,
  revealOffsetPx: 12,
} as const;
