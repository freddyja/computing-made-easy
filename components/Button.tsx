import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white hover:bg-blue-600 shadow-sm shadow-electric/25",
  secondary:
    "bg-white text-navy border border-navy/20 hover:border-navy/40 hover:bg-surface",
  outline:
    "bg-white text-electric border border-electric hover:bg-electric-soft",
  ghost: "bg-transparent text-electric hover:bg-electric-soft",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type AsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = Common & { href: string; external?: boolean };

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: AsButton | AsLink) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 disabled:opacity-60";

  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as AsLink & {
      external?: boolean;
    };
    if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(rest as object)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { ...btnProps } = props as AsButton;
  return (
    <button type="button" className={classes} {...btnProps}>
      {children}
    </button>
  );
}
