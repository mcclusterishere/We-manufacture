import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Destinations } from "@/components/destinations";
import { PhaseTabs } from "@/components/phase-tabs";
import { claims, phases, renderNote, shots } from "@/lib/site";

export const metadata: Metadata = { title: "Build" };

const points = [
  {
    title: "A line. Not a foundry.",
    body: "Receive, assemble, check, ship. We do not need a machine shop to start.",
  },
  {
    title: "Georgia is in front.",
    body: "Conversations are open. Nothing has been awarded. No land. No building. No grant.",
  },
  {
    title: "Connecticut keeps the brains.",
    body: "Product, software, and the company sit here even if the wrenches start in Georgia.",
  },
  {
    title: "American parts where they earn it.",
    body: "Files before purchase orders. Nobody is a launch partner until there is a package to quote.",
  },
];

export default function BuildPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="media-frame h-[52vh] min-h-80">
          <img src={shots.fleet} alt="WE 125 fleet lineup" className="size-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/40" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h1 className="max-w-3xl font-display text-display font-extrabold leading-[0.9]">Build</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          A line in America. We have not started it. Five hundred the first year. A thousand the second. Those are counts for the work. Not orders.
        </p>

        <figure className="media-frame mt-10 rounded-xl">
          <img src={shots.rider} alt="WE 125 with rider" className="aspect-[21/9] w-full object-cover" />
          <figcaption className="px-4 py-3 text-kicker font-semibold tracking-[0.16em] text-muted uppercase">
            {renderNote}
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="bg-bg p-7">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{point.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{point.body}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-16 font-display text-section font-bold">Four steps. No theater.</h2>
        <div className="mt-6 max-w-2xl">
          <PhaseTabs />
        </div>
        <ol className="mt-8 grid gap-3">
          {phases.map((phase, index) => (
            <li
              key={phase.id}
              className="grid gap-2 rounded-xl bg-elevated p-6 hairline sm:grid-cols-[72px_1fr_auto] sm:items-center"
            >
              <span className="font-display text-lg font-bold text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-xl font-semibold">{phase.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{phase.copy}</p>
              </div>
              <span className="text-micro font-semibold tracking-[0.16em] text-muted uppercase">{phase.badge}</span>
            </li>
          ))}
        </ol>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">What we will not pretend</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {claims.map((claim) => (
              <li
                key={claim}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted"
              >
                {claim}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl bg-paper p-8 text-paper-ink sm:p-12">
          <h2 className="font-display text-section font-bold">Show us the floor. Skip the brochure.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-ink/65">
            Towns, counties, utilities: send a real package. Building, power, occupancy date. We will not announce land we do not have.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/site">Send a site package</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/interest?lane=gov">A shorter note</Link>
            </Button>
          </div>
        </section>
      </section>
      <Destinations current="/build" />
    </main>
  );
}
