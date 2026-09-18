"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { nav, shots } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  current?: (typeof nav)[number]["to"];
};

export function Destinations({ current }: Props) {
  const items = nav.filter((item) => item.to !== current);

  return (
    <nav
      aria-label="Go"
      className={cn("grid sm:grid-cols-2", items.length > 2 && "lg:grid-cols-3")}
    >
      {items.map((item) => (
        <Tile key={item.to} item={item} />
      ))}
    </nav>
  );
}

function Tile({ item }: { item: (typeof nav)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 160, damping: 18 });
  const ry = useSpring(my, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(ry, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(rx, [-0.5, 0.5], [-7, 7]);
  const ix = useTransform(rx, [-0.5, 0.5], [-18, 18]);
  const iy = useTransform(ry, [-0.5, 0.5], [-12, 12]);

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    mx.set((event.clientX - box.left) / box.width - 0.5);
    my.set((event.clientY - box.top) / box.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          ref={ref}
          href={item.to}
          data-cursor="View"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="group relative block min-h-80 overflow-hidden no-underline sm:min-h-[28rem]"
        >
          <motion.img
            src={shots[item.shot]}
            alt=""
            className="absolute inset-[-8%] size-[116%] max-w-none object-cover will-change-transform"
            style={{ x: ix, y: iy }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
          <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <span className="absolute bottom-0 left-0 p-6 sm:p-8">
            <span className="block text-kicker font-semibold tracking-[0.18em] text-orange uppercase">
              {item.line}
            </span>
            <span className="mt-2 block font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              {item.label}
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
