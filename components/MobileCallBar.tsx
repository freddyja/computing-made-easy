import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <a
        href={`tel:${site.phoneTel}`}
        className="flex items-center justify-center gap-2 bg-electric px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-electric/30 transition hover:bg-blue-600"
        aria-label={`Call now ${site.phone}`}
      >
        <PhoneIcon className="h-5 w-5" />
        Call now
      </a>
    </div>
  );
}
