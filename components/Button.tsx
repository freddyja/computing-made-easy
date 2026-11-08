import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "light" | "lightGhost";

const variants: Record<Variant, string> = {
  solid:
    "btn-gold rounded-lg border-2 border-navy bg-gold text-ink hover:bg-gold-deep active:bg-gold active:shadow-[inset_0_0_0_2px_#003B71]",
  ghost:
    "rounded-lg border-2 border-navy bg-white text-navy hover:bg-paper active:shadow-[inset_0_0_0_2px_#003B71]",
  light:
    "rounded-lg border-2 border-navy bg-white text-ink hover:bg-paper active:shadow-[inset_0_0_0_2px_#003B71]",
  lightGhost:
    "rounded-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-navy active:bg-white active:text-navy active:shadow-[inset_0_0_0_2px_#003B71]",
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
  const classes = `inline-flex min-h-11 items-center justify-center px-5 text-base font-semibold tracking-tight transition-colors duration-150 ${variants[variant]} ${className}`;
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
