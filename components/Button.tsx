import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "light" | "lightGhost";

const variants: Record<Variant, string> = {
  solid:
    "bg-gold text-navy hover:bg-gold-deep active:bg-gold-deep focus-visible:outline-navy",
  ghost:
    "border-2 border-gold bg-white text-navy hover:bg-gold active:bg-gold-deep",
  light: "bg-white text-navy hover:bg-gold active:bg-gold-deep",
  lightGhost:
    "border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-navy active:bg-gold-deep active:text-navy",
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
