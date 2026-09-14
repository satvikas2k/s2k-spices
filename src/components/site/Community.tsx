import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import heroFarm from "@/assets/hero-farm.jpg";
import farmerHands from "@/assets/farmer-hands.jpg";
import spices from "@/assets/spices.jpg";
import jarPickle from "@/assets/jar-pickle.jpg";
import jarSpice from "@/assets/jar-spice.jpg";
import snacksImg from "@/assets/snacks.jpg";
import avakayaImg from "@/assets/product-avakaya.jpg";
import tomatoImg from "@/assets/product-tomato.jpg";
import gonguraImg from "@/assets/product-gongura.jpg";
import chekkaluImg from "@/assets/snack-chekkalu.png";
import ariseluImg from "@/assets/snack-ariselu.png";
import turmericImg from "@/assets/turmeric-powder.png";
import sathvikaPortrait from "@/assets/sathvika-portrait.png";

import { CONTACT } from "@/lib/catalog";
import { Reveal, SectionHeading } from "./primitives";

const QUOTES = [
  {
    q: "The avakaya tastes exactly like my grandmother's. I have not bought pickle from a shop since.",
    n: "Lakshmi Prasad",
    r: "Hyderabad",
    img: avakayaImg,
  },
  {
    q: "You can smell the difference the moment the seal breaks. The turmeric is a completely different product.",
    n: "Arun Vardhan",
    r: "Bengaluru",
    img: turmericImg,
  },
  {
    q: "We send S2K hampers to our clients every Sankranti. The packaging alone earns us compliments.",
    n: "Meera Reddy",
    r: "Vijayawada",
    img: chekkaluImg,
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = QUOTES[i];

  return (
    <section
      id="testimonials"
      className="px-6 py-32 lg:px-14 lg:py-48"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading eyebrow="Testimonials" title="What our families say" />

        <div className="s2k-glass mt-20 grid gap-14 p-10 lg:grid-cols-[1fr_320px] lg:p-20">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="s2k-display text-[clamp(1.7rem,3.6vw,3.1rem)] text-primary">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-12">
                <p className="font-[family-name:var(--font-button)] text-[0.68rem] font-semibold tracking-[0.28em] text-foreground uppercase">
                  {t.n}
                </p>
                <p className="s2k-eyebrow mt-3">{t.r}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="flex flex-row gap-4 lg:flex-col">
            {QUOTES.map((qq, idx) => (
              <button
                key={qq.n}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial from ${qq.n}`}
                aria-pressed={idx === i}
                className="relative flex-1 overflow-hidden border transition-all duration-700"
                style={{
                  borderColor: idx === i ? "var(--gold)" : "transparent",
                  opacity: idx === i ? 1 : 0.45,
                }}
              >
                <img
                  src={qq.img}
                  alt={qq.n}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="h-24 w-full object-cover lg:h-28"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: heroFarm, alt: "Organic chilli farm at sunrise", span: "lg:col-span-2 lg:row-span-2" },
  { src: avakayaImg, alt: "Authentic Guntur Avakaya Mango Pickle", span: "" },
  { src: sathvikaPortrait, alt: "Sathvika at the family chilli farm", span: "" },
  { src: chekkaluImg, alt: "Crispy traditional Chekkalu rice crackers", span: "lg:col-span-2" },
  { src: turmericImg, alt: "Pure stone-ground golden turmeric powder", span: "" },
  { src: gonguraImg, alt: "Andhra Gongura Sorrel Leaves Pickle", span: "" },
  { src: ariseluImg, alt: "Fresh Ghee Ariselu sweet delicacies", span: "" },
  { src: farmerHands, alt: "Farmer handpicking fresh red Guntur chillies", span: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-background px-6 py-32 lg:px-14 lg:py-48">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading eyebrow="Gallery" title="Fields, kitchens and finished jars" />
        <div className="mt-20 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.alt} delay={(i % 4) * 0.06} className={`!overflow-hidden ${g.span}`}>
              <div className="group h-full w-full overflow-hidden">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Social() {
  return (
    <section
      className="px-6 py-32 lg:px-14 lg:py-48"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Follow the harvest"
          title="S2K in motion"
          intro="Field visits, grinding days and kitchen films — published across our channels."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          <Reveal className="!overflow-visible">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="s2k-card block h-full p-10"
            >
              <p className="s2k-eyebrow">Instagram</p>
              <h3 className="s2k-display mt-5 text-[1.9rem] text-primary">@s2kspices</h3>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[heroFarm, avakayaImg, sathvikaPortrait, chekkaluImg, farmerHands, turmericImg].map((s, i) => (
                  <img
                    key={i}
                    src={s}
                    alt="S2K Spices gallery shot"
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-opacity duration-500 hover:opacity-80"
                  />
                ))}
              </div>
              <p className="mt-8 font-[family-name:var(--font-button)] text-[0.62rem] tracking-[0.26em] text-primary uppercase">
                View profile →
              </p>
            </a>
          </Reveal>

          <Reveal delay={0.08} className="!overflow-visible">
            <div className="s2k-card flex h-full flex-col p-10">
              <p className="s2k-eyebrow">YouTube</p>
              <h3 className="s2k-display mt-5 text-[1.9rem] text-primary">@S2KSpices</h3>
              <div className="mt-8 aspect-video w-full overflow-hidden border border-border">
                <iframe
                  title="S2K Spices on YouTube"
                  src="https://www.youtube.com/embed?listType=user_uploads&list=S2KSpices"
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 font-[family-name:var(--font-button)] text-[0.62rem] tracking-[0.26em] text-primary uppercase"
              >
                Watch the channel →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="!overflow-visible">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="s2k-card flex h-full flex-col p-10"
            >
              <p className="s2k-eyebrow">Facebook</p>
              <h3 className="s2k-display mt-5 text-[1.9rem] text-primary">S2K Spices Page</h3>
              <div className="mt-8 flex-1 overflow-hidden border border-border">
                <img
                  src={farmerHands}
                  alt="S2K Spices Facebook page cover"
                  loading="lazy"
                  className="h-full min-h-[220px] w-full object-cover"
                />
              </div>
              <p className="mt-6 text-sm leading-[1.9] text-muted-foreground">
                Community updates, seasonal batches and customer stories.
              </p>
              <p className="mt-6 font-[family-name:var(--font-button)] text-[0.62rem] tracking-[0.26em] text-primary uppercase">
                Open page →
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}