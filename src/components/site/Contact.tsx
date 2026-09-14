import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { CONTACT } from "@/lib/catalog";
import { Logo, MagneticButton, Reveal, SectionHeading } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

const FIELDS = [
  { id: "name", label: "Full Name", type: "text" },
  { id: "phone", label: "Phone (optional)", type: "tel" },
] as const;

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const { name, phone, message } = parsed.data;
    let text = `*ENQUIRY - S2K SPICES* 🌶️\n`;
    text += `----------------------------------------\n`;
    text += `👤 *Name:* ${name}\n`;
    if (phone) text += `📱 *Phone:* ${phone}\n`;
    text += `📝 *Message:* ${message}\n`;
    text += `----------------------------------------\n`;
    text += `Please get back to me. Thank you!`;
    const waUrl = `https://wa.me/91${CONTACT.phone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    toast.success("Redirecting to WhatsApp", {
      description: "Send the auto-filled message on WhatsApp to reach us directly!",
    });
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="bg-background px-6 py-32 lg:px-14 lg:py-48">
      <div className="mx-auto grid max-w-[1600px] gap-24 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Speak to the family behind the jars"
            intro="Retail orders, bulk supply, gifting hampers or distribution enquiries — we answer every message ourselves."
          />

          <dl className="mt-14 space-y-10">
            {[
              ["Phone", CONTACT.phone, `tel:${CONTACT.phone}`],
              ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
              ["GST Number (GSTIN)", CONTACT.gst, null],
              ["Address", CONTACT.address, null],
            ].map(([label, value, href]) => (
              <Reveal key={label as string}>
                <div className="border-b border-border pb-8">
                  <div className="flex items-center gap-2">
                    <dt className="s2k-eyebrow">{label}</dt>
                    {label === "GST Number (GSTIN)" && (
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[0.62rem] font-semibold text-emerald-600 dark:text-emerald-400">
                        Verified Business
                      </span>
                    )}
                  </div>
                  <dd className="s2k-display mt-4 text-[1.5rem] text-primary">
                    {href ? (
                      <a href={href as string} className="hover:text-[var(--olive)]">
                        {value}
                      </a>
                    ) : label === "GST Number (GSTIN)" ? (
                      <span className="font-mono tracking-wider font-semibold text-[1.3rem] text-primary">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-12 h-72 overflow-hidden border border-border">
            <iframe
              title="S2K Spices location in Nutakki, Mangalagiri"
              src="https://www.google.com/maps?q=Nutakki,+Mangalagiri,+Guntur+District+522303&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              style={{ filter: "grayscale(1) contrast(0.9)" }}
            />
          </div>
        </div>

        <Reveal className="!overflow-visible">
          <form onSubmit={submit} noValidate className="s2k-glass p-10 lg:p-16">
            <p className="s2k-eyebrow">Enquiry</p>
            <h3 className="s2k-display mt-5 text-[2.4rem] text-primary">Write to us</h3>

            <div className="mt-12 space-y-10">
              {FIELDS.map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="font-[family-name:var(--font-button)] text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    maxLength={255}
                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-[0.95rem] text-foreground outline-none transition-colors focus:border-[var(--gold)]"
                  />
                  {errors[f.id] && (
                    <p className="mt-2 text-xs text-destructive">{errors[f.id]}</p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-[family-name:var(--font-button)] text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-[0.95rem] text-foreground outline-none transition-colors focus:border-[var(--gold)]"
                />
                {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>

            <div className="mt-14">
              <button type="submit" className="s2k-btn s2k-btn-solid w-full">
                Send via WhatsApp
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-14" style={{ background: "var(--forest)" }}>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="s2k-float pointer-events-none absolute -right-10 -bottom-10 h-80 w-80 opacity-20"
      >
        <path
          d="M40 160C40 90 90 40 160 40c0 70-50 120-120 120Zm0 0 90-90"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
        />
        <path
          d="M100 100c-14-8-26-10-40-10M118 82c14 8 26 10 40 10"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-16 lg:grid-cols-4">
          <div>
            <Logo invert />
            <p className="mt-8 max-w-xs text-sm leading-[1.95] text-[color-mix(in_oklab,var(--ivory)_60%,transparent)]">
              Premium spices, pickles and traditional snacks, carried from trusted Guntur farms
              straight to your kitchen.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] px-3 py-1.5 text-xs text-[var(--gold)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              <span className="font-mono font-semibold tracking-wider">GSTIN: {CONTACT.gst}</span>
            </div>
          </div>

          <nav aria-label="Quick links">
            <p className="s2k-eyebrow !text-[var(--gold)]">Quick Links</p>
            <ul className="mt-8 space-y-4">
              {[
                ["Products", "#products"],
                ["About", "#about"],
                ["Process", "#process"],
                ["Gallery", "#gallery"],
                ["Contact", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    className="text-sm text-[color-mix(in_oklab,var(--ivory)_72%,transparent)] transition-colors hover:text-[var(--gold)]"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="s2k-eyebrow !text-[var(--gold)]">Social</p>
            <ul className="mt-8 space-y-4">
              {[
                ["Instagram", CONTACT.instagram],
                ["YouTube", CONTACT.youtube],
                ["Facebook", CONTACT.facebook],
                ["WhatsApp", `https://wa.me/91${CONTACT.phone}`],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[color-mix(in_oklab,var(--ivory)_72%,transparent)] transition-colors hover:text-[var(--gold)]"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="s2k-eyebrow !text-[var(--gold)]">Newsletter</p>
            <p className="mt-8 text-sm leading-[1.9] text-[color-mix(in_oklab,var(--ivory)_62%,transparent)]">
              Seasonal batches and harvest notes, a few times a year.
            </p>
            <div className="mt-8 flex items-center gap-3 border-b border-[color-mix(in_oklab,var(--ivory)_28%,transparent)] pb-3">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                maxLength={255}
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm text-[var(--ivory)] outline-none placeholder:text-[color-mix(in_oklab,var(--ivory)_40%,transparent)]"
              />
            </div>
            <MagneticButton
              className="mt-8 !border-[color-mix(in_oklab,var(--gold)_70%,transparent)] !text-[var(--ivory)]"
              onClick={() => toast.success("Subscribed", { description: "Thank you for joining us." })}
            >
              Subscribe
            </MagneticButton>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-[color-mix(in_oklab,var(--ivory)_16%,transparent)] pt-8 text-[0.7rem] tracking-wider text-[color-mix(in_oklab,var(--ivory)_52%,transparent)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} S2K Spices. All rights reserved.</p>
            <p className="mt-1 text-[color-mix(in_oklab,var(--ivory)_65%,transparent)] font-mono text-[0.68rem] tracking-wider">
              Registered GSTIN: <span className="text-[var(--gold)] font-semibold">{CONTACT.gst}</span> • Andhra Pradesh, India
            </p>
          </div>
          <p className="flex gap-8">
            <a href="#contact" className="hover:text-[var(--gold)]">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-[var(--gold)]">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}