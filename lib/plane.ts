export const MCCLUSTER_API = process.env.MCCLUSTER_API_URL || "https://api.mccluster.org";
export const WE_ORG = process.env.WE_ORG_SLUG || "we-manufacture";

export type InquiryPayload = {
  name: string;
  email: string;
  want: string;
  note: string;
  page?: string;
  source?: string;
};

export async function postInquiry(input: InquiryPayload) {
  const response = await fetch(`${MCCLUSTER_API}/v1/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      org: WE_ORG,
      name: input.name,
      email: input.email,
      want: input.want,
      note: input.note,
      page: input.page || "",
      source: input.source || "we-manufacture-web",
    }),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof result.error === "string"
        ? result.error
        : "The desk did not take this. Try again or email Matthew directly.";
    throw Object.assign(new Error(message), { status: response.status });
  }
  return result as { ok?: boolean; received?: boolean; inquiry?: { id?: string } | null };
}
