import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import jarPickle from "@/assets/jar-pickle.jpg";
import jarSpice from "@/assets/jar-spice.jpg";
import snacksImg from "@/assets/snacks.jpg";
import spicesImg from "@/assets/spices.jpg";
import farmerHandsImg from "@/assets/farmer-hands.jpg";
import heroFarmImg from "@/assets/hero-farm.jpg";
import avakayaImg from "@/assets/product-avakaya.jpg";
import tomatoImg from "@/assets/product-tomato.jpg";
import gonguraImg from "@/assets/product-gongura.jpg";
import gingerImg from "@/assets/product-ginger.jpg";
import amlaImg from "@/assets/product-amla.jpg";
import chekkaluImg from "@/assets/snack-chekkalu.png";
import chakraluImg from "@/assets/snack-chakralu.png";
import boondiImg from "@/assets/snack-boondi.png";
import gavvaluImg from "@/assets/snack-gavvalu.png";
import kajjikayaluImg from "@/assets/snack-kajjikayalu.png";
import ariseluImg from "@/assets/snack-ariselu.png";
import lemonPickleImg from "@/assets/lemon-pickle.png";
import cauliflowerImg from "@/assets/cauliflower.png";
import kakarakayaPickleImg from "@/assets/kakarakaya-pickle.png";
import masalaKaramImg from "@/assets/masala-karam.png";
import redChilliImg from "@/assets/red-chilli.png";
import nallaKaramImg from "@/assets/nalla-karam.png";
import karivepakuKaramImg from "@/assets/karivepaku-karam.png";
import munagakuKaramImg from "@/assets/munagaku-karam.png";
import kakarakayaKaramImg from "@/assets/kakarakaya-karam.png";
import turmericImg from "@/assets/turmeric-powder.png";
import dhaniyaImg from "@/assets/dhaniya-powder.png";
import logoImg from "@/assets/logo.png";

import { latestKgPrices, products, type Product } from "@/lib/catalog";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";
import { useCart } from "@/lib/cart";

const CATEGORIES = ["All", "Pickles", "Spices", "Snacks"] as const;

const imageMap: Record<string, string> = {
  avakaya: avakayaImg,
  tomato: tomatoImg,
  gongura: gonguraImg,
  ginger: gingerImg,
  amla: amlaImg,
  lemon: lemonPickleImg,
  cauliflower: cauliflowerImg,
  "kakarakaya-pickle": kakarakayaPickleImg,
  "masala-karam": masalaKaramImg,
  "red-chilli": redChilliImg,
  "nalla-karam": nallaKaramImg,
  "karivepaku-karam": karivepakuKaramImg,
  "munagaku-karam": munagakuKaramImg,
  "kakarakaya-karam": kakarakayaKaramImg,
  turmeric: turmericImg,
  dhaniya: dhaniyaImg,
  "ghee-ariselu": ariseluImg,
  chekkalu: chekkaluImg,
  chakralu: chakraluImg,
  boondi: boondiImg,
  "bellam-gavvalu": gavvaluImg,
  kajjikayalu: kajjikayaluImg,
};

