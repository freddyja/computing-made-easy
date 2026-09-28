import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type Props = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

export function FunnelCard({
  href,
  title,
  description,
  icon,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric sm:flex-col sm:items-start ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-electric text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-navy">{title}</span>
          <ArrowRightIcon className="h-4 w-4 text-electric opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100 sm:mt-2 sm:self-start" />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">
          {description}
        </span>
      </span>
    </Link>
  );
}
