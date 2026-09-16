import { NextResponse } from "next/server";
import { postInquiry } from "@/lib/plane";

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });

    const name = text(body.name, 160);
    const email = text(body.email, 320);
    const want = text(body.want, 200) || "WE 125 inquiry";
    const note = text(body.note, 4000);
    if (!name || !email || !note) {
      return NextResponse.json({ error: "Name, email, and a note. That is the whole form." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const result = await postInquiry({
      name,
      email,
      want,
      note,
      page: text(body.page, 500) || "/interest",
      source: text(body.source, 100) || "we-manufacture-web",
    });

    return NextResponse.json({
      ok: true,
      id: result.inquiry?.id || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid submission.";
    const status = typeof (error as { status?: number }).status === "number" ? (error as { status: number }).status : 502;
    return NextResponse.json({ error: message }, { status: status >= 400 && status < 600 ? status : 502 });
  }
}
