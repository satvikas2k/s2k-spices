import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import farmerHands from "@/assets/farmer-hands.jpg";
import spices from "@/assets/spices.jpg";
import sathvikaPortrait from "@/assets/sathvika-portrait.png";
import { Reveal, SectionHeading } from "./primitives";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 70]);

  return (
    <section id="about" className="bg-background px-6 py-32 lg:px-14 lg:py-48">
      <div ref={ref} className="mx-auto grid max-w-[1600px] gap-20 lg:grid-cols-[1.05fr_1fr] lg:gap-28">
        <div className="relative">
          <motion.div style={{ y: y1 }} className="overflow-hidden">
            <img
              src={farmerHands}
              alt="A farmer's hands holding freshly harvested red chillies"
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -right-4 -bottom-16 hidden w-[48%] overflow-hidden rounded-2xl border-2 border-[var(--gold)] shadow-2xl sm:block"
          >
            <img
              src={sathvikaPortrait}
              alt="Sathvika - Named after her family's passion for traditional Guntur spices"
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="s2k-glass absolute bottom-0 inset-x-0 p-3 text-center">
              <p className="font-[family-name:var(--font-button)] text-[0.55rem] tracking-widest text-[var(--gold)] uppercase">Sathvika</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:pt-16">
          <SectionHeading eyebrow="Our Origin" title="The Story Behind S2K Spices" />
          <div className="mt-10 space-y-7 text-[0.98rem] leading-[2.05] text-muted-foreground">
            {[
              "At Soil To Kitchen, we believe the best meals start in the soil.",
              "We bridge the gap between farmers and your kitchen by providing carefully hand-selected premium spices, authentic pickles and traditional snacks.",
              "Every ingredient is chosen with transparency, freshness and uncompromising quality.",
              "We ensure every grain of spice reaches your family exactly as nature intended.",
            ].map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="s2k-display mt-14 border-l border-[var(--gold)] pl-8 text-[1.7rem] text-primary italic">
              “Nothing is added. Nothing is hurried. Nothing is hidden.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const FEATURES: { title: string; body: string; art: "leaf" | "sun" | "mortar" | "drop" | "flame" | "box" | "route" | "seal" }[] = [
  { title: "Farm Direct", body: "Bought at the field, never through a mandi chain.", art: "route" },
  { title: "100% Fresh", body: "Milled in small batches, dispatched within days.", art: "leaf" },
  { title: "Authentic Recipes", body: "Family formulations kept unchanged for generations.", art: "mortar" },
  { title: "No Artificial Colours", body: "Colour comes from the chilli, not a laboratory.", art: "drop" },
  { title: "Traditional Preparation", body: "Sun-dried, stone-ground, hand-mixed.", art: "sun" },
  { title: "Premium Packaging", body: "Food-grade, aroma-sealed, presentation-ready.", art: "box" },
  { title: "Fast Delivery", body: "Pan-India dispatch with careful cold-chain handling.", art: "flame" },
  { title: "Trusted Quality", body: "Every batch inspected and signed off before sealing.", art: "seal" },
];

function Art({ kind }: { kind: string }) {
  const s = { fill: "none", stroke: "var(--gold)", strokeWidth: 0.9 } as const;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <circle cx="32" cy="32" r="26" {...s} opacity="0.35" />
      {kind === "leaf" && <path d="M20 44c0-14 10-24 24-24 0 14-10 24-24 24Zm0 0 18-18" {...s} />}
      {kind === "sun" && (
        <>
          <circle cx="32" cy="32" r="9" {...s} />
          <path d="M32 14v-5M32 55v-5M14 32H9M55 32h-5M19 19l-4-4M49 49l4 4M49 19l4-4M19 49l-4 4" {...s} />
        </>
      )}
      {kind === "mortar" && <path d="M20 30h24l-3 14H23L20 30Zm22-12L30 30" {...s} />}
      {kind === "drop" && <path d="M32 16c7 9 11 14 11 20a11 11 0 1 1-22 0c0-6 4-11 11-20Z" {...s} />}
      {kind === "flame" && <path d="M32 14c8 8 12 13 12 21a12 12 0 0 1-24 0c0-5 3-8 6-11 1 3 3 4 4 2 1-3-1-7 2-12Z" {...s} />}
      {kind === "box" && <path d="M18 24 32 18l14 6v18l-14 6-14-6V24Zm0 0 14 6 14-6M32 30v18" {...s} />}
      {kind === "route" && <path d="M18 46c8 0 8-12 14-12s6 12 14 12M20 22h6M38 22h6" {...s} />}
      {kind === "seal" && <path d="M32 16l5 4 6-1 1 6 4 5-4 5-1 6-6-1-5 4-5-4-6 1-1-6-4-5 4-5 1-6 6 1 5-4Zm-4 16 3 3 6-6" {...s} />}
    </svg>
  );
}

export function Why() {
  return (
    <section
      id="why"
      className="px-6 py-32 lg:px-14 lg:py-48"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Why S2K"
          title="Eight reasons families keep the jar refilled"
          intro="Quality is not a claim we print on a label. It is the sum of eight decisions we make before a single gram is packed."
        />
        <div className="mt-20 grid gap-px border border-border sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.07}>
              <article
                className="group h-full border border-border/60 bg-background p-10 transition-all duration-700 hover:-translate-y-2 hover:border-[color-mix(in_oklab,var(--gold)_50%,transparent)] hover:shadow-[0_50px_80px_-60px_rgba(0,0,0,0.6)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-3">
                  <Art kind={f.art} />
                </div>
                <h3 className="s2k-display mt-9 text-[1.6rem] text-primary">{f.title}</h3>
                <p className="mt-4 text-sm leading-[1.9] text-muted-foreground">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  ["Farmer", "We contract directly with growers across the Guntur belt."],
  ["Harvest", "Picked at peak ripeness, never force-dried."],
  ["Cleaning", "Winnowed and hand-sorted, stone by stone."],
  ["Traditional Processing", "Sun-drying, roasting and stone-grinding in small batches."],
  ["Quality Inspection", "Aroma, colour and moisture checked against our reference batch."],
  ["Premium Packaging", "Aroma-sealed, food-grade, tamper-evident."],
  ["Delivered To Your Kitchen", "Dispatched fresh — usually within 48 hours of packing."],
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section
      id="process"
      className="px-6 py-32 lg:px-14 lg:py-48"
      style={{ background: "var(--forest)" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="max-w-3xl">
          <p className="s2k-eyebrow !text-[var(--gold)]">Our Process</p>
          <h2 className="s2k-display mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)] text-[var(--ivory)]">
            Seven deliberate steps
          </h2>
          <div className="s2k-rule mt-10 w-28" />
        </div>

        <div ref={ref} className="relative mt-24 pl-10 lg:pl-0">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-[color-mix(in_oklab,var(--ivory)_18%,transparent)] lg:left-1/2" />
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute top-0 bottom-0 left-0 w-px bg-[var(--gold)] lg:left-1/2"
          />
          {STEPS.map(([title, body], i) => (
            <Reveal key={title} className="!overflow-visible">
              <div
                className={`relative mb-20 lg:w-1/2 ${i % 2 ? "lg:ml-auto lg:pl-20" : "lg:pr-20 lg:text-right"}`}
              >
                <span
                  className={`absolute top-3 -left-[42px] h-2 w-2 rotate-45 bg-[var(--gold)] lg:left-auto ${
                    i % 2 ? "lg:-left-1" : "lg:-right-1"
                  }`}
                />
                <p className="font-[family-name:var(--font-button)] text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="s2k-display mt-4 text-[2rem] text-[var(--ivory)]">{title}</h3>
                <p className="mt-3 text-sm leading-[1.95] text-[color-mix(in_oklab,var(--ivory)_66%,transparent)]">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1800, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Quality() {
  return (
    <section className="bg-background px-6 py-28 lg:px-14 lg:py-36">
      <dl className="mx-auto grid max-w-[1600px] gap-px border-y border-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { v: <Counter to={100} suffix="%" />, l: "Natural Ingredients" },
          { v: <Counter to={5000} suffix="+" />, l: "Happy Families" },
          { v: <Counter to={25} suffix="+" />, l: "Traditional Products" },
          { v: <span>Farm Direct</span>, l: "Zero Middlemen" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <div className="border-r border-border/60 px-8 py-16 text-center last:border-r-0">
              <dd className="s2k-display text-[clamp(2.6rem,5vw,4.2rem)] text-primary">{s.v}</dd>
              <dt className="s2k-eyebrow mt-5">{s.l}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}