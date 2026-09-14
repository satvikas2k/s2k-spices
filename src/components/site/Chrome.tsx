import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./primitives";
import { CONTACT } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import sathvikaPortrait from "@/assets/sathvika-portrait.png";

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Products", "#products"],
  ["Why S2K", "#why"],
  ["Process", "#process"],
  ["Testimonials", "#testimonials"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
] as const;

export function Cursor() {
  const [p, setP] = useState({ x: -100, y: -100 });
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      setP({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHot(!!t.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{ border: "1px solid var(--gold)" }}
        animate={{
          x: p.x - (hot ? 24 : 14),
          y: p.y - (hot ? 24 : 14),
          width: hot ? 48 : 28,
          height: hot ? 48 : 28,
          opacity: hot ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--forest)" }}
        animate={{ x: p.x - 3, y: p.y - 3 }}
        transition={{ type: "spring", stiffness: 900, damping: 40 }}
      />
    </div>
  );
}

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1650);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-primary"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center px-4">
            {/* Sathvika Girl Portrait Badge */}
            <motion.div
              className="mx-auto mb-5 h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden border-2 border-[var(--gold)] shadow-[0_0_35px_rgba(212,175,55,0.45)]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={sathvikaPortrait}
                alt="Sathvika - S2K Spices"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
            </motion.div>

            <motion.p
              className="s2k-eyebrow mb-2 !text-[var(--gold)] tracking-[0.38em] text-xs sm:text-sm font-semibold uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Sathvika's
            </motion.p>
            <motion.p
              className="s2k-display text-[clamp(2.5rem,7vw,5rem)] tracking-[0.3em] text-primary-foreground"
              initial={{ opacity: 0, letterSpacing: "0.7em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              S2K
            </motion.p>
            <motion.div
              className="mx-auto mt-5 h-px w-56"
              style={{ background: "var(--gold)", transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="s2k-eyebrow mt-5 !text-[var(--gold)] tracking-[0.28em] uppercase">Sathvika's Soil to Kitchen</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartButton() {
  const { totalItemsCount, setIsOpen } = useCart();
  return (
    <button
      type="button"
      aria-label={`Open cart — ${totalItemsCount} items`}
      onClick={() => setIsOpen(true)}
      className="relative flex h-10 w-10 items-center justify-center border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
        <path strokeWidth="1.4" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalItemsCount > 0 && (
        <motion.span
          key={totalItemsCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[0.6rem] font-bold text-primary-foreground"
        >
          {totalItemsCount > 9 ? "9+" : totalItemsCount}
        </motion.span>
      )}
    </button>
  );
}

const ANNOUNCEMENTS = [
  {
    icon: "🚚",
    text: "BILL ABOVE ₹500 GET FREE SHIPPING",
    href: "#products",
  },
  {
    icon: "✨",
    text: "BILL ABOVE 1000 GET FLAT 10% OFFER",
    href: "#products",
  },
];

/** Top Announcement Banner across the header with interactive chevron navigators. */
export function TopAnnouncementBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  const next = () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);

  const current = ANNOUNCEMENTS[index];

  return (
    <div
      className="relative z-50 w-full border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[#17110d] text-[var(--ivory)] shadow-sm"
      style={{
        background: "linear-gradient(90deg, #140e0a 0%, #201712 50%, #140e0a 100%)",
      }}
    >
      <div className="mx-auto flex h-8 sm:h-9 max-w-[1600px] items-center justify-between px-3 sm:px-8">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous announcement"
          className="flex h-7 w-7 items-center justify-center text-[var(--ivory)]/60 transition-colors hover:text-[var(--gold)]"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
            <path strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Center Animated Announcement Text */}
        <div className="flex-1 overflow-hidden px-2 text-center">
          <AnimatePresence mode="wait">
            <motion.a
              key={index}
              href={current.href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center gap-2 font-[family-name:var(--font-button)] text-[0.62rem] sm:text-[0.68rem] md:text-[0.72rem] font-medium tracking-[0.2em] sm:tracking-[0.24em] text-[color-mix(in_oklab,var(--ivory)_92%,transparent)] hover:text-[var(--gold)] transition-colors uppercase"
            >
              <span className="text-xs">{current.icon}</span>
              <span>{current.text}</span>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next announcement"
          className="flex h-7 w-7 items-center justify-center text-[var(--ivory)]/60 transition-colors hover:text-[var(--gold)]"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
            <path strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
      style={{
        background: solid ? "color-mix(in oklab, var(--ivory) 82%, transparent)" : "transparent",
        backdropFilter: solid ? "blur(24px) saturate(160%)" : "none",
        borderBottom: solid
          ? "1px solid color-mix(in oklab, var(--gold) 26%, transparent)"
          : "1px solid transparent",
      }}
    >
      {/* Top announcement banner like user reference */}
      <TopAnnouncementBanner />

      <nav
        className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-14"
        aria-label="Primary"
      >
        <a href="#home" aria-label="S2K Spices home">
          <Logo compact={solid} />
        </a>

        <ul className="hidden items-center gap-4 xl:flex 2xl:gap-8">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="relative font-[family-name:var(--font-button)] whitespace-nowrap text-[0.6rem] font-semibold tracking-[0.14em] 2xl:text-[0.68rem] 2xl:tracking-[0.22em] text-foreground/75 uppercase transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[var(--gold)] after:transition-transform after:duration-500 hover:text-primary hover:after:origin-left hover:after:scale-x-100"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a href={`tel:${CONTACT.phone}`} className="s2k-btn !px-4 !py-2.5 2xl:!px-5 2xl:!py-3 !text-[0.6rem] whitespace-nowrap">
            Call
          </a>
          <CartButton />
          <a href="#products" className="s2k-btn s2k-btn-solid !px-4 !py-2.5 2xl:!px-5 2xl:!py-3 !text-[0.6rem] whitespace-nowrap">
            Order Now
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden shrink-0">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            <span className="block h-px w-5 bg-primary" />
            <span className="block h-px w-5 bg-primary" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="s2k-glass overflow-hidden xl:hidden"
          >
            {/* Mobile Offers & GST Badge */}
            <div className="mx-6 mt-6 rounded-xl border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] p-4 shadow-sm">
              <div className="flex items-center gap-2 text-[0.65rem] font-bold tracking-widest text-[var(--gold)] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <span>Special Offers</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-xs text-foreground">
                <p className="flex items-center gap-2 font-medium">
                  <span>🚚</span>
                  <span><strong>Bill above ₹500:</strong> Get free shipping</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <span>✨</span>
                  <span><strong>Bill above 1000:</strong> Get flat 10% offer</span>
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[0.65rem] text-muted-foreground">
                <span className="font-mono font-semibold text-foreground/85">GSTIN: {CONTACT.gst}</span>
                <span className="text-[var(--gold)] font-medium">100% Authentic</span>
              </div>
            </div>

            <ul className="flex flex-col px-8 py-6">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-4 font-[family-name:var(--font-button)] text-[0.72rem] font-semibold tracking-[0.24em] text-primary uppercase"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="s2k-glass flex h-12 w-12 items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
              <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="1.4" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`tel:${CONTACT.phone}`}
        aria-label="Call S2K Spices"
        className="s2k-glass flex h-12 w-12 items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.4"
            d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
          />
        </svg>
      </a>

      <a
        href={`https://wa.me/91${CONTACT.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center border border-[color-mix(in_oklab,var(--gold)_60%,transparent)] bg-primary text-primary-foreground shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11.4 11.4 0 0 1-4.4-4c-.3-.5-.8-1.3-.8-2.4s.6-1.7.8-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4-.3.3c-.1.1-.2.3 0 .5a8 8 0 0 0 3.6 3.1c.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3v1.1Z" />
        </svg>
      </a>
    </div>
  );
}