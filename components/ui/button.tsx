import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-[transform,filter] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:opacity-40 disabled:pointer-events-none active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "brand-gradient text-ink shadow-[0_18px_40px_rgb(240_68_73_/_0.28)] hover:brightness-110 btn-shine",
        secondary: "bg-fg text-ink hover:bg-paper",
        ghost: "bg-fg/8 text-fg backdrop-blur-md hairline hover:bg-fg/14",
        outline: "bg-transparent text-fg border border-border hover:border-fg",
      },
      size: {
        sm: "h-11 px-5 text-kicker rounded-full",
        md: "h-12 px-6 text-kicker rounded-full",
        lg: "h-14 px-7 text-sm rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
