import Link from "next/link";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/site";

type Props = {
  compact?: boolean;
  className?: string;
};

export function WeLockup({ compact = false, className }: Props) {
  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center gap-3 text-fg no-underline", className)}
      aria-label="WE Manufacture home"
      data-cursor="Home"
    >
      <img
        src={asset("/brand/we-icon.png")}
        alt=""
        className="size-9 shrink-0 outline-none sm:size-10"
      />
      <span className="grid min-w-0 leading-none">
        <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">WE</span>
        {!compact ? (
          <span className="mt-1 truncate text-micro font-semibold tracking-[0.18em] text-muted uppercase">
            Manufacture
          </span>
        ) : null}
      </span>
    </Link>
  );
}
