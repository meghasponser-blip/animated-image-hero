import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import glass from "@/assets/glass-twist.png";
import { NeuralCanvas } from "./NeuralCanvas";
import { summit } from "@/config/summit";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });
  const lx = useTransform(sx, (v) => v * -40), ly = useTransform(sy, (v) => v * -30);
  const rx = useTransform(sx, (v) => v * 40), ry = useTransform(sy, (v) => v * 30);
  const gx = useMotionValue(-500), gy = useMotionValue(-500);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5);
        gx.set(e.clientX - 250); gy.set(e.clientY - 250);
      }}
    >
      <div className="absolute inset-0 scanlines" />
      <NeuralCanvas />
      <motion.div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-glow/25 blur-[100px]" style={{ x: gx, y: gy }} />

      <motion.img src={glass} alt="" width={768} height={1152} initial={{ opacity: 0, x: -120 }} animate={{ opacity: 0.95, x: 0 }} transition={{ duration: 1.6, ease }}
        style={{ x: lx, y: ly }} className="pointer-events-none absolute -left-28 top-[30%] w-48 md:w-80" >
      </motion.img>
      <motion.img src={glass} alt="" width={768} height={1152} initial={{ opacity: 0, x: 120 }} animate={{ opacity: 0.95, x: 0 }} transition={{ duration: 1.6, ease }}
        style={{ x: rx, y: ry }} className="pointer-events-none absolute -right-24 -top-20 w-52 rotate-180 md:w-96" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center">
        <motion.p initial={{ opacity: 0, letterSpacing: "0.8em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }} transition={{ duration: 1.2, ease }}
          className="mb-8 text-xs font-medium text-muted-foreground">THE NEXT GENERATION OF INTELLIGENCE</motion.p>

        <div className="flex items-center gap-5 md:gap-8">
          <motion.span initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="font-display text-7xl font-extrabold leading-none tracking-tighter text-glow md:text-[9rem]">Ai</motion.span>
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="h-24 w-px origin-top bg-foreground/50 md:h-36" />
          <h1 className="text-left font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            {["Career", "Summit"].map((word, wi) => (
              <span key={word} className="block overflow-hidden">
                {word.split("").map((ch, i) => (
                  <motion.span key={i} className="inline-block" initial={{ y: "110%", filter: "blur(8px)" }} animate={{ y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease, delay: 0.8 + wi * 0.25 + i * 0.04 }}>{ch}</motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <motion.div initial={{ opacity: 0, clipPath: "inset(0 50% 0 50%)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0%)" }} transition={{ duration: 1, delay: 1.5, ease }}
          className="mt-6 flex items-center gap-4 border-y border-foreground/30 py-2 font-display text-base font-medium md:text-2xl">
          <span>{summit.dateLabel}</span><span className="h-5 w-px bg-foreground/50" /><span>{summit.city}</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }} className="mt-10 max-w-2xl font-display text-xl font-medium md:text-3xl">
          Your Future. <span className="text-gradient">Redefined by AI.</span>
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.95 }} className="mt-4 max-w-xl text-muted-foreground">
          Explore emerging AI careers, connect with industry experts, experience future-ready technologies, and discover the opportunities shaping tomorrow's workforce.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.1 }} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#register" className="rounded-full bg-foreground px-8 py-4 font-medium text-background shadow-glow transition hover:scale-105">REGISTER FOR THE SUMMIT</a>
          <a href="#about" className="rounded-full border border-border bg-glass px-8 py-4 font-medium backdrop-blur transition hover:border-foreground">EXPLORE THE EXPERIENCE</a>
        </motion.div>
      </div>

      <motion.a href="#info" aria-label="Scroll down" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ opacity: { delay: 2.5 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"><ChevronDown className="h-7 w-7" /></motion.a>
    </section>
  );
}
