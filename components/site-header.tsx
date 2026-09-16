"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WeLockup } from "@/components/we-lockup";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return (
    <header
      className={cn(
        "z-40",
        overlay
          ? "absolute inset-x-0 top-0"
          : "sticky top-0 border-b border-border bg-bg/80 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <WeLockup />
        <Button asChild size="sm">
          <Link href="/interest" data-cursor="Join">
            Get on the list
          </Link>
        </Button>
      </div>
    </header>
  );
}
