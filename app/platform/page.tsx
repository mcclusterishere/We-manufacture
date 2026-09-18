import type { Metadata } from "next";
import { Destinations } from "@/components/destinations";
import { shots, specs, renderNote } from "@/lib/site";

export const metadata: Metadata = { title: "The 125" };

const layers = [
  {
    title: "Find it",
    items: ["Where it is", "If it moved when it should not", "A fence around a block or a city"],
  },
  {
    title: "Run it",
    items: ["On the lot or on the road", "Tied to an account", "A pack of them, run as one"],
  },
  {
    title: "Keep it alive",
    items: ["Is the radio up", "Is a service due", "Swap the module. Do not junk the bike."],
  },
];

export default function PlatformPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="media-frame h-[58vh] min-h-80">
          <img src={shots.urban} alt="WE 125 in the city at dusk" className="size-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/30" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">The bike</p>
          <h1 className="mt-2 max-w-3xl font-display text-display font-extrabold leading-[0.9]">The 125</h1>
          <p className="mt-3 max-w-xl text-lg text-fg/80">Honda Grom is the class. WE is our take on it.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Honda Grom is the class. WE is our take on it. Assembled in America. Connected from the harness. Priced under a Grom if we hit the number.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <figure className="media-frame rounded-xl">
            <img src={shots.profile} alt="WE 125 studio profile" className="aspect-[16/10] w-full object-cover" />
          </figure>
          <figure className="media-frame rounded-xl">
            <img src={shots.rear} alt="WE 125 rear studio view" className="aspect-[16/10] w-full object-cover" />
          </figure>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {specs.map((group) => (
            <section key={group.group}>
              <h2 className="font-display text-2xl font-semibold tracking-tight">{group.group}</h2>
              <dl className="mt-4 divide-y divide-border rounded-xl bg-elevated hairline">
                {group.items.map((item) => (
                  <div key={item.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]">
                    <dt className="text-kicker font-semibold tracking-[0.14em] text-muted uppercase">{item.label}</dt>
                    <dd>
                      <p className="font-medium">{item.value}</p>
                      <p className="mt-1 text-sm text-muted">{item.note}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <img src={shots.front} alt="WE 125 front" className="aspect-[4/3] w-full rounded-xl object-cover" />
          <img src={shots.mid} alt="WE 125 tank and mark" className="aspect-[4/3] w-full rounded-xl object-cover" />
          <img src={shots.tail} alt="WE 125 tail" className="aspect-[4/3] w-full rounded-xl object-cover" />
        </div>
        <p className="mt-4 text-kicker font-semibold tracking-[0.16em] text-muted uppercase">{renderNote}</p>

        <h2 className="mt-16 font-display text-section font-bold">Find it. Run it. Keep it alive.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {layers.map((layer) => (
            <article key={layer.title} className="border-t border-orange/50 pt-6">
              <h3 className="font-display text-3xl font-semibold">{layer.title}</h3>
              <ul className="mt-5 grid gap-2 text-sm text-muted">
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <Destinations current="/platform" />
    </main>
  );
}
