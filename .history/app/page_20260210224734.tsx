"use client";

import { useState, useEffect } from "react";
import { MENU_DATA, MenuItem, MenuCategory } from "../data/menu";

// Configuration
const WA_NUMBER = "61405452688";
const LOCATION_URL = "https://maps.app.goo.gl/YourMapLinkHere";

export default function Home() {
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].name);
  const [scrolled, setScrolled] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return prev.filter((i) => i.item.id !== itemId);
    });
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0,
  );

  const sendOrder = () => {
    if (cart.length === 0 || !customerName.trim() || !pickupTime.trim()) return;
    let message =
      "Namaste DB Dai! 🙏\nI'd like to place an order for pickup:\n\n";
    cart.forEach((line) => {
      message += `• ${line.quantity}x ${line.item.name} - $${(line.item.price * line.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: $${totalPrice.toFixed(2)}*\n\nMy name is: ${customerName.trim()}\nPickup time: ${pickupTime.trim()}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowCheckoutForm(false);
  };

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* ─── HEADER ─── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-stone-900/5 py-2"
            : "bg-gradient-to-b from-black/40 to-transparent py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo + Name */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`shrink-0 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                scrolled
                  ? "w-9 h-9 sm:w-10 sm:h-10 border-red-600/30"
                  : "w-10 h-10 sm:w-12 sm:h-12 border-white/40"
              } shadow-md`}
            >
              <img
                src="/logo.jpeg"
                alt="DB Dai Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p
                className={`font-heading font-extrabold leading-tight truncate transition-all duration-300 ${
                  scrolled
                    ? "text-stone-900 text-sm sm:text-base lg:text-lg"
                    : "text-white text-sm sm:text-lg lg:text-xl drop-shadow-lg"
                }`}
              >
                DB Dai Ko{" "}
                <span className={scrolled ? "text-red-600" : "text-orange-400"}>
                  Khaja Junction
                </span>
              </p>
              <p
                className={`text-[10px] sm:text-xs font-medium transition-colors hidden sm:block ${
                  scrolled ? "text-stone-400" : "text-white/60"
                }`}
              >
                Authentic Nepalese Street Food
              </p>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative touch-target flex items-center justify-center rounded-full transition-all duration-200 ${
              scrolled
                ? "text-stone-700 hover:bg-stone-100 active:bg-stone-200"
                : "text-white hover:bg-white/15 active:bg-white/25"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-badge ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-stone-900 h-[70svh] min-h-[420px] sm:h-[65svh] sm:min-h-[480px] md:h-[550px] lg:h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('/bg-hero.png')] bg-cover bg-center mix-blend-overlay opacity-50" />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="relative z-10 w-full px-5 sm:px-8 max-w-2xl mx-auto text-center animate-fade-in-up flex flex-col items-center">
          {/* Logo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden mb-5 sm:mb-6">
            <img
              src="/logo.jpeg"
              alt="DB Dai Logo"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-orange-200 border border-orange-400/30 text-[11px] sm:text-xs font-bold tracking-widest mb-4 uppercase backdrop-blur-md">
            Authentic Nepalese Street Food
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight drop-shadow-xl">
            Taste of Nepal
            <br />
            in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Campsie
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            From juicy Jhol Momos to spicy Sekuwa — experience the real flavors
            of Kathmandu.
          </p>

          <button
            onClick={() => scrollToCategory("Momo Mania 🥟")}
            className="touch-target bg-red-600 hover:bg-red-700 text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-bold text-base sm:text-lg shadow-xl shadow-red-900/40 transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
          >
            View Menu & Order
          </button>
        </div>
      </section>

      {/* ─── CATEGORY NAV (Sticky) ─── */}
      <nav className="sticky top-[52px] sm:top-[56px] md:top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar">
            {MENU_DATA.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`touch-target shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.name
                    ? "bg-red-600 text-white shadow-md shadow-red-600/25"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 active:bg-stone-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── MENU CONTENT ─── */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14 pb-36 sm:pb-32">
        {MENU_DATA.map((category) => (
          <section
            key={category.name}
            id={category.name}
            className="scroll-mt-28 sm:scroll-mt-32"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-5 sm:mb-7">
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-stone-800 shrink-0">
                {category.name}
              </h3>
              <div className="h-px bg-gradient-to-r from-stone-200 to-transparent flex-1" />
              <span className="text-xs text-stone-400 font-medium shrink-0">
                {category.items.length} items
              </span>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {category.items.map((item) => {
                const quantityInCart =
                  cart.find((c) => c.item.id === item.id)?.quantity || 0;

                return (
                  <div
                    key={item.id}
                    className={`group relative bg-white rounded-2xl sm:rounded-xl p-4 sm:p-5 transition-all duration-200 border ${
                      quantityInCart > 0
                        ? "border-red-200 shadow-md shadow-red-600/5 ring-1 ring-red-100"
                        : "border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200"
                    }`}
                  >
                    {/* Popular Badge */}
                    {item.popular && (
                      <div className="absolute -top-2.5 right-4 sm:right-3">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          Popular
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col h-full">
                      {/* Name + Description */}
                      <div className="flex-1 mb-3">
                        <h4 className="font-heading font-bold text-base sm:text-[15px] text-stone-900 group-hover:text-red-700 transition-colors leading-snug mb-1.5">
                          {item.name}
                        </h4>
                        <p className="text-[13px] sm:text-sm text-stone-400 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Price + Action */}
                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100/80">
                        <span className="font-heading font-extrabold text-lg sm:text-xl text-stone-900">
                          ${item.price.toFixed(2)}
                        </span>

                        {quantityInCart > 0 ? (
                          <div className="flex items-center bg-stone-100 rounded-xl overflow-hidden shadow-inner">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="touch-target w-10 h-10 flex items-center justify-center text-red-600 font-bold text-lg hover:bg-white active:bg-red-50 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold text-stone-800 text-sm tabular-nums">
                              {quantityInCart}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="touch-target w-10 h-10 flex items-center justify-center bg-red-600 text-white font-bold text-lg hover:bg-red-700 active:bg-red-800 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="touch-target bg-stone-100 text-stone-800 hover:bg-red-600 hover:text-white active:bg-red-700 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm active:scale-95"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-stone-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/10">
                  <img
                    src="/logo.jpeg"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-heading text-lg sm:text-xl font-bold">
                  DB Dai Ko Khaja Junction
                </h4>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-5 max-w-sm">
                Bringing the authentic streets of Kathmandu to Sydney. We
                specialize in traditional Newari cuisine and street food
                favorites.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              <h5 className="font-heading font-bold text-base text-white mb-3">
                Contact
              </h5>
              <div className="flex items-start gap-3 text-stone-400">
                <span className="text-red-500 mt-0.5 shrink-0">📍</span>
                <a
                  href={LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  156 Beamish St, Campsie NSW 2194
                  <br />
                  Sydney, Australia
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <span className="text-red-500 shrink-0">📞</span>
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="hover:text-white transition-colors"
                >
                  +61 405 452 688
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <span className="text-red-500 shrink-0">📧</span>
                <a
                  href="mailto:dbdaikokhajajunction7@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  dbdaikokhajajunction7@gmail.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-4 text-sm">
              <h5 className="font-heading font-bold text-base text-white mb-3">
                Opening Hours
              </h5>
              <div className="flex items-start gap-3 text-stone-400">
                <span className="text-red-500 mt-0.5 shrink-0">🕒</span>
                <div>
                  <p className="text-white font-medium">Open Daily</p>
                  <p className="text-stone-500 mt-0.5">3:00 PM — 11:00 PM</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors mt-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="text-center text-stone-600 text-xs mt-10 sm:mt-12 pt-6 border-t border-white/5">
            © {new Date().getFullYear()} DB Dai Ko Khaja Junction. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* ─── FLOATING CART BAR ─── */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 sm:w-full sm:max-w-md safe-bottom">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-red-600 text-white px-4 py-3.5 sm:py-4 rounded-2xl shadow-2xl shadow-red-900/30 flex justify-between items-center font-bold text-base sm:text-lg hover:bg-red-700 transition-all active:scale-[0.98] animate-bounce-subtle"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm backdrop-blur-sm font-bold">
                {totalItems}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[11px] sm:text-xs font-medium opacity-80">
                  View Order
                </span>
                <span className="text-sm sm:text-base">My Cart</span>
              </div>
            </div>
            <span className="bg-black/20 px-3 py-1.5 rounded-lg text-sm sm:text-base tabular-nums">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* ─── CART MODAL / BOTTOM SHEET ─── */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsCartOpen(false)}
        >
          <div className="bg-white w-full sm:max-w-md sm:mx-4 max-h-[90svh] sm:max-h-[80vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            {/* Handle indicator (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-stone-300" />
            </div>

            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900">
                  Your Order
                </h2>
                {cart.length > 0 && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    {totalItems} item{totalItems !== 1 && "s"}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="touch-target w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-red-100 hover:text-red-600 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 overscroll-contain">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-stone-400">
                  <div className="text-5xl mb-3 grayscale opacity-50">🥟</div>
                  <p className="font-medium text-sm">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 text-red-600 font-bold text-sm hover:underline"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3 border-b border-stone-50 last:border-0"
                  >
                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm sm:text-[15px] text-stone-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-stone-100 rounded-xl overflow-hidden shrink-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-white active:bg-stone-200 font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-9 h-9 flex items-center justify-center text-red-600 hover:bg-white active:bg-red-50 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="font-bold text-sm text-stone-900 w-16 text-right tabular-nums shrink-0">
                      ${(item.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-5 py-5 bg-stone-50 border-t border-stone-100 safe-bottom">
                {!showCheckoutForm ? (
                  <>
                    <div className="flex justify-between items-baseline mb-5">
                      <span className="text-sm text-stone-500">Total</span>
                      <span className="font-heading text-2xl font-extrabold text-stone-900 tabular-nums">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCheckoutForm(true)}
                      className="touch-target w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Proceed to Checkout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Back button */}
                    <button
                      onClick={() => setShowCheckoutForm(false)}
                      className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 font-medium mb-4 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to cart
                    </button>

                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-sm text-stone-500">Total</span>
                      <span className="font-heading text-2xl font-extrabold text-stone-900 tabular-nums">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Customer Details Form */}
                    <div className="space-y-3 mb-5">
                      <div>
                        <label
                          htmlFor="customerName"
                          className="block text-xs font-semibold text-stone-600 mb-1.5"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="customerName"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Ram Bahadur"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pickupTime"
                          className="block text-xs font-semibold text-stone-600 mb-1.5"
                        >
                          Pickup Time <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="pickupTime"
                          type="text"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          placeholder="e.g. 6:30 PM today"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      onClick={sendOrder}
                      disabled={!customerName.trim() || !pickupTime.trim()}
                      className={`touch-target w-full py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] ${
                        customerName.trim() && pickupTime.trim()
                          ? "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white"
                          : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Send Order on WhatsApp
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-3">
                      Your name and pickup time will be included in the message.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
