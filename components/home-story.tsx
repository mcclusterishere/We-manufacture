import Link from "next/link";
import { principles, renderNote, shots, stack, stats, ticker } from "@/lib/site";

const loop = [...ticker, ...ticker];

export function HomeStory() {
  return (
    <>
      <Ticker />
      <Stats />
      <BikeIntro />
      <Principles />
      <Stack />
    </>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border bg-ink" aria-hidden>
      <div className="ticker-track py-3.5 pr-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-kicker font-semibold tracking-[0.22em] text-muted uppercase"
          >
            {item}
            <span className="size-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.kicker}
            className="border-b border-border px-4 py-8 last:border-b-0 sm:px-6 sm:py-10 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <p className="text-kicker font-semibold tracking-[0.18em] text-orange uppercase">
              {stat.kicker}
            </p>
            <p className="mt-3 font-display text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{stat.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BikeIntro() {
  return (
    <section className="bg-paper text-paper-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-kicker font-semibold tracking-[0.2em] text-coral uppercase">
          Whip Equipped
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-display font-bold leading-[0.92]">
          A 125 you throw a leg over.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper-ink/70">
          Honda Grom is the class. WE is our take on it. Assembled in America. Connected from the harness. Priced under a Grom if we hit the number.
        </p>
        <figure className="mt-12">
          <img
            src={shots.cutout}
            alt="WE 125 side profile"
            className="mx-auto max-h-[min(28rem,70vw)] w-auto object-contain"
          />
          <figcaption className="mt-4 text-center text-kicker font-semibold tracking-[0.16em] text-paper-ink/45 uppercase">
            {renderNote}
          </figcaption>
        </figure>
        <Link
          href="/platform"
          data-cursor="View"
          className="mt-10 inline-flex min-h-12 items-center gap-2 text-sm font-semibold tracking-[0.14em] text-paper-ink uppercase no-underline"
        >
          See the bike
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">How we build</p>
      <h2 className="mt-3 max-w-2xl font-display text-section font-bold">Four rules. No theater.</h2>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {principles.map((item) => (
          <article key={item.num} className="border-t border-orange/50 pt-6">
            <p className="font-display text-sm font-bold tracking-[0.16em] text-orange">{item.num}</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="border-y border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((item, index) => (
          <article key={item.title} className="bg-ink px-4 py-10 sm:px-6">
            <p className="font-display text-sm font-bold tabular-nums text-orange">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
