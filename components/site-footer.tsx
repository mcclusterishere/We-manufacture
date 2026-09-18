import Link from "next/link";
import { brand, claims } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl font-bold tracking-tight">{brand.name}</p>
          <a href={`mailto:${brand.email}`} className="mt-1 block text-sm text-orange no-underline">
            {brand.email}
          </a>
        </div>
        <p className="max-w-xl text-kicker leading-relaxed text-muted">
          {claims.slice(0, 4).join(" ")} {new Date().getFullYear()} {brand.parent}.{" "}
          <Link href="/site" className="text-orange no-underline">
            Submit a site
          </Link>
        </p>
      </div>
    </footer>
  );
}
