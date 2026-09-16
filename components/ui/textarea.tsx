import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-[16px] border border-border bg-elevated px-4 py-3 text-[15px] text-fg placeholder:text-muted outline-none transition-[box-shadow] duration-150",
        "focus-visible:shadow-[0_0_0_2px_#050505,0_0_0_4px_#f6ad62]",
        className,
      )}
      {...props}
    />
  );
}
