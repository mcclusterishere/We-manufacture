"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postInquiry } from "@/lib/plane";

type FormStatus = { type: "idle" | "success" | "error"; message: string };

function Field({
  label,
  name,
  required = false,
  type = "text",
  placeholder = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}

function Area({
  label,
  name,
  placeholder = "",
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2 sm:col-span-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} placeholder={placeholder} />
    </div>
  );
}

function text(value: FormDataEntryValue | null, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function line(label: string, value: string) {
  return value ? `${label}: ${value}` : null;
}

export default function SiteSubmissionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      if (text(data.get("website"), 200)) {
        form.reset();
        setStatus({
          type: "success",
          message: "Received. The package is on the McCluster desk for the Phase 1 shortlist.",
        });
        return;
      }

      const organization = text(data.get("organization_name"), 200);
      const municipality = text(data.get("municipality"), 120);
      const state = text(data.get("state"), 80);
      const contact = text(data.get("contact_name"), 160);
      const email = text(data.get("email"), 320);

      if (!organization || !municipality || !state || !contact || !email) {
        throw new Error("Please complete all required fields.");
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        throw new Error("Please provide a valid email address.");
      }

      const note = [
        line("Organization", organization),
        line("Municipality", municipality),
        line("State", state),
        line("Contact", contact),
        line("Title", text(data.get("title"), 160)),
        line("Phone", text(data.get("phone"), 80)),
        "",
        "Facility",
        line("Address", text(data.get("building_address"), 500)),
        line("Owner", text(data.get("building_owner"), 300)),
        line("Sq ft", text(String(data.get("building_sqft") ?? ""), 40)),
        line("Rent / occupancy", text(data.get("asking_rent"), 1000)),
        line("Earliest occupancy", text(data.get("earliest_occupancy"), 300)),
        line("Zoning", text(data.get("zoning"), 600)),
        line("Power", text(data.get("power_capacity"), 600)),
        line("Loading", text(data.get("loading_access"), 600)),
        "",
        "Incentives",
        line("Local", text(data.get("local_incentives"))),
        line("State", text(data.get("state_incentives"))),
        line("Equipment", text(data.get("equipment_support"))),
        line("Workforce", text(data.get("workforce_support"))),
        line("Utility", text(data.get("utility_support"))),
        line("Tax / PILOT", text(data.get("tax_relief"))),
        "",
        "Conditions",
        line("Jobs", text(data.get("job_requirements"))),
        line("Wages", text(data.get("wage_requirements"))),
        line("Match / capex", text(data.get("match_requirements"))),
        line("Guarantees", text(data.get("guarantee_requirements"))),
        line("Clawbacks", text(data.get("clawbacks"))),
        line("Notes", text(data.get("notes"), 8000)),
      ]
        .filter((item) => item !== null)
        .join("\n")
        .slice(0, 4000);

      await postInquiry({
        name: contact,
        email,
        want: "WE 125 site",
        note,
        page: "/site",
        source: "we-manufacture-site",
      });
      form.reset();
      setStatus({
        type: "success",
        message: "Received. The package is on the McCluster desk for the Phase 1 shortlist.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "We could not submit this package. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="rounded-xl bg-elevated p-6 hairline sm:p-8" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <h3 className="font-display text-xl font-semibold">Community contact</h3>
          <p className="mt-1 text-sm text-muted">
            Economic-development authority, municipality, property owner, utility, or authorized project partner.
          </p>
        </div>
        <Field label="Organization" name="organization_name" required />
        <Field label="Municipality / region" name="municipality" required />
        <Field label="State" name="state" required placeholder="CT, GA, etc." />
        <Field label="Contact name" name="contact_name" required />
        <Field label="Title" name="title" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" />

        <div className="sm:col-span-2 pt-2">
          <h3 className="font-display text-xl font-semibold">Proposed facility</h3>
          <p className="mt-1 text-sm text-muted">
            Existing industrial space is preferred. WE is not prioritizing ground-up construction for Phase 1.
          </p>
        </div>
        <Field label="Building address" name="building_address" />
        <Field label="Building owner / controlling entity" name="building_owner" />
        <Field label="Approx. square feet" name="building_sqft" type="number" placeholder="10000–20000 preferred" />
        <Field label="Asking rent / occupancy economics" name="asking_rent" />
        <Field label="Earliest occupancy" name="earliest_occupancy" />
        <Field label="Zoning / permitted use" name="zoning" />
        <Field label="Available electrical capacity" name="power_capacity" />
        <Field label="Loading / shipping access" name="loading_access" />

        <div className="sm:col-span-2 pt-2">
          <h3 className="font-display text-xl font-semibold">Incentive package</h3>
          <p className="mt-1 text-sm text-muted">
            Be specific. We compare cash impact, timing, restrictions, guarantees, and clawbacks.
          </p>
        </div>
        <Area
          label="Municipal / authority support"
          name="local_incentives"
          placeholder="Rent support, acquisition, site work, grants, PILOT, local loans…"
        />
        <Area
          label="State programs that can stack"
          name="state_incentives"
          placeholder="Program name, realistic amount/range, match and timing if known."
        />
        <Area label="Equipment / tooling support" name="equipment_support" />
        <Area label="Workforce / training support" name="workforce_support" />
        <Area label="Utility / energy support" name="utility_support" />
        <Area label="Property-tax abatement / PILOT" name="tax_relief" />

        <div className="sm:col-span-2 pt-2">
          <h3 className="font-display text-xl font-semibold">Conditions</h3>
          <p className="mt-1 text-sm text-muted">These fields are especially important to our comparison.</p>
        </div>
        <Area label="Required jobs / job-creation schedule" name="job_requirements" />
        <Area label="Required wages / benefit standards" name="wage_requirements" />
        <Area label="Company match / minimum capex" name="match_requirements" />
        <Area label="Personal or corporate guarantees" name="guarantee_requirements" />
        <Area label="Clawbacks / repayment triggers" name="clawbacks" />
        <Area label="Anything else WE should know" name="notes" />
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit site + incentive package"}
      </Button>
      {status.message ? (
        <p className={`mt-3 text-sm ${status.type === "error" ? "text-coral" : "text-muted"}`} role="status">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
