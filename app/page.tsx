import Link from "next/link";
import { shots } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100dvh-1px)] overflow-hidden bg-bg">
      <img
        src={shots.curbside}
        alt="WE 125 motorcycle"
        className="absolute inset-0 size-full object-cover object-[center_58%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/20" />

      <section className="relative mx-auto flex min-h-[calc(100dvh-1px)] max-w-7xl items-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-kicker font-semibold tracking-[0.2em] text-orange uppercase">
            Whip Equipped
          </p>
          <h1 className="font-display text-[clamp(4.5rem,16vw,10rem)] font-extrabold leading-[0.75] tracking-[-0.08em] text-white">
            WE 125
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            One account for the bike, the fleet, and the people building it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black no-underline transition hover:scale-[1.02]"
            >
              Sign in
            </Link>
            <Link
              href="/platform"
              className="rounded-full border border-white/25 bg-black/20 px-6 py-3 text-sm font-semibold text-white no-underline backdrop-blur-md transition hover:bg-white/10"
            >
              See the 125
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/45">Render. Not a built unit.</p>
        </div>
      </section>
    </main>
  );
}
