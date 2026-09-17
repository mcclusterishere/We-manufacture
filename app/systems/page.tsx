import type { Metadata } from "next";
import Link from "next/link";
import { Destinations } from "@/components/destinations";
import { Button } from "@/components/ui/button";
import { shots, stack, systemLayers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Whip Equipped systems: connected vehicle electronics, fleet intelligence, secure communications, human-autonomy research, and manufacturing architecture.",
};

export default function SystemsPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="media-frame h-[62vh] min-h-[28rem]">
          <img
            src={shots.profile}
            alt="Whip Equipped vehicle platform"
            className="size-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="text-kicker font-semibold tracking-[0.18em] text-orange uppercase">
            Vehicle + intelligence + autonomy
          </p>
          <h1 className="mt-3 max-w-5xl font-display text-display font-extrabold leading-[0.9]">
            The motorcycle is the ground node.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Whip Equipped is being built as a connected mobility platform, not a motorcycle with apps bolted onto it.
            The vehicle, edge electronics, secure communications, fleet software, sensing, and future cooperating autonomous
            systems are designed as one architecture.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <article key={item.title} className="bg-bg p-7">
              <p className="text-kicker font-semibold tracking-[0.16em] text-orange uppercase">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-kicker font-semibold tracking-[0.18em] text-orange uppercase">Architecture</p>
            <h2 className="mt-3 font-display text-section font-bold">One platform. Multiple work packages.</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              Commercial motorcycle development remains the base. Research and government programs can fund distinct technical
              work in human-autonomy teaming, resilient communications, sensing, navigation, cybersecurity, energy, fleet
              operations, inspection, emergency response, and advanced manufacturing without treating those efforts as duplicate work.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {systemLayers.map((layer, index) => (
              <article key={layer.title} className="rounded-xl bg-elevated p-6 hairline">
                <span className="font-display text-sm font-bold text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{layer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="mt-16 rounded-xl bg-paper p-8 text-paper-ink sm:p-12">
          <p className="text-kicker font-semibold tracking-[0.18em] uppercase">Current status</p>
          <h2 className="mt-3 font-display text-section font-bold">Build the vehicle. Prove the systems. Scale what earns its place.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper-ink/65">
            The WE 125 is not yet in production and the advanced systems are research and development programs. The site separates
            what exists, what is being prototyped, and what remains a technical objective.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/platform">See the vehicle</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/interest?lane=fleet">Talk fleet or technology</Link>
            </Button>
          </div>
        </section>
      </section>

      <Destinations current="/systems" />
    </main>
  );
}
