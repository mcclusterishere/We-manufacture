"use client";

import { FormEvent, useState } from "react";

type FormStatus = { type: "idle" | "success" | "error"; message: string };

const Field = ({ label, name, required = false, type = "text", placeholder = "" }: { label: string; name: string; required?: boolean; type?: string; placeholder?: string }) => (
  <div className="field">
    <label htmlFor={name}>{label}{required ? " *" : ""}</label>
    <input id={name} name={name} type={type} required={required} placeholder={placeholder} />
  </div>
);

const Area = ({ label, name, placeholder = "" }: { label: string; name: string; placeholder?: string }) => (
  <div className="field fieldFull">
    <label htmlFor={name}>{label}</label>
    <textarea id={name} name={name} placeholder={placeholder} />
  </div>
);

export default function SiteSubmissionForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/site-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed.");

      form.reset();
      setStatus({
        type: "success",
        message: "Received. WE will review the site and incentive package for the Phase 1 shortlist.",
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
    <form className="formCard" onSubmit={onSubmit}>
      <div className="formGrid">
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="formSection">
          <h3>Community contact</h3>
          <p>Economic-development authority, municipality, property owner, utility, or authorized project partner.</p>
        </div>
        <Field label="Organization" name="organization_name" required />
        <Field label="Municipality / region" name="municipality" required />
        <Field label="State" name="state" required placeholder="CT, GA, etc." />
        <Field label="Contact name" name="contact_name" required />
        <Field label="Title" name="title" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" />

        <div className="formSection">
          <h3>Proposed facility</h3>
          <p>Existing industrial space is preferred. WE is not prioritizing ground-up construction for Phase 1.</p>
        </div>
        <Field label="Building address" name="building_address" />
        <Field label="Building owner / controlling entity" name="building_owner" />
        <Field label="Approx. square feet" name="building_sqft" type="number" placeholder="10000–20000 preferred" />
        <Field label="Asking rent / occupancy economics" name="asking_rent" />
        <Field label="Earliest occupancy" name="earliest_occupancy" />
        <Field label="Zoning / permitted use" name="zoning" />
        <Field label="Available electrical capacity" name="power_capacity" />
        <Field label="Loading / shipping access" name="loading_access" />

        <div className="formSection">
          <h3>Incentive package</h3>
          <p>Please be specific. We compare cash impact, timing, restrictions, guarantees, and clawbacks—not brochure language.</p>
        </div>
        <Area label="Municipal / authority support" name="local_incentives" placeholder="Rent support, acquisition, site work, grants, PILOT, local loans, redevelopment assistance…" />
        <Area label="State programs that can stack" name="state_incentives" placeholder="Program name, realistic amount/range, match and timing if known." />
        <Area label="Equipment / tooling support" name="equipment_support" />
        <Area label="Workforce / training support" name="workforce_support" />
        <Area label="Utility / energy support" name="utility_support" />
        <Area label="Property-tax abatement / PILOT" name="tax_relief" />

        <div className="formSection">
          <h3>Conditions</h3>
          <p>These fields are especially important to our comparison.</p>
        </div>
        <Area label="Required jobs / job-creation schedule" name="job_requirements" />
        <Area label="Required wages / benefit standards" name="wage_requirements" />
        <Area label="Company match / minimum capex" name="match_requirements" />
        <Area label="Personal or corporate guarantees" name="guarantee_requirements" />
        <Area label="Clawbacks / repayment triggers" name="clawbacks" />
        <Area label="Anything else WE should know" name="notes" />
      </div>

      <button className="submit" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit site + incentive package"}
      </button>
      <div className={`formStatus ${status.type === "idle" ? "" : status.type}`} role="status">
        {status.message}
      </div>
    </form>
  );
}
