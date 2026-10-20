import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { Menu, X, Mic, Users, Cpu, Wrench, Network, Compass, Plus } from "lucide-react";
import { summit, tracks, agenda, speakerTypes, faqs } from "@/config/summit";
import stage from "@/assets/g-stage.jpg";
import students from "@/assets/g-students.jpg";
import networkImg from "@/assets/g-network.jpg";

const links = [
  ["Home", "home"], ["About", "about"], ["Speakers", "speakers"], ["Career Tracks", "tracks"],
  ["Schedule", "schedule"], ["Partners", "partners"], ["FAQ", "faq"],
] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>
  );
}

function Heading({ kicker, title }: { kicker: string; title: ReactNode }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="mb-4 text-xs font-medium tracking-[0.3em] text-primary-glow">{kicker}</p>
      <h2 className="font-display text-4xl font-bold uppercase leading-[1] tracking-tight md:text-6xl">{title}</h2>
    </Reveal>
  );
}

const Section = ({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) => (
  <section id={id} className={`relative scroll-mt-20 px-6 py-24 md:py-32 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>
);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-xl font-extrabold tracking-tight">AI<span className="text-gradient">CS</span></a>
        <nav className="hidden gap-7 text-sm text-muted-foreground lg:flex">
          {links.map(([l, id]) => <a key={id} href={`#${id}`} className="transition hover:text-foreground">{l}</a>)}
        </nav>
        <a href="#register" className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background lg:inline-block">Register Now</a>
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-background/95 p-6 backdrop-blur-xl">
            <button className="self-end" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            <div className="mt-10 flex flex-col gap-6">
              {links.map(([l, id], i) => (
                <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="font-display text-3xl font-bold">{l}</motion.a>
              ))}
              <a href="#register" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-foreground px-6 py-4 text-center font-medium text-background">Register Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function useCountdown(target: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { if (!target) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [target]);
  if (!target) return null;
  const d = Math.max(0, new Date(target).getTime() - now);
  return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
}

export function InfoStrip() {
  const cd = useCountdown(summit.date);
  const items = [["Date", summit.dateLabel], ["Venue", summit.venue], ["City", summit.city], ["Format", summit.format], ["Registration", summit.registrationStatus]];
  return (
    <section id="info" className="relative border-y border-border bg-card/40 px-6 py-10 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-6">
        {items.map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.06}><p className="text-xs tracking-widest text-muted-foreground uppercase">{k}</p><p className="mt-1 font-display font-semibold">{v}</p></Reveal>
        ))}
        <Reveal delay={0.3}>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Countdown</p>
          {cd ? (
            <div className="mt-1 flex gap-3 font-display font-bold text-primary-glow">
              {cd.map((n, i) => <span key={i}>{String(n).padStart(2, "0")}<span className="text-xs text-muted-foreground">{"dhms"[i]}</span></span>)}
            </div>
          ) : <p className="mt-1 font-display font-semibold">Starts once date is set</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  const cards = [["01", "DISCOVER", "Understand AI technologies, industry trends, and emerging career opportunities."], ["02", "CONNECT", "Meet professionals, educators, founders, recruiters, and fellow innovators."], ["03", "BUILD", "Explore practical skills, career pathways, projects, and next steps for entering the AI ecosystem."]];
  return (
    <Section id="about">
      <Heading kicker="ABOUT THE SUMMIT" title={<>More than a summit. <span className="text-gradient">A career accelerator.</span></>} />
      <Reveal><p className="mb-16 max-w-2xl text-lg text-muted-foreground">AICS — Artificial Intelligence Career Summit is designed to connect people with the knowledge, technologies, and opportunities shaping the AI-driven economy.</p></Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(([n, t, d], i) => (
          <Reveal key={n} delay={i * 0.12}>
            <div className="group card-glass relative h-full overflow-hidden rounded-3xl p-8 transition duration-500 hover:-translate-y-2 hover:shadow-glow">
              <span className="font-display text-8xl font-extrabold text-foreground/10 transition group-hover:text-primary-glow/40">{n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-glow transition duration-700 group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WhyAttend() {
  const items = [[Compass, "AI Career Exploration", "Map the roles, skills and pathways across the AI landscape."], [Mic, "Industry Expert Sessions", "Hear practitioners share how AI is changing their fields."], [Cpu, "Live AI Demonstrations", "See current AI technologies in action."], [Wrench, "Hands-on Experiences", "Planned interactive sessions — details to be announced."], [Network, "Networking Opportunities", "Meet peers, mentors and builders in the AI ecosystem."], [Users, "Career Guidance", "Guidance on next steps — specific programs to be announced."]] as const;
  return (
    <Section id="why" className="bg-card/20">
      <Heading kicker="WHY ATTEND" title={<>Why attend <span className="text-gradient">AICS?</span></>} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([Icon, t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 0.1}>
            <div className="group card-glass h-full rounded-3xl p-8 transition duration-500 hover:-translate-y-2 hover:border-primary-glow/60">
              <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-4 transition group-hover:rotate-6 group-hover:scale-110"><Icon className="h-6 w-6" /></div>
              <h3 className="font-display text-xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Tracks() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="tracks">
      <Heading kicker="AI CAREER TRACKS" title={<>Find your place in the <span className="text-gradient">AI revolution.</span></>} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tracks.map((t, i) => (
          <Reveal key={t.t} delay={(i % 4) * 0.08}>
            <div className="card-glass flex h-full flex-col rounded-3xl p-6 transition hover:shadow-glow">
              <span className="font-display text-sm text-primary-glow">TRACK {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold leading-tight">{t.t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.topics}</p>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-sm">
                    <p className="mt-4"><b>Example roles:</b> <span className="text-muted-foreground">{t.roles}</span></p>
                    <p className="mt-2"><b>Suggested skills:</b> <span className="text-muted-foreground">{t.skills}</span></p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button onClick={() => setOpen(open === i ? null : i)} className="mt-5 self-start text-sm font-medium text-primary-glow hover:underline">{open === i ? "Close" : "Explore Career Path →"}</button>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Attending the summit does not guarantee job placement.</p>
    </Section>
  );
}

export function Speakers() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <Section id="speakers" className="bg-card/20">
      <Heading kicker="SPEAKERS & EXPERTS" title={<>Meet the minds <span className="text-gradient">shaping tomorrow.</span></>} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakerTypes.map((type, i) => (
          <Reveal key={type} delay={(i % 3) * 0.1}>
            <button onClick={() => setSel(type)} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-hero text-left">
              <div className="absolute inset-0 scanlines opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center font-display text-8xl font-extrabold text-foreground/10 transition duration-700 group-hover:scale-110">?</div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <span className="mb-3 block h-px w-12 bg-primary-glow transition-all duration-500 group-hover:w-24" />
                <p className="text-xs tracking-widest text-primary-glow uppercase">{type}</p>
                <p className="mt-1 font-display text-xl font-bold">Speaker Announcement Coming Soon</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6 backdrop-blur">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="card-glass max-w-md rounded-3xl p-8">
              <p className="text-xs tracking-widest text-primary-glow uppercase">{sel}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">Speaker Announcement Coming Soon</h3>
              <p className="mt-4 text-muted-foreground">Biography, session title and schedule will appear here once the speaker is confirmed.</p>
              <button onClick={() => setSel(null)} className="mt-6 rounded-full bg-foreground px-6 py-2 text-sm text-background">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export function Schedule() {
  const types = ["All", ...Array.from(new Set(agenda.map((a) => a.type)))];
  const [f, setF] = useState("All");
  return (
    <Section id="schedule">
      <Heading kicker="PROPOSED AGENDA" title={<>Summit <span className="text-gradient">schedule.</span></>} />
      <p className="-mt-8 mb-8 inline-block rounded-full border border-primary-glow/50 px-4 py-1 text-xs tracking-widest text-primary-glow">PROPOSED AGENDA — NOT YET CONFIRMED</p>
      <div className="mb-10 flex flex-wrap gap-2">
        {types.map((t) => <button key={t} onClick={() => setF(t)} className={`rounded-full border px-4 py-2 text-sm transition ${f === t ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}>{t}</button>)}
      </div>
      <div className="relative border-l border-border pl-8">
        {agenda.filter((a) => f === "All" || a.type === f).map((a, i) => (
          <motion.div key={a.title} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="relative mb-8">
            <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-primary-glow shadow-glow" />
            <p className="text-xs tracking-widest text-muted-foreground">TIME {a.time} · {a.dur} · {a.type.toUpperCase()}</p>
            <h3 className="mt-1 font-display text-xl font-bold">{a.title}</h3>
            <p className="text-sm text-muted-foreground">Speaker: To be announced</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function Organizer() {
  const o = summit.organizer;
  const rows = [["Conducted by", o.conductedBy], ["Presented by", o.presentedBy], ["In association with", o.association], ["Knowledge partners", o.knowledge], ["Community partners", o.community], ["Event contact", `${summit.contactEmail} · ${summit.contactPhone}`]];
  return (
    <Section id="organizer" className="bg-card/20">
      <Heading kicker="ORGANIZERS" title={<>Powered by vision. <span className="text-gradient">Driven by innovation.</span></>} />
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map(([k, v], i) => <Reveal key={k} delay={i * 0.05}><div className="card-glass rounded-2xl p-6"><p className="text-xs tracking-widest text-muted-foreground uppercase">{k}</p><p className="mt-1 font-display font-semibold">{v}</p></div></Reveal>)}
      </div>
    </Section>
  );
}

export function Gallery() {
  return (
    <Section id="gallery">
      <Heading kicker="LIVE EXPERIENCE" title={<>Step into <span className="text-gradient">the future.</span></>} />
      <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
        {[[stage, "md:col-span-2 md:row-span-2", "Keynote stage", 1536, 1024], [students, "", "Hands-on with AI", 1024, 1280], [networkImg, "", "Networking & demos", 1024, 1024]].map(([src, cls, cap, w, h], i) => (
          <Reveal key={cap as string} delay={i * 0.1} className={cls as string}>
            <div className="group relative h-full overflow-hidden rounded-3xl">
              <img src={src as string} alt={cap as string} loading="lazy" width={w as number} height={h as number} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
              <span className="card-glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm">{cap}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Conceptual visuals — real event photos will be added after the summit.</p>
    </Section>
  );
}

const field = "w-full rounded-xl border border-border bg-background/60 px-4 py-3 outline-none transition focus:border-primary-glow";

export function Register() {
  const [state, setState] = useState<"idle" | "error">("idle");
  const [errs, setErrs] = useState<string[]>([]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const er: string[] = [];
    if (!String(d.get("name")).trim()) er.push("Full name is required.");
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) er.push("Enter a valid email.");
    if (!/^\+\d{1,3}\s?\d{6,14}$/.test(String(d.get("phone")))) er.push("Enter phone with country code, e.g. +91 9876543210.");
    if (!String(d.get("org")).trim()) er.push("Institution or company is required.");
    if (!d.get("consent")) er.push("Please accept the privacy policy.");
    setErrs(er);
    if (!er.length) setState("error");
  };
  return (
    <Section id="register">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary-glow/50 bg-card/60 p-8 shadow-glow md:p-14">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-[120px]" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="rounded-full border border-border px-3 py-1 text-xs tracking-widest text-muted-foreground">DEMO FORM</span>
              <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-none md:text-5xl">Your next opportunity <span className="text-gradient">starts here.</span></h2>
              <p className="mt-6 text-muted-foreground">Take the next step toward understanding AI, discovering new career pathways, and connecting with the people building the future.</p>
              <p className="mt-6 text-sm text-muted-foreground">Online registration isn't connected yet. Contact: {summit.contactEmail}</p>
            </div>
            <form onSubmit={submit} className="grid gap-4" noValidate>
              <input name="name" placeholder="Full name *" className={field} />
              <input name="email" type="email" placeholder="Email address *" className={field} />
              <input name="phone" placeholder="Mobile with country code *" className={field} />
              <input name="org" placeholder="College, institution or company *" className={field} />
              <select name="role" className={field} defaultValue="Student">{["Student", "Working Professional", "Educator", "Entrepreneur", "Other"].map((r) => <option key={r}>{r}</option>)}</select>
              <select name="interest" className={field}>{tracks.map((t) => <option key={t.t}>{t.t}</option>)}</select>
              <textarea name="access" placeholder="Accessibility or participation requirements (optional)" className={field} rows={2} />
              <label className="flex gap-3 text-sm text-muted-foreground"><input type="checkbox" name="consent" /> I agree to the privacy policy and event communications.</label>
              {errs.length > 0 && <ul className="text-sm text-destructive">{errs.map((e) => <li key={e}>{e}</li>)}</ul>}
              {state === "error" && !errs.length && <p className="text-sm text-primary-glow">Registration is not open online yet — your details were not saved. Please check back soon.</p>}
              <button className="rounded-full bg-foreground px-8 py-4 font-medium text-background transition hover:scale-[1.02]">SECURE MY SPOT</button>
            </form>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Partners() {
  const tiers = ["Title Partner", "Gold Partner", "Technology Partner", "Knowledge Partner", "Community Partner", "Supporting Partner"];
  return (
    <Section id="partners" className="bg-card/20">
      <Heading kicker="SPONSORS & PARTNERS" title={<>Build the future <span className="text-gradient">with us.</span></>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t, i) => <Reveal key={t} delay={i * 0.05}><div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center"><p className="text-xs tracking-widest text-primary-glow uppercase">{t}</p><p className="mt-2 text-sm text-muted-foreground">To be announced</p></div></Reveal>)}
      </div>
      <a href={`mailto:${summit.contactEmail}`} className="mt-10 inline-block rounded-full border border-border bg-glass px-8 py-4 font-medium backdrop-blur hover:border-foreground">Explore Partnership Opportunities</a>
    </Section>
  );
}

export function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <Section id="faq">
      <Heading kicker="FAQ" title={<>Questions, <span className="text-gradient">answered.</span></>} />
      <div className="max-w-3xl divide-y divide-border border-y border-border">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between py-6 text-left font-display text-lg font-semibold">
              {q}<Plus className={`h-5 w-5 shrink-0 transition ${o === i ? "rotate-45 text-primary-glow" : ""}`} />
            </button>
            <AnimatePresence>{o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-6 text-muted-foreground">{a}</motion.p>}</AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-extrabold">AI<span className="text-gradient">CS</span></p>
          <p className="mt-3 max-w-sm text-muted-foreground">AICS — Artificial Intelligence Career Summit. Exploring the technologies, skills, and opportunities shaping the future of work.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">{links.map(([l, id]) => <a key={id} href={`#${id}`} className="hover:text-foreground">{l}</a>)}</div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>Email: {summit.contactEmail}</p><p>Phone: {summit.contactPhone}</p><p>{summit.venue} · {summit.dateLabel}</p>
          <p className="mt-4">Privacy Policy · Terms · Code of Conduct · Accessibility</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-xs text-muted-foreground">© {new Date().getFullYear()} AICS — Artificial Intelligence Career Summit. All rights reserved.</p>
    </footer>
  );
}
