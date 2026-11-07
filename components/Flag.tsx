import { useId } from "react";
import { FLAG_COLORS, FLAG_VIEW, flagModel, starPoints } from "@/lib/flag";

export function Flag({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const titleId = useId();
  const model = flagModel();
  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      viewBox={`0 0 ${FLAG_VIEW.width} ${FLAG_VIEW.height}`}
      className={`block h-auto w-full ${className}`}
    >
      <title id={titleId}>{title}</title>
      {model.stripes.map((stripe) => (
        <rect
          key={stripe.y}
          x="0"
          y={stripe.y}
          width={FLAG_VIEW.width}
          height={stripe.height + 0.2}
          fill={stripe.color}
        />
      ))}
      <rect
        x={model.canton.x}
        y={model.canton.y}
        width={model.canton.width}
        height={model.canton.height}
        fill={FLAG_COLORS.blue}
      />
      {model.stars.map((star) => (
        <polygon
          key={`${star.cx}-${star.cy}`}
          points={starPoints(star.cx, star.cy, model.outerRadius)}
          fill={FLAG_COLORS.white}
        />
      ))}
    </svg>
  );
}
