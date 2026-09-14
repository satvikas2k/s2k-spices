import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { CONTACT } from "@/lib/catalog";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    discount,
    finalPrice,
    isFreeShipping,
    totalItemsCount,
    isOpen,
    setIsOpen,
    checkoutWhatsApp,
  } = useCart();

  const [step, setStep] = useState<"cart" | "address">("cart");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid 10-digit Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.pincode.trim() || formData.pincode.length < 6)
      newErrors.pincode = "Valid 6-digit Pincode is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    checkoutWhatsApp(formData);
    toast.success("Redirecting to WhatsApp", {
      description: "Send the auto-filled order message on WhatsApp to complete your order!",
    });
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[160] flex h-full w-full max-w-lg flex-col bg-background shadow-2xl border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-card">
              <div className="flex items-center gap-3">
                <h2 className="s2k-display text-2xl text-primary">Your Order Cart</h2>
                {totalItemsCount > 0 && (
                  <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    {totalItemsCount}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
                  <path strokeWidth="1.5" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Tabs */}
            {items.length > 0 && (
              <div className="flex border-b border-border bg-muted/40">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    step === "cart"
                      ? "border-b-2 border-[var(--gold)] bg-background text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  1. Cart Items ({items.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    step === "address"
                      ? "border-b-2 border-[var(--gold)] bg-background text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  2. Delivery Address
                </button>
              </div>
            )}

            {/* Offer Progress Tracker Banner */}
            {items.length > 0 && (
              <div className="border-b border-border/80 bg-gradient-to-r from-[color-mix(in_oklab,var(--gold)_12%,transparent)] via-[color-mix(in_oklab,var(--forest)_8%,transparent)] to-[color-mix(in_oklab,var(--gold)_12%,transparent)] px-6 py-3">
                {totalPrice < 500 ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        🚚 Add <strong className="text-[var(--gold)] font-bold">₹{500 - totalPrice}</strong> more for <strong>Free Shipping</strong>
                      </span>
                      <span className="text-[0.68rem] font-mono text-muted-foreground">₹{totalPrice}/₹500</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/80">
                      <div
                        className="h-full bg-[var(--gold)] transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(100, (totalPrice / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : totalPrice < 1000 ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        ✨ <strong>Free Shipping unlocked!</strong> Add <strong className="text-[var(--gold)] font-bold">₹{1000 - totalPrice}</strong> more for <strong>Flat 10% OFF</strong>
                      </span>
                      <span className="text-[0.68rem] font-mono text-muted-foreground">₹{totalPrice}/₹1000</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/80">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(100, (totalPrice / 1000) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span>🎉</span>
                      <span>Free Shipping + Flat 10% OFF Unlocked!</span>
                    </span>
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-[0.65rem] font-bold text-emerald-800 dark:text-emerald-200">
                      SAVED ₹{discount}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor">
                      <path
                        strokeWidth="1.4"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="s2k-display mt-6 text-xl text-primary">Your cart is currently empty</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    Explore our handpicked Guntur pickles, spices and snacks to add items to your cart.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="s2k-btn s2k-btn-solid mt-8"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : step === "cart" ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[0.65rem] font-semibold tracking-wider uppercase text-[var(--gold)]">
                          {item.category}
                        </span>
                        <h4 className="font-semibold text-foreground truncate">{item.productName}</h4>
                        <p className="text-xs text-muted-foreground">Size: {item.sizeLabel}</p>
                        <p className="s2k-display mt-1 text-base text-primary">
                          ₹{item.price * item.quantity}{" "}
                          <span className="text-xs font-sans text-muted-foreground">
                            (₹{item.price} x {item.quantity})
                          </span>
                        </p>
                      </div>

                      {/* Quantity control */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 text-base hover:bg-muted font-bold text-foreground"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-sm font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 text-base hover:bg-muted font-bold text-foreground"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                            <path strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-destructive hover:underline"
                    >
                      Clear all items
                    </button>
                  </div>
                </div>
              ) : (
                /* Address Form Step */
                <form onSubmit={handleCheckout} className="space-y-4">
                  <p className="text-xs text-muted-foreground mb-4">
                    Enter your delivery details to generate an instant WhatsApp order message.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--gold)]"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--gold)]"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                      Full Delivery Address *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House/Flat No, Street, Landmark, Village/City"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--gold)] resize-none"
                    />
                    {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="e.g. 522303"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--gold)]"
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-destructive">{errors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                      Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Extra spicy / Delivery timing preference"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <button type="submit" className="hidden">Submit</button>
                </form>
              )}
            </div>

            {/* Footer / Summary Action */}
            {items.length > 0 && (
              <div className="border-t border-border bg-card p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-foreground font-semibold">₹{totalPrice}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <span>✨</span>
                        <span>Flat 10% Offer (Bill &gt; ₹1000)</span>
                      </span>
                      <span className="font-mono font-bold">-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Shipping</span>
                    {isFreeShipping ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span>🚚</span> FREE (Bill &gt; ₹500)
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Standard Delivery</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/70 pt-3">
                    <span className="text-base font-bold text-foreground">Total Payable</span>
                    <span className="s2k-display text-3xl text-primary">₹{finalPrice}</span>
                  </div>
                </div>

                {step === "cart" ? (
                  <button
                    type="button"
                    onClick={() => setStep("address")}
                    className="s2k-btn s2k-btn-solid w-full justify-center !py-4"
                  >
                    Proceed to Delivery Details →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-[color-mix(in_oklab,var(--gold)_60%,transparent)] bg-[var(--forest)] px-6 py-4 font-semibold text-[var(--ivory)] shadow-lg transition-transform hover:scale-[1.01]"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-emerald-400">
                      <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11.4 11.4 0 0 1-4.4-4c-.3-.5-.8-1.3-.8-2.4s.6-1.7.8-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4-.3.3c-.1.1-.2.3 0 .5a8 8 0 0 0 3.6 3.1c.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3v1.1Z" />
                    </svg>
                    <span>Order Now on WhatsApp (₹{finalPrice})</span>
                  </button>
                )}

                <p className="text-center text-[0.65rem] text-muted-foreground tracking-wider">
                  Registered Business • <span className="font-mono text-foreground font-semibold">GSTIN: {CONTACT.gst}</span>
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
