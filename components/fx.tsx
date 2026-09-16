"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setFine(media.matches && !reduced.matches);
    sync();
    media.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return fine;
}

export function SiteFx() {
  const fine = useFinePointer();
  return (
    <>
      <div className="grain" aria-hidden />
      <ScrollProgress />
      {fine ? <Cursor /> : null}
    </>
  );
}

function ScrollProgress() {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scaleX]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-orange"
      style={{ scaleX }}
    />
  );
}

function Cursor() {
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.7 });
  const ry = useSpring(y, { stiffness: 140, damping: 22, mass: 0.7 });
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("fancy-cursor");
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const hit = target?.closest("a, button, [data-cursor]") as HTMLElement | null;
      setHot(Boolean(hit));
      setLabel(hit?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => {
      document.documentElement.classList.remove("fancy-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] size-2 rounded-full bg-fg mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] grid place-items-center rounded-full border border-fg/50 text-micro font-semibold tracking-[0.16em] text-fg uppercase mix-blend-difference"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: hot ? 88 : 36,
          height: hot ? 88 : 36,
        }}
      >
        {hot ? label || "Open" : ""}
      </motion.div>
    </>
  );
}
