"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { shots } from "@/lib/site";

const title = ["W", "E", " ", "1", "2", "5"];

export function Hero() {
  const frame = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 50, damping: 20 });
  const y = useSpring(my, { stiffness: 50, damping: 20 });
  const lx = useSpring(mx, { stiffness: 80, damping: 24 });
  const ly = useSpring(my, { stiffness: 80, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${lx}px ${ly}px, rgb(246 173 98 / 0.18), transparent 55%)`;

  function onMove(event: MouseEvent<HTMLElement>) {
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
      className="relative min-h-dvh overflow-hidden bg-bg"
    >
      <motion.img
        src={shots.curbside}
        alt="WE 125"
        className="absolute inset-[-6%] size-[112%] max-w-none object-cover object-[center_58%] will-change-transform"
        style={{ x, y }}
        initial={false}
        animate={{ scale: 1.04 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: spotlight }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg via-bg/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 pb-8 sm:px-6 sm:pb-10">
          <h1 className="flex font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {title.map((char, i) => (
              <span
                key={`${char}-${i}`}
                className={char === " " ? "w-3 sm:w-4" : "inline-block"}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </h1>
          <Button asChild size="lg" className="btn-shine">
            <Link href="/interest" data-cursor="Join">
              Get on the list
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
