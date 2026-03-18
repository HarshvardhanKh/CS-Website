"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import LineBackground from "@/components/LineBackground";

// ─── Easing ──────────────────────────────────────────────────────────────────

function easeOutExpo(x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// ─── CountUp (RAF-based, no useInView dependency) ────────────────────────────

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;    // seconds
  duration?: number; // ms
  separator?: string;
}

function CountUp({ to, from = 0, delay = 0, duration = 1400, separator = "", start = true }: CountUpProps & { start?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!start) return;
    if (ref.current) ref.current.textContent = String(from);

    let rafId = 0;
    const startTime = performance.now() + delay * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) { rafId = requestAnimationFrame(tick); return; }
      const p = Math.min(elapsed / duration, 1);
      const val = Math.round(easeOutExpo(p) * (to - from) + from);
      if (ref.current) {
        ref.current.textContent = separator ? val.toLocaleString("en-US") : String(val);
      }
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (ref.current) {
        ref.current.textContent = separator ? to.toLocaleString("en-US") : String(to);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, from, delay, duration, separator, start]);

  return <span ref={ref} />;
}

// ─── Stats data ──────────────────────────────────────────────────────────────

const STATS = [
  { label: "Members",   value: 1500, ticks: 15, delay: 0    },
  { label: "Events",    value: 20,   ticks: 8,  delay: 0.15 },
  { label: "Societies", value: 3,    ticks: 3,  delay: 0.3  },
  { label: "Mentors",   value: 10,   ticks: 5,  delay: 0.45 },
] as const;

// ─── ParticleCanvas ──────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.15 + 0.05,
    }));

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function draw() {
      if (!W) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * W;
          const dy = (pts[i].y - pts[j].y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x * W, pts[i].y * H);
            ctx.lineTo(pts[j].x * W, pts[j].y * H);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// ─── StatCell ────────────────────────────────────────────────────────────────

function StatCell({
  label,
  value,
  ticks,
  delay,
}: {
  label: string;
  value: number;
  ticks: number;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;
    // Trigger reveal wipe
    const revealTimeout = setTimeout(() => {
      if (revealRef.current) {
        revealRef.current.style.transform = "scaleX(0)";
      }
    }, delay * 1000 + 50);

    // Animate ticks in sync with count-up
    const duration = 1400;
    const startTime = performance.now() + delay * 1000;
    let rafId = 0;

    function animTicks(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) { rafId = requestAnimationFrame(animTicks); return; }
      const p = Math.min(elapsed / duration, 1);
      const e = easeOutExpo(p);
      const activeTick = Math.floor(e * ticks);
      tickRefs.current.forEach((t, idx) => {
        if (!t) return;
        t.style.background = idx <= activeTick ? "#ffffff" : "rgba(255,255,255,0.15)";
      });
      if (p < 1) rafId = requestAnimationFrame(animTicks);
      else tickRefs.current.forEach((t) => { if (t) t.style.background = "#ffffff"; });
    }

    rafId = requestAnimationFrame(animTicks);

    return () => {
      clearTimeout(revealTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [delay, ticks, isInView]);

  return (
    <div ref={containerRef} className="relative overflow-hidden border-r border-b border-white/[0.06] p-10 group transition-colors duration-300 hover:bg-white/[0.02] [&:nth-child(2)]:border-r-0 [&:nth-child(4)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0">
      {/* Reveal wipe overlay */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-white/[0.03] origin-left z-10 pointer-events-none"
        style={{ transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />

      {/* Ghost background number */}
      <div
        className="absolute bottom-[-16px] right-[-8px] font-black text-white/[0.025] group-hover:text-white/[0.05] transition-colors duration-300 select-none pointer-events-none leading-none tracking-[-8px] z-0"
        style={{ fontSize: "clamp(100px, 22vw, 200px)" }}
      >
        {value}
      </div>

      {/* Label */}
      <p
        className="relative z-[1] uppercase tracking-[4px] font-light text-white/35 mb-3"
        style={{ fontSize: "16px" }}
      >
        {label}
      </p>

      {/* Number */}
      <div className="relative z-[1] flex items-baseline gap-1 leading-none">
        <div
          className="font-black text-white tracking-[-4px] leading-none tabular-nums"
          style={{ fontSize: "clamp(72px, 14vw, 120px)" }}
        >
          <CountUp
            to={value}
            from={0}
            delay={delay}
            duration={1400}
            separator=","
            start={isInView}
          />
        </div>
        <span
          className="font-black text-white/40 leading-none"
          style={{ fontSize: "clamp(40px, 7vw, 60px)", alignSelf: "flex-start", marginTop: "8px" }}
        >
          +
        </span>
      </div>

      {/* Tick dots */}
      <div className="relative z-[1] flex gap-1.5 mt-5">
        {Array.from({ length: ticks }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { tickRefs.current[i] = el; }}
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        ))}
      </div>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </div>
  );
}

// ─── TeamsInfoComponent ───────────────────────────────────────────────────────

export default function TeamsInfoComponent() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <LineBackground
          lineColor="rgba(180, 140, 60, 0.4)"
          backgroundColor="#0d0d0d"
          lineCount={12}
          animated={true}
        />
      </div>

      {/* Left column */}
      <div className="flex flex-col items-start gap-10 w-[40vw] h-[80vh]">
        <h1 className="font-bold text-[#f9a71f] text-6xl">IEEE CS MUJ</h1>
        <h1 className="text-[#f9a71f] text-6xl -translate-y-10">Since 2019</h1>
        <img
          className="h-[50vh] object-contain"
          src="/images/events/2.png"
          alt="img"
        />
      </div>

      {/* Right column – stats grid */}
      <div className="relative w-[50vw] h-[80vh]">
        <ParticleCanvas />
        <div className="relative z-[1] w-full h-full grid grid-cols-2 grid-rows-2">
          {STATS.map(({ label, value, ticks, delay }) => (
            <StatCell
              key={label}
              label={label}
              value={value}
              ticks={ticks}
              delay={delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}