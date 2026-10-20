import { createFileRoute } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import heroAsset from "@/assets/summit-hero.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AICS — Artificial Intelligence Career Summit" },
      { name: "description", content: "Discover AI. Build Your Future. Explore AI careers, meet industry experts and shape tomorrow." },
      { property: "og:title", content: "AICS — Artificial Intelligence Career Summit" },
      { property: "og:description", content: "Discover AI. Build Your Future." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const particles = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + (i % 4),
  dur: 8 + (i % 7) * 2,
  delay: (i * 0.7) % 10,
}));

function Index() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -12, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated blurred backdrop from the image */}
      <div className="absolute inset-0 opacity-25 blur-3xl">
        <img src={heroAsset.url} alt="" className="h-full w-full object-cover animate-ken-burns" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/30 blur-[140px] animate-pulse-glow" />

      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-primary animate-particle"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      <nav className="relative z-10 mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-full border border-border bg-glass px-6 py-3 backdrop-blur-xl">
        <span className="font-display text-xl font-bold tracking-tight">
          AI<span className="text-primary">CS</span>
        </span>
        <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Speakers</a>
          <a href="#" className="hover:text-foreground">Agenda</a>
        </div>
        <a href="#" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow">Register</a>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="animate-rise text-xs font-medium tracking-[0.3em] text-primary">THE NEXT GENERATION OF INTELLIGENCE</p>
          <h1 className="animate-rise mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl" style={{ animationDelay: ".15s" }}>
            YOUR FUTURE.<br />
            <span className="text-primary">REDEFINED</span> BY AI.
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: ".3s" }}>
            Explore emerging AI careers, connect with industry experts, and discover the opportunities shaping tomorrow's workforce.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: ".45s" }}>
            <a href="#" className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-glow transition hover:bg-primary-glow">REGISTER FOR THE SUMMIT</a>
            <a href="#" className="rounded-full border border-border bg-glass px-8 py-4 font-medium backdrop-blur hover:border-primary">Explore Agenda</a>
          </div>
        </div>

        <div className="animate-rise [perspective:1200px]" style={{ animationDelay: ".3s" }} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="animate-float">
            <div
              className="relative overflow-hidden rounded-3xl border border-border shadow-glow transition-transform duration-300 ease-out"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <img src={heroAsset.url} alt="World AI Summit — 14–15 October 2026, Bengaluru" className="w-full animate-ken-burns" />
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-foreground/25 to-transparent animate-sheen" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