const imageFor = (p: Product) =>
  imageMap[p.image] || (p.category === "Pickles" ? jarPickle : p.category === "Spices" ? jarSpice : snacksImg);

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [size, setSize] = useState(0);
  const [saved, setSaved] = useState(false);
  const active = product.sizes[size];
  const { addItem, setIsOpen } = useCart();

  return (
    <Reveal delay={(index % 3) * 0.08} className="!overflow-visible">
      <article className="s2k-card group flex h-full flex-col">
        <div className="relative overflow-hidden">
          <img
            src={imageFor(product)}
            alt={`${product.name} from S2K Spices`}
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
          <span className="s2k-glass absolute top-5 left-5 px-4 py-2 font-[family-name:var(--font-button)] text-[0.55rem] tracking-[0.32em] text-primary uppercase">
            {product.category}
          </span>
          {/* Brand Logo Badge Overlay */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--gold)_50%,transparent)] bg-[color-mix(in_oklab,var(--forest)_90%,transparent)] px-3 py-1.5 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
            <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[var(--gold)]">
              <img
                src={logoImg}
                alt="S2K Logo"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 48%", transform: "scale(1.18)" }}
              />
            </div>
            <span className="font-[family-name:var(--font-button)] text-[0.58rem] font-bold tracking-widest text-[var(--gold)] uppercase">
              Sathvika's S2K
            </span>
          </div>
          <button
            type="button"
            aria-label={`${saved ? "Remove" : "Add"} ${product.name} ${saved ? "from" : "to"} wishlist`}
            aria-pressed={saved}
            onClick={() => {
              setSaved((v) => !v);
              toast(saved ? "Removed from wishlist" : "Saved to wishlist", {
                description: product.name,
              });
            }}
            className="s2k-glass absolute top-5 right-5 flex h-10 w-10 items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill={saved ? "var(--gold)" : "none"}
              stroke="currentColor"
            >
              <path
                strokeWidth="1.3"
                d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1Z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-9">
          <h3 className="s2k-display text-[1.85rem] text-primary">{product.name}</h3>
          <p className="mt-3 text-sm leading-[1.9] text-muted-foreground">{product.desc}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSize(i)}
                aria-pressed={i === size}
                className="border px-4 py-2 font-[family-name:var(--font-button)] text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-400"
                style={
                  i === size
                    ? {
                        borderColor: "var(--forest)",
                        background: "var(--forest)",
                        color: "var(--ivory)",
                      }
                    : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between pt-9">
            <p className="s2k-display text-[2.1rem] text-primary">
              ₹{active.price}
              <span className="ml-2 font-[family-name:var(--font-sans)] text-[0.7rem] tracking-widest text-muted-foreground">
                / {active.label}
              </span>
            </p>
          </div>

          <div className="mt-7 flex gap-3">
            <MagneticButton
              className="w-full"
              onClick={() => {
                addItem(product, size);
                toast.success("Added to cart", {
                  description: `${product.name} (${active.label}) — ₹${active.price}`,
                  action: {
                    label: "View Cart",
                    onClick: () => setIsOpen(true),
                  },
                });
              }}
            >
              Add to Cart
            </MagneticButton>
            <button
              type="button"
              onClick={() => {
                addItem(product, size);
                setIsOpen(true);
              }}
              className="flex items-center justify-center rounded-none border border-[var(--forest)] bg-[var(--forest)] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] transition-all hover:bg-[var(--gold)] hover:text-foreground"
            >
              Buy Now
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Products() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!terms.length) return true;
      const hay = `${p.name} ${p.desc} ${p.category}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [cat, q]);

  return (
    <section id="products" className="bg-background px-6 py-32 lg:px-14 lg:py-48">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="The Collection"
          title="Pickles, spices and traditional snacks"
          intro="Twenty-two products, each made the way it has always been made — and packed the way a gift should be."
        />

        <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className="border px-6 py-3 font-[family-name:var(--font-button)] text-[0.62rem] font-semibold tracking-[0.24em] uppercase transition-all duration-500"
                style={
                  cat === c
                    ? { borderColor: "var(--gold)", background: "var(--forest)", color: "var(--ivory)" }
                    : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {c}
              </button>
            ))}
          </div>

          <label className="s2k-glass flex w-full items-center gap-3 px-5 py-3.5 lg:w-96">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="var(--olive)">
              <circle cx="11" cy="11" r="7" strokeWidth="1.3" />
              <path d="m20 20-3.5-3.5" strokeWidth="1.3" />
            </svg>
            <span className="sr-only">Search products</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 60))}
              placeholder="Search — try “mango”, “podi”, “sweet”"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            />
          </label>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="s2k-display mt-20 text-center text-[1.6rem] text-muted-foreground">
            Nothing matched that search.
          </p>
        )}

        <div className="mt-32 border-t border-border pt-20">
          <SectionHeading eyebrow="Price List" title="Latest bulk rates, per kilogram" />
          <ul className="mt-14 grid gap-x-16 gap-y-0 md:grid-cols-2 xl:grid-cols-3">
            {latestKgPrices.map((row, i) => (
              <li key={row.name}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-5"
                >
                  <span className="text-sm text-foreground">{row.name}</span>
                  <span className="s2k-display text-[1.35rem] text-primary">₹{row.price}/kg</span>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}