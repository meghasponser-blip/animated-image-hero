import { useEffect, useRef } from "react";

// Lightweight mouse-reactive neural network field.
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999 };
    const count = window.innerWidth < 768 ? 45 : 90;
    const pts = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0006 }));
    const resize = () => {
      const d = Math.min(window.devicePixelRatio, 2);
      w = c.offsetWidth; h = c.offsetHeight;
      c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]!; const ax = a.x * w, ay = a.y * h;
        const md = Math.hypot(ax - mouse.x, ay - mouse.y);
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]!; const d = Math.hypot(ax - b.x * w, ay - b.y * h);
          if (d < 130) {
            ctx.strokeStyle = `rgba(190,170,255,${(1 - d / 130) * (md < 180 ? 0.6 : 0.18)})`;
            ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.x * w, b.y * h); ctx.stroke();
          }
        }
        const near = md < 180;
        ctx.fillStyle = near ? "rgba(255,140,220,0.95)" : "rgba(220,210,255,0.6)";
        ctx.beginPath(); ctx.arc(ax, ay, near ? 2.4 : 1.4, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
