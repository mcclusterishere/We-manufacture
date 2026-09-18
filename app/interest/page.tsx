import type { Metadata } from "next";
import { Destinations } from "@/components/destinations";
import { InquiryForm } from "@/components/inquiry-form";
import { shots } from "@/lib/site";

export const metadata: Metadata = { title: "The list" };

export default function InterestPage() {
  return (
    <main className="relative overflow-hidden">
      <img
        src={shots.front}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-25 lg:block"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">The list</p>
          <h1 className="mt-3 font-display text-display font-extrabold leading-[0.9]">Tell us who you are.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Rider, fleet, shop, supplier, town, club. Pick a lane and write something real. This is not an order form.
          </p>
          <div className="mt-10">
            <InquiryForm />
          </div>
        </div>
        <aside className="lg:pt-28">
          <div className="rounded-xl bg-elevated p-7 hairline">
            <p className="text-kicker font-semibold tracking-[0.16em] text-muted uppercase">What happens</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">It lands on our desk.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Matthew reads it. You hear back from us. No deposit. No fake inventory. No second copy sitting on this page.
            </p>
          </div>
        </aside>
      </div>
      <Destinations current="/interest" />
    </main>
  );
}
