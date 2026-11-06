import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "light" | "lightGhost";

const variants: Record<Variant, string> = {
  solid: "bg-navy text-white hover:bg-navy-2",
  ghost: "border border-navy/20 bg-white text-navy hover:border-navy",
  light: "bg-white text-navy hover:bg-paper",
  lightGhost: "border border-white/40 text-white hover:bg-white/10",
};

type Props = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
};

export function Button({
  children,
  className = "",
  variant = "solid",
  href,
  external,
  type = "button",
}: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center px-5 text-sm font-semibold tracking-tight transition-colors ${variants[variant]} ${className}`;
  if (href) {
    const offsite =
      external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (offsite && !href.startsWith("tel:") && !href.startsWith("mailto:") && !href.startsWith("/")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    if (href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes}>
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
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
