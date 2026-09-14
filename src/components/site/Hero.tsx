import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import heroFarm from "@/assets/hero-farm.jpg";
import sathvikaPortrait from "@/assets/sathvika-portrait.png";
import avakayaImg from "@/assets/product-avakaya.jpg";
import chekkaluImg from "@/assets/snack-chekkalu.png";
import turmericImg from "@/assets/turmeric-powder.png";
import ariseluImg from "@/assets/snack-ariselu.png";
import gonguraImg from "@/assets/product-gongura.jpg";
import masalaKaramImg from "@/assets/masala-karam.png";
import { MagneticButton } from "./primitives";

const STATS = ["100% Natural", "Farm Fresh", "No Artificial Colours", "Premium Packaging"];

const ROTATING_FEATURED_PRODUCTS = [
  { name: "Avakaya Mango Pickle", tag: "Pickles", image: avakayaImg, price: "₹170" },
  { name: "Chekkalu Crackers", tag: "Snacks", image: chekkaluImg, price: "₹450" },
  { name: "Turmeric Powder", tag: "Spices", image: turmericImg, price: "₹90" },
  { name: "Ghee Ariselu Sweets", tag: "Snacks", image: ariseluImg, price: "₹600" },
  { name: "Gongura Leaves Pickle", tag: "Pickles", image: gonguraImg, price: "₹150" },
  { name: "Guntur Masala Karam", tag: "Spices", image: masalaKaramImg, price: "₹140" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [productIdx, setProductIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProductIdx((prev) => (prev + 1) % ROTATING_FEATURED_PRODUCTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.img
          src={heroFarm}
          alt="Sunrise over an organic chilli and turmeric farm"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover"
          initial={{ scale: 1.16 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--charcoal) 42%, transparent) 0%, color-mix(in oklab, var(--charcoal) 15%, transparent) 40%, color-mix(in oklab, var(--forest) 55%, transparent) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pt-36 pb-14 lg:px-14 lg:pt-44"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Headline & Call To Actions */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* Sathvika's Brand Location Tag */}
              <div className="inline-flex items-center gap-3 rounded-full border border-[color-mix(in_oklab,var(--gold)_55%,transparent)] bg-[color-mix(in_oklab,var(--forest)_85%,transparent)] px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md shadow-lg">
                <div className="h-9 w-9 sm:h-11 sm:w-11 overflow-hidden rounded-full border-2 border-[var(--gold)] shrink-0 shadow-md">
                  <img
                    src={sathvikaPortrait}
                    alt="Sathvika"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
                <span className="s2k-eyebrow !text-[var(--gold)] !text-[0.78rem] sm:!text-[0.88rem] tracking-[0.2em] uppercase font-bold">
                  Guntur, AP
                </span>
              </div>

              {/* Auto-Rotating Product Spotlight Pill */}
              <a
                href="#products"
                className="group inline-flex items-center gap-3.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_60%,transparent)] bg-[color-mix(in_oklab,var(--charcoal)_80%,transparent)] px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 hover:border-[var(--gold)]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ROTATING_FEATURED_PRODUCTS[productIdx].name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-9 w-9 sm:h-11 sm:w-11 overflow-hidden rounded-full border-2 border-[var(--gold)] shrink-0 shadow-md">
                      <img
                        src={ROTATING_FEATURED_PRODUCTS[productIdx].image}
                        alt={ROTATING_FEATURED_PRODUCTS[productIdx].name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex items-center gap-2.5 text-left">
                      <span className="text-[0.8rem] sm:text-[0.92rem] font-bold tracking-wide text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                        {ROTATING_FEATURED_PRODUCTS[productIdx].name}
                      </span>
                      <span className="rounded-full bg-[var(--gold)]/25 px-2.5 py-0.5 text-[0.7rem] sm:text-[0.78rem] font-bold tracking-wider text-[var(--gold)] uppercase shadow-inner">
                        {ROTATING_FEATURED_PRODUCTS[productIdx].price}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-[var(--gold)] font-bold group-hover:translate-x-1.5 transition-transform">→</span>
                  </motion.div>
                </AnimatePresence>
              </a>
            </motion.div>

            <h1 className="s2k-display mt-6 text-[clamp(2.8rem,7.5vw,7rem)] leading-[1.05] text-[var(--ivory)]">
              {["From Soil", "To Kitchen"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7 + i * 0.14, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-xl text-[0.98rem] leading-[2] text-[color-mix(in_oklab,var(--ivory)_90%,transparent)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1.1 }}
            >
              Handpicked premium spices, pickles and traditional snacks sourced directly from trusted
              Guntur farmers and delivered fresh to your kitchen.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1.1 }}
            >
              <MagneticButton href="#products">Explore Products</MagneticButton>
              <MagneticButton href="#contact" solid>
                Order Now
              </MagneticButton>
            </motion.div>
          </div>

          {/* Child Portrait Feature with localized curved gradient aura strictly around this part */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end xl:col-span-5">
            {/* Curved Gradient Layer - localized strictly behind the child image */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-[3.5rem] opacity-90 blur-2xl transition-all duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, color-mix(in oklab, var(--forest) 85%, transparent) 0%, color-mix(in oklab, var(--gold) 45%, transparent) 55%, transparent 75%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Outer Curved Golden Frame Accent */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[var(--gold)] via-amber-400/60 to-[var(--forest)] blur-md opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />

              {/* Clean Framed Card Container */}
              <div className="relative overflow-hidden rounded-[2.2rem] border-2 border-[var(--gold)] bg-[color-mix(in_oklab,var(--forest)_80%,transparent)] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <img
                    src={sathvikaPortrait}
                    alt="Sathvika - S2K Spices"
                    className="h-[340px] w-[280px] object-cover sm:h-[440px] sm:w-[360px] lg:h-[470px] lg:w-[380px] transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[color-mix(in_oklab,var(--forest)_90%,transparent)] p-3 border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] backdrop-blur-md text-center shadow-lg">
                    <p className="font-[family-name:var(--font-button)] text-[0.68rem] font-bold tracking-widest text-[var(--gold)] uppercase">
                      Sathvika
                    </p>
                    <p className="text-[0.62rem] text-[var(--ivory)] tracking-wider opacity-90 mt-0.5">
                      The Inspiration Behind S2K Spices
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.dl
          className="mt-16 grid grid-cols-2 gap-px border-t border-[color-mix(in_oklab,var(--gold)_35%,transparent)] pt-px lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s}
              className="py-6"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <dt className="font-[family-name:var(--font-button)] text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
                {String(i + 1).padStart(2, "0")}
              </dt>
              <dd className="s2k-display mt-2 text-[1.45rem] lg:text-[1.65rem] text-[var(--ivory)]">{s}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}