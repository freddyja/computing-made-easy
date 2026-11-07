import Image from "next/image";
import Link from "next/link";

export function Logo({
  href,
  name,
  sub,
  onBlue = false,
}: {
  href: string;
  name: string;
  sub: string;
  onBlue?: boolean;
}) {
  return (
    <Link href={href} className="flex min-w-0 items-center gap-3 rounded-sm">
      <Image
        src="/brand/mark.png"
        alt=""
        width={512}
        height={512}
        className="h-11 w-11 shrink-0 bg-white object-contain"
      />
      <span className="min-w-0">
        <span
          className={`block truncate text-[15px] font-semibold leading-none tracking-tight ${onBlue ? "text-white" : "text-navy"}`}
        >
          {name}
        </span>
        <span
          className={`mt-1 block truncate font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${onBlue ? "text-gold" : "text-gold-ink"}`}
        >
          {sub}
        </span>
      </span>
    </Link>
  );
}
