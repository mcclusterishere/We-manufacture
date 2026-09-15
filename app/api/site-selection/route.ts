import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fxbkvcrfbbcmrrupdcjt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_eRkFl2Y-f7sHoFcDmnYxcw_vn4LHZJf";

function text(value: unknown, max = 4000) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function int(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const required = [
      body.organization_name,
      body.municipality,
      body.state,
      body.contact_name,
      body.email,
    ];

    if (required.some((value) => typeof value !== "string" || !value.trim())) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const email = text(body.email, 320);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const payload = {
      organization_name: text(body.organization_name, 200),
      municipality: text(body.municipality, 120),
      state: text(body.state, 80),
      contact_name: text(body.contact_name, 160),
      title: text(body.title, 160),
      email,
      phone: text(body.phone, 80),
      building_address: text(body.building_address, 500),
      building_owner: text(body.building_owner, 300),
      building_sqft: int(body.building_sqft),
      asking_rent: text(body.asking_rent, 1000),
      earliest_occupancy: text(body.earliest_occupancy, 300),
      zoning: text(body.zoning, 600),
      power_capacity: text(body.power_capacity, 600),
      loading_access: text(body.loading_access, 600),
      local_incentives: text(body.local_incentives),
      state_incentives: text(body.state_incentives),
      equipment_support: text(body.equipment_support),
      workforce_support: text(body.workforce_support),
      utility_support: text(body.utility_support),
      tax_relief: text(body.tax_relief),
      job_requirements: text(body.job_requirements),
      wage_requirements: text(body.wage_requirements),
      match_requirements: text(body.match_requirements),
      guarantee_requirements: text(body.guarantee_requirements),
      clawbacks: text(body.clawbacks),
      notes: text(body.notes, 8000),
      source: "we-manufacture-web",
      status: "new",
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/we_site_submissions`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("WE site submission failed", response.status, detail);
      return NextResponse.json(
        { error: "The site package could not be recorded. Please try again or email Matthew directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("WE site selection endpoint error", error);
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
}
