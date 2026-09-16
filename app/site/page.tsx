import type { Metadata } from "next";
import SiteSubmissionForm from "@/components/SiteSubmissionForm";

export const metadata: Metadata = { title: "Submit a site" };

const needs = [
  "An existing 10,000–20,000 sq. ft. industrial/manufacturing building",
  "Fast occupancy and practical zoning for light vehicle assembly",
  "Receiving, loading, parts storage, assembly, QC/testing and shipping capability",
  "Competitive Year 1–5 occupancy economics",
  "Equipment, tooling, site-work or infrastructure assistance where available",
  "Workforce recruiting, customized training and OJT support",
  "Utility/energy support and sufficient electrical capacity",
  "Transparent tax relief, PILOT or enterprise-zone benefits",
];

export default function SitePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-kicker font-semibold tracking-[0.2em] text-orange uppercase">Municipal + site RFI</p>
        <h1 className="mt-3 max-w-3xl font-display text-display font-extrabold leading-[0.9]">
          Put your community in the room.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          If you represent a municipality, development authority, regional EDO, utility, property owner or other authorized project partner, submit the strongest realistic Phase 1 package your location can support.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Specific answers beat generic incentive summaries. The package lands on the McCluster desk. It does not create a commitment by either party.
        </p>

        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {needs.map((item) => (
            <li key={item} className="rounded-lg bg-elevated px-4 py-3 text-sm text-muted hairline">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <SiteSubmissionForm />
        </div>
      </section>
    </main>
  );
}
