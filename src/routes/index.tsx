import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Nav, InfoStrip, About, WhyAttend, Tracks, Speakers, Schedule, Organizer, Gallery, Register, Partners, FAQ, Footer } from "@/components/site/Sections";

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

function Index() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <InfoStrip />
      <About />
      <WhyAttend />
      <Tracks />
      <Speakers />
      <Schedule />
      <Organizer />
      <Gallery />
      <Register />
      <Partners />
      <FAQ />
      <Footer />
    </main>
  );
}
