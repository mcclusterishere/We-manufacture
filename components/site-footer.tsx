import Link from "next/link";
import { brand, claims, nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{brand.name}</p>
          <p className="mt-1 text-sm text-muted">
            {brand.parent}. {brand.hq}. {brand.assembly}
          </p>
          <a href={`mailto:${brand.email}`} className="mt-4 block text-sm text-orange no-underline">
            {brand.email}
          </a>
        </div>
        <nav aria-label="Footer" className="grid gap-3 content-start sm:justify-items-end">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="text-sm font-semibold tracking-[0.14em] text-fg uppercase no-underline"
            >
              {item.label}
              <span className="ml-3 font-sans font-medium tracking-normal text-muted normal-case">
                {item.line}
              </span>
            </Link>
          ))}
          <Link href="/site" className="text-sm font-semibold tracking-[0.14em] text-orange uppercase no-underline">
            Submit a site
            <span className="ml-3 font-sans font-medium tracking-normal text-muted normal-case">
              The floor
            </span>
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-kicker leading-relaxed text-muted sm:px-6">
          {claims.join(" ")} {new Date().getFullYear()} {brand.parent}.
        </p>
      </div>
    </footer>
  );
}
