"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export function AccountButton() {
  const { ready, user } = useAuth();

  if (!ready) {
    return <span className="h-9 w-20 animate-pulse rounded-full bg-white/8" aria-hidden />;
  }

  return (
    <Link
      href={user ? "/account" : "/login"}
      className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-fg no-underline transition hover:bg-white/[0.09]"
    >
      {user ? "My WE" : "Sign in"}
    </Link>
  );
}
