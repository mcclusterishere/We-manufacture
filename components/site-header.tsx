"use client";

import { usePathname } from "next/navigation";
import { AccountButton } from "@/components/account-button";
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
          : "sticky top-0 border-b border-border bg-bg/85 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <WeLockup compact />
        <AccountButton />
      </div>
    </header>
  );
}
