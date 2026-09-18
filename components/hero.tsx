"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { shots } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 50, damping: 20 });
  const y = useSpring(my, { stiffness: 50, damping: 20 });
  const lx = useSpring(mx, { stiffness: 80, damping: 24 });
  const ly = useSpring(my, { stiffness: 80, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${lx}px ${ly}px, rgb(246 173 98 / 0.18), transparent 55%)`;

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const px = event.clientX - box.left;
    const py = event.clientY - box.top;
    mx.set((px / box.width - 0.5) * 36);
    my.set((py / box.height - 0.5) * 24);
    lx.set(px);
    ly.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={frame}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative -mt-16 min-h-dvh overflow-hidden bg-bg sm:-mt-20"
    >
      <motion.img
        src={shots.curbside}
        alt="WE 125 city motorcycle at curbside"
        className="absolute inset-[-6%] size-[112%] max-w-none object-cover object-[center_58%] will-change-transform"
        style={reduce ? undefined : { x, y }}
        initial={false}
        animate={reduce ? { scale: 1 } : { scale: 1.04 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {reduce ? null : (
        <motion.div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{ backgroundImage: spotlight }}
        />
      )}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
          <p className="text-kicker font-semibold tracking-[0.22em] text-orange uppercase">
            Whip Equipped · Manufacture
          </p>
          <h1 className="mt-3 font-display text-hero font-extrabold leading-[0.82] tracking-tight">
            WE 125
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-fg/80 sm:text-xl">
            The city motorcycle. Assembled in America. Connected from day one.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/interest" data-cursor="Join">
                Get on the list
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/platform" data-cursor="View">
                The 125
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
