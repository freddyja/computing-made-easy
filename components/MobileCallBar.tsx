import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";

export function MobileCallBar({ d }: { d: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy md:hidden">
      <a
        href={`tel:${site.phoneTel}`}
        className="flex min-h-12 items-center justify-center px-4 text-sm font-semibold text-white"
      >
        {d.callBar}
      </a>
    </div>
  );
}
