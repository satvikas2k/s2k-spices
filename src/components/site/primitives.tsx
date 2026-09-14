import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/** Magnetic, sharp-cornered luxury button. */
export function MagneticButton({
  children,
  href,
  solid,
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  solid?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.32,
    });
  };

  const style = { transform: `translate3d(${t.x}px, ${t.y}px, 0)` };
  const classes = cn("s2k-btn", solid && "s2k-btn-solid", className);

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onMouseMove={move}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
    >
      {children}
    </button>
  );
}

/** Scroll reveal with mask-style rise. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: 46, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Word-by-word mask reveal for display headings. */
export function MaskText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p className="s2k-eyebrow">{eyebrow}</p>
      </Reveal>
      <h2 className="s2k-display mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)] text-primary">
        <MaskText text={title} />
      </h2>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-[0.98rem] leading-[1.95] text-muted-foreground">
            {intro}
          </p>
        </Reveal>
      ) : null}
      <div className={cn("s2k-rule mt-10 w-28", align === "center" && "mx-auto")} />
    </div>
  );
}

import logoImg from "@/assets/logo.png";

/** Sathvika's S2K Spices logo — circular crop showing only the green badge. */
export function Logo({
  className,
  compact,
}: {
  className?: string;
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden shrink-0 shadow-lg transition-all duration-500",
          compact
            ? "h-12 w-12"
            : "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        )}
      >
        <img
          src={logoImg}
          alt="Sathvika's S2K Spices"
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 48%", transform: "scale(1.18)" }}
        />
      </div>
    </span>
  );
}
