/** United States flag geometry. 13 stripes, 50 stars, 1.9:1 fly, official Old Glory colors. */

export const FLAG_COLORS = {
  red: "#B22234",
  white: "#FFFFFF",
  blue: "#3C3B6E",
} as const;

export const FLAG_VIEW = { width: 1900, height: 1000 } as const;

export type FlagStripe = { y: number; height: number; color: string };
export type FlagStar = { cx: number; cy: number };

export type FlagModel = {
  stripes: FlagStripe[];
  canton: { x: number; y: number; width: number; height: number };
  stars: FlagStar[];
  outerRadius: number;
};

export function flagModel(): FlagModel {
  const hoist = FLAG_VIEW.height;
  const stripeH = hoist / 13;
  const stripes: FlagStripe[] = Array.from({ length: 13 }, (_, i) => ({
    y: i * stripeH,
    height: stripeH,
    color: i % 2 === 0 ? FLAG_COLORS.red : FLAG_COLORS.white,
  }));
  // Union fly (D) is 0.76 × hoist, not 0.76 × fly. That is 40% of the 1.9 fly.
  const canton = {
    x: 0,
    y: 0,
    width: 0.76 * hoist,
    height: (7 / 13) * hoist,
  };
  const col = canton.width / 12;
  const row = canton.height / 10;
  const stars: FlagStar[] = [];
  for (let r = 0; r < 9; r += 1) {
    const count = r % 2 === 0 ? 6 : 5;
    const cy = row * (r + 1);
    for (let c = 0; c < count; c += 1) {
      const cx = r % 2 === 0 ? col * (2 * c + 1) : col * (2 * c + 2);
      stars.push({ cx, cy });
    }
  }
  const outerRadius = Math.min(col, row) * 0.4;
  return { stripes, canton, stars, outerRadius };
}

/** Five-point star. Ten vertices, outer points first. */
export function starPoints(cx: number, cy: number, outer: number): string {
  const inner = outer * 0.381966;
  const pts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outer : inner;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}
