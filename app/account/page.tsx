"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";

type Tenant = {
  id: string;
  name?: string;
  role?: string;
};

const actions = [
  { title: "Rider", body: "Follow the WE 125 and get on the rider list.", href: "/interest?lane=rider" },
  { title: "Fleet", body: "Talk rentals, fleet use and connected operations.", href: "/interest?lane=fleet" },
  { title: "Supplier", body: "Bring parts, fabrication or production capability.", href: "/interest?lane=supplier" },
  { title: "Site partner", body: "Submit a building, land or incentive package.", href: "/site" },
] as const;

export default function AccountPage() {
  const router = useRouter();
  const { ready, user, logout, authFetch } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
      return;
    }
    if (!user) return;

    authFetch("/api/operators/mine")
      .then(async (response) => (response.ok ? response.json() : { tenants: [] }))
      .then((data) => setTenants(Array.isArray(data.tenants) ? data.tenants : []))
      .catch(() => setTenants([]));
  }, [ready, user, router, authFetch]);

  if (!ready || !user) {
    return <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 text-muted sm:px-6">Loading your WE account…</main>;
  }

  return (
    <main className="mx-auto min-h-[calc(100dvh-9rem)] max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">My WE</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">What are you here to do?</h1>
          <p className="mt-4 text-sm text-muted">{user.email || "Signed in"}</p>
        </div>
        <button
          onClick={async () => {
            await logout();
            router.replace("/");
          }}
          className="w-fit rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted transition hover:text-fg"
        >
          Sign out
        </button>
      </div>

      <section className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border mt-10 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group bg-bg p-7 no-underline transition hover:bg-elevated sm:p-9"
          >
            <span className="text-kicker font-semibold tracking-[0.18em] text-orange uppercase">{action.title}</span>
            <p className="mt-4 max-w-sm text-xl font-semibold leading-snug text-fg">{action.body}</p>
            <span className="mt-8 block text-sm text-muted transition group-hover:translate-x-1 group-hover:text-fg">Continue →</span>
          </Link>
        ))}
      </section>

      {tenants.length ? (
        <section className="mt-12">
          <p className="text-kicker font-semibold tracking-[0.18em] text-muted uppercase">Operator access</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="rounded-2xl border border-border bg-surface p-5">
                <p className="font-semibold">{tenant.name || "WE operator"}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{tenant.role || "viewer"}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
