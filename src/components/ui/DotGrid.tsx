"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

type Throttled<Args extends unknown[]> = (...args: Args) => void;

const throttle = <Args extends unknown[]>(func: (...args: Args) => void, limit: number): Throttled<Args> => {
  let lastCall = 0;

  return (...args: Args) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  };
}

type Rgb = { r: number; g: number; b: number };

/**
 * Dots inside the pointer radius are grouped into this many colour steps, so a
 * frame is painted with a handful of canvas fills instead of one blurred fill
 * per dot.
 */
const COLOR_STEPS = 8;

/** How long the grid may stay unchanged before it stops painting altogether. */
const IDLE_STOP_MS = 800;

function lerpColor(from: Rgb, to: Rgb, ratio: number) {
  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const viewRef = useRef({ width: 0, height: 0, dpr: 1 });
  const paintRef = useRef<((withGlow: boolean) => void) | null>(null);
  const wakeRef = useRef<() => void>(() => {});
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;

    const path = new Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (!width || !height) return;

    // Cap the backing store: a 3x buffer costs 2.25x the pixels of a 2x one for
    // pixels nobody can see on 1.8px dots.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    viewRef.current = { width, height, dpr };

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridWidth = cell * cols - gap;
    const gridHeight = cell * rows - gap;
    const extraX = width - gridWidth;
    const extraY = height - gridHeight;
    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        dots.push({
          cx: startX + col * cell,
          cy: startY + row * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }

    dotsRef.current = dots;

    // The paint loop may be asleep (idle or off screen); make sure a rebuilt
    // grid is visible straight away.
    paintRef.current?.(true);
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const radius = dotSize / 2;
    const glowBlur = dotSize * 8;
    const proximitySquared = proximity * proximity;
    const stepColors = Array.from({ length: COLOR_STEPS }, (_, index) =>
      lerpColor(baseRgb, activeRgb, index / (COLOR_STEPS - 1)),
    );

    // One paint pass draws the whole grid: the dots outside the pointer radius
    // are batched into a single path (one shared glow pass) and the dots inside
    // it are grouped into a few colour steps. That replaces a
    // save/translate/shadowBlur/fill/restore cycle per dot, per frame — the
    // reason an idle page kept a CPU core busy.
    const paint = (withGlow: boolean) => {
      const { width, height, dpr } = viewRef.current;
      if (!width || !height) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const pointerX = pointerRef.current.x;
      const pointerY = pointerRef.current.y;
      const farPath = new Path2D();
      const nearPaths: Path2D[] = [];
      for (let step = 0; step < COLOR_STEPS; step += 1) {
        nearPaths.push(new Path2D());
      }

      for (const dot of dotsRef.current) {
        const x = dot.cx + dot.xOffset;
        const y = dot.cy + dot.yOffset;
        const dx = dot.cx - pointerX;
        const dy = dot.cy - pointerY;
        const distanceSquared = dx * dx + dy * dy;

        let path = farPath;
        if (withGlow && distanceSquared <= proximitySquared) {
          const ratio = 1 - Math.sqrt(distanceSquared) / proximity;
          const step = Math.min(COLOR_STEPS - 1, Math.max(0, Math.round(ratio * (COLOR_STEPS - 1))));
          path = nearPaths[step];
        }

        path.moveTo(x + radius, y);
        path.arc(x, y, radius, 0, Math.PI * 2);
      }

      ctx.fillStyle = baseColor;
      ctx.shadowColor = baseColor;
      if (withGlow) ctx.shadowBlur = glowBlur;
      ctx.fill(farPath);
      ctx.shadowBlur = 0;

      for (let step = 0; step < COLOR_STEPS; step += 1) {
        const color = stepColors[step];
        ctx.fillStyle = color;
        if (withGlow) {
          ctx.shadowBlur = glowBlur;
          ctx.shadowColor = color;
        }
        ctx.fill(nearPaths[step]);
      }

      ctx.shadowBlur = 0;
    };

    paintRef.current = paint;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Respect the OS setting: draw the grid once and never animate it.
      const frameId = window.requestAnimationFrame(() => paint(true));
      return () => {
        window.cancelAnimationFrame(frameId);
        paintRef.current = null;
      };
    }

    let rafId = 0;
    let running = false;
    let onScreen = false;
    let lastPaint = 0;
    let lastPointerX = Number.NaN;
    let lastPointerY = Number.NaN;

    const hasMovingDot = () => {
      for (const dot of dotsRef.current) {
        if (dot.xOffset !== 0 || dot.yOffset !== 0) return true;
      }
      return false;
    };

    const frame = () => {
      const pointer = pointerRef.current;
      const now = performance.now();
      const pointerMoved = pointer.x !== lastPointerX || pointer.y !== lastPointerY;

      if (pointerMoved || hasMovingDot()) {
        lastPointerX = pointer.x;
        lastPointerY = pointer.y;
        lastPaint = now;
        paint(true);
      }

      // Nothing to show any more: sleep until the next interaction instead of
      // re-drawing a static grid 60 times per second.
      if (now - lastPaint > IDLE_STOP_MS) {
        stop();
        return;
      }

      rafId = window.requestAnimationFrame(frame);
    };

    function start() {
      if (running || document.hidden || !onScreen) return;
      running = true;
      lastPaint = performance.now();
      rafId = window.requestAnimationFrame(frame);
    }

    function stop() {
      if (!running) return;
      running = false;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    wakeRef.current = start;

    const wrapper = wrapperRef.current;
    let observer: IntersectionObserver | null = null;

    if (wrapper && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          onScreen = entries[entries.length - 1].isIntersecting;
          if (onScreen) {
            lastPointerX = Number.NaN;
            start();
          } else {
            stop();
          }
        },
        { threshold: 0 },
      );
      observer.observe(wrapper);
    } else {
      onScreen = true;
      start();
    }

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      wakeRef.current = () => {};
      paintRef.current = null;
    };
  }, [activeRgb, baseColor, baseRgb, circlePath, dotSize, proximity]);

  useEffect(() => {
    buildGrid();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && (window as any).ResizeObserver) {
      resizeObserver = new (window as any).ResizeObserver(buildGrid);
      if (wrapperRef.current) {
        resizeObserver?.observe(wrapperRef.current);
      }
    } else {
      window.addEventListener("resize", buildGrid);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", buildGrid);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      wakeRef.current();

      const now = performance.now();
      const pointer = pointerRef.current;
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.vx = vx;
      pointer.vy = vy;
      pointer.speed = speed;

      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (speed > speedTrigger && distance < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);

          const pushX = dot.cx - pointer.x + vx * 0.005;
          const pushY = dot.cy - pointer.y + vy * 0.005;

          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      wakeRef.current();

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY);
        if (distance < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);

          const falloff = Math.max(0, 1 - distance / shockRadius);
          const pushX = (dot.cx - clickX) * shockStrength * falloff;
          const pushY = (dot.cy - clickY) * shockStrength * falloff;

          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, [maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger]);

  return (
    <div className={`relative h-full w-full ${className}`} style={style}>
      <div ref={wrapperRef} className="relative h-full w-full">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
