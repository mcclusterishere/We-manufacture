"use client";

import { useState } from "react";
import { phases } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PhaseTabs() {
  const [id, setId] = useState<(typeof phases)[number]["id"]>("p0");
  const phase = phases.find((item) => item.id === id) ?? phases[0];

  return (
    <div>
      <div
        className="grid grid-cols-4 gap-1 rounded-xl bg-elevated p-1 hairline"
        role="tablist"
        aria-label="How we build it"
      >
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === id}
            onClick={() => setId(item.id)}
            className={cn(
              "min-h-14 rounded-lg px-1 py-2.5 text-center transition-colors duration-200",
              item.id === id ? "bg-fg text-ink" : "bg-transparent text-muted",
            )}
          >
            <span className="block font-display text-sm font-bold">{item.short}</span>
            <span className="mt-0.5 block truncate px-0.5 text-micro tracking-[0.12em] uppercase opacity-70">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-elevated p-6 hairline" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight">{phase.label}</h3>
          <span className="shrink-0 text-micro font-semibold tracking-[0.16em] text-orange uppercase">
            {phase.badge}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{phase.copy}</p>
      </div>
    </div>
  );
}
