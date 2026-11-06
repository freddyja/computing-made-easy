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
    <header className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric-deep">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </header>
  );
}
