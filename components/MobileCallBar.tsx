import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";

export function MobileCallBar({ d }: { d: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy bg-gold md:hidden">
      <a
        href={`tel:${site.phoneTel}`}
        className="flex min-h-12 items-center justify-center px-4 text-sm font-semibold text-navy hover:bg-gold-deep active:bg-gold-deep"
      >
        {d.callBar}
      </a>
    </div>
  );
}
