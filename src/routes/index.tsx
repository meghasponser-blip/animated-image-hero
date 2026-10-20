import { createFileRoute } from "@tanstack/react-router";
import glass from "@/assets/glass-twist.png";

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

const particles = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + (i % 3),
  dur: 9 + (i % 6) * 2,
  delay: (i * 0.8) % 10,
}));

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero">
      <div className="absolute inset-0 scanlines" />

      <img src={glass} alt="" width={768} height={1152} className="pointer-events-none absolute -left-24 top-1/3 w-56 opacity-90 animate-twist md:w-80" />
      <img src={glass} alt="" width={768} height={1152} className="pointer-events-none absolute -right-20 -top-16 w-56 rotate-180 opacity-90 animate-twist md:w-96" style={{ animationDelay: "-4s" }} />

      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-foreground/70 animate-particle"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <span className="rounded-b-md bg-primary px-3 pb-2 pt-3 font-display text-sm font-bold leading-tight">1st<br />Edition</span>
          <span className="font-display text-xl font-bold">AICS</span>
        </div>
        <div className="hidden gap-8 rounded-full border border-border bg-glass px-6 py-2 text-sm text-muted-foreground backdrop-blur-xl md:flex">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Speakers</a>
          <a href="#" className="hover:text-foreground">Agenda</a>
        </div>
        <a href="#" className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background">Register</a>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="animate-rise flex items-center gap-5 md:gap-8">
          <span className="font-display text-7xl font-extrabold leading-none tracking-tighter drop-shadow-[var(--shadow-glow)] md:text-9xl">Ai</span>
          <span className="h-24 w-px bg-foreground/50 md:h-32" />
          <h1 className="text-left font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            Career<br />Summit
          </h1>
        </div>

        <div className="animate-rise mt-6 flex items-center gap-4 border-y border-foreground/30 py-2 font-display text-lg font-medium md:text-2xl" style={{ animationDelay: ".15s" }}>
          <span>Discover AI</span><span className="h-5 w-px bg-foreground/50" /><span>Build Your Future</span>
        </div>

        <p className="animate-rise mt-10 max-w-2xl font-display text-xl font-medium md:text-3xl" style={{ animationDelay: ".3s" }}>
          The Future Is Intelligent. Your Career Starts Here.
        </p>
        <p className="animate-rise mt-4 max-w-xl text-muted-foreground" style={{ animationDelay: ".4s" }}>
          Explore emerging AI careers, connect with industry experts, and discover the opportunities shaping tomorrow's workforce.
        </p>

        <div className="animate-rise mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: ".5s" }}>
          <a href="#" className="rounded-full bg-foreground px-8 py-4 font-medium text-background shadow-glow transition hover:scale-105">REGISTER FOR THE SUMMIT</a>
          <a href="#" className="rounded-full border border-border bg-glass px-8 py-4 font-medium backdrop-blur hover:border-foreground">Explore Agenda</a>
        </div>
      </section>
    </main>
  );
}
