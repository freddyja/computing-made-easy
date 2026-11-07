import type { ReactNode } from "react";

export function PageIntro({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="on-blue border-b border-white/15 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-base font-semibold text-gold">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lede}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </header>
  );
}
