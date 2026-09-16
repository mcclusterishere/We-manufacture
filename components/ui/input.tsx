import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[14px] border border-border bg-elevated px-4 text-[15px] text-fg placeholder:text-muted outline-none transition-[box-shadow] duration-150",
        "focus-visible:shadow-[0_0_0_2px_#050505,0_0_0_4px_#f6ad62]",
        className,
      )}
      {...props}
    />
  );
}
