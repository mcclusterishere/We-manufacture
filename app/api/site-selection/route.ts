import { NextResponse } from "next/server";
import { postInquiry } from "@/lib/plane";

function text(value: unknown, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function line(label: string, value: string) {
  return value ? `${label}: ${value}` : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });

    const organization = text(body.organization_name, 200);
    const municipality = text(body.municipality, 120);
    const state = text(body.state, 80);
    const contact = text(body.contact_name, 160);
    const email = text(body.email, 320);

    if (!organization || !municipality || !state || !contact || !email) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const note = [
      line("Organization", organization),
      line("Municipality", municipality),
      line("State", state),
      line("Contact", contact),
      line("Title", text(body.title, 160)),
      line("Phone", text(body.phone, 80)),
      "",
      "Facility",
      line("Address", text(body.building_address, 500)),
      line("Owner", text(body.building_owner, 300)),
      line("Sq ft", text(String(body.building_sqft ?? ""), 40)),
      line("Rent / occupancy", text(body.asking_rent, 1000)),
      line("Earliest occupancy", text(body.earliest_occupancy, 300)),
      line("Zoning", text(body.zoning, 600)),
      line("Power", text(body.power_capacity, 600)),
      line("Loading", text(body.loading_access, 600)),
      "",
      "Incentives",
      line("Local", text(body.local_incentives)),
      line("State", text(body.state_incentives)),
      line("Equipment", text(body.equipment_support)),
      line("Workforce", text(body.workforce_support)),
      line("Utility", text(body.utility_support)),
      line("Tax / PILOT", text(body.tax_relief)),
      "",
      "Conditions",
      line("Jobs", text(body.job_requirements)),
      line("Wages", text(body.wage_requirements)),
      line("Match / capex", text(body.match_requirements)),
      line("Guarantees", text(body.guarantee_requirements)),
      line("Clawbacks", text(body.clawbacks)),
      line("Notes", text(body.notes, 8000)),
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid submission.";
    return NextResponse.json(
      { error: message || "The site package could not be recorded. Please try again or email Matthew directly." },
      { status: 502 },
    );
  }
}
