"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WeLockup } from "@/components/we-lockup";

function pathOf(value: string) {
  if (value === "/") return "/";
  return value.replace(/\/+$/, "") || "/";
}

export function SiteHeader() {
  const pathname = pathOf(usePathname() || "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <WeLockup />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              data-cursor="View"
              aria-current={pathname === item.to ? "page" : undefined}
              className={cn(
                "text-kicker font-semibold tracking-[0.16em] uppercase no-underline transition-colors duration-200",
                pathname === item.to ? "text-orange" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/interest" data-cursor="Join">
              Get on the list
            </Link>
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-fg/8 hairline lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="absolute inset-x-0 top-full isolate border-b border-border bg-bg px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-lg px-3 no-underline",
                  pathname === item.to ? "bg-elevated text-orange" : "text-fg",
                )}
              >
                <span className="font-display text-lg font-semibold">{item.label}</span>
                <span className="text-kicker tracking-[0.16em] text-muted uppercase">{item.line}</span>
              </Link>
            ))}
          </nav>
          <Button asChild size="lg" className="mt-4 w-full sm:hidden">
            <Link href="/interest" onClick={() => setOpen(false)} data-cursor="Join">
              Get on the list
            </Link>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
