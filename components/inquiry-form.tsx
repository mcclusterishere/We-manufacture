"use client";

import { useMemo, useState, type FormEvent } from "react";
import { brand, laneById, lanes, type LaneId } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = { defaultLane?: LaneId };

export function InquiryForm({ defaultLane = "rider" }: Props) {
  const [lane, setLane] = useState<LaneId>(defaultLane);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const selected = useMemo(() => laneById(lane), [lane]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Name, email, and a note. That is the whole form.");
      return;
    }
    if (!email.includes("@")) {
      setError("Use a real email so we can reply.");
      return;
    }
    setBusy(true);
    try {
      const form = event.currentTarget;
      const trap = form.querySelector<HTMLInputElement>("#website");
      const note = [
        org.trim() ? `Organization: ${org.trim()}` : null,
        city.trim() ? `City / region: ${city.trim()}` : null,
        `Lane: ${selected.label}`,
        "",
        message.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n");

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          want: selected.subject,
          note,
          page: "/interest",
          source: `we-manufacture-${lane}`,
          website: trap?.value || "",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The desk did not take this.");
      setSaved(typeof result.id === "string" ? result.id : "received");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not file this. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (saved) {
    return (
      <div className="rounded-xl bg-elevated p-7 hairline">
        <div className="flex size-11 items-center justify-center rounded-full brand-gradient text-ink">
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
            <path fill="none" stroke="currentColor" strokeWidth="2.4" d="M5 12.5 9.5 17 19 7" />
          </svg>
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">You are on the list.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          It landed on the McCluster desk. Matthew will see it there. Not an order. Not a deposit.
        </p>
        <Button variant="ghost" type="button" className="mt-5" onClick={() => setSaved(null)}>
          File another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset>
        <legend className="text-kicker font-semibold tracking-[0.16em] text-muted uppercase">
          Who you are
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {lanes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLane(item.id)}
              className={cn(
                "min-h-12 rounded-full px-3 py-2 text-left text-sm font-medium transition-colors duration-200",
                lane === item.id ? "brand-gradient text-ink" : "bg-elevated text-fg hairline",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">{selected.blurb}</p>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="org">Organization</Label>
          <Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City or region</Label>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">What is real</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How many. When. What you make. Where you ride. The building."
        />
      </div>

      {error ? <p className="text-sm text-coral">{error}</p> : null}

      <Button type="submit" size="lg" disabled={busy}>
        {busy ? "Filing…" : "Get on the list"}
      </Button>
      <p className="text-kicker leading-relaxed text-muted">
        Goes to the McCluster desk, then to {brand.email}. No deposits. No orders. No fake inventory.
      </p>
    </form>
  );
}
