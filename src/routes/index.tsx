import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Cursor, FloatingActions, Loader, Navbar } from "@/components/site/Chrome";
import { Hero } from "@/components/site/Hero";
import { About, Process, Quality, Why } from "@/components/site/Story";
import { Products } from "@/components/site/Products";
import { Gallery, Social, Testimonials } from "@/components/site/Community";
import { Contact, Footer } from "@/components/site/Contact";
import { CONTACT } from "@/lib/catalog";

const TITLE = "S2K Spices — Soil To Kitchen | Premium Guntur Spices & Pickles";
const DESC =
  "Handpicked premium spices, authentic Andhra pickles and traditional snacks sourced directly from trusted Guntur farmers and delivered fresh to your kitchen.";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "S2K Spices",
  slogan: "Soil To Kitchen",
  description: DESC,
  telephone: `+91${CONTACT.phone}`,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "4-142, Nutakki",
    addressLocality: "Mangalagiri",
    addressRegion: "Andhra Pradesh",
    postalCode: "522303",
    addressCountry: "IN",
  },
  sameAs: [CONTACT.instagram, CONTACT.youtube, CONTACT.facebook],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSONLD) }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.25, smoothWheel: true });
        const loop = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Why />
        <Products />
        <Process />
        <Quality />
        <Testimonials />
        <Gallery />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
