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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header styling
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
    // Haptic feedback if available (mobile mostly)
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
    if (cart.length === 0) return;

    let message =
      "Namaste DB Dai! 🙏\nI'd like to place an order for pickup:\n\n";
    cart.forEach((line) => {
      message += `• ${line.quantity}x ${line.item.name} - $${(line.item.price * line.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: $${totalPrice.toFixed(2)}*\n\nMy name is: [Enter Name]\nPickup time: [Enter Time]`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName);
    if (element) {
      const offset = 120; // Adjust for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pb-32">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`font-bold transition-all duration-300 ${scrolled ? "text-red-700 text-xl" : "text-white text-2xl drop-shadow-md"}`}
            >
              DB Dai Ko<span className="text-orange-500"> Khaja Junction</span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 rounded-full transition-colors ${
              scrolled
                ? "text-stone-800 hover:bg-stone-100"
                : "text-white hover:bg-white/20"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[500px] flex items-center justify-center bg-stone-900 overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-orange-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-200 border border-orange-500/30 text-xs font-bold tracking-wider mb-4 uppercase backdrop-blur-sm">
            Authentic Nepalese Street Food
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Taste of Nepal <br /> in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Campsie
            </span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl mb-8 max-w-lg mx-auto">
            Experience the real flavors of Kathmandu. From juicy Jhol Momos to
            spicy Sekuwa.
          </p>
          <button
            onClick={() => scrollToCategory("Momo Mania 🥟")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-red-900/40 transition-transform active:scale-95 transform hover:-translate-y-1"
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Category Navigation (Sticky) */}
      <nav className="sticky top-[52px] md:top-[60px] z-40 bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-6 py-3 min-w-max">
            {MENU_DATA.map((cat) => (
              <button
                key={cat.name}
                onClick={() => scrollToCategory(cat.name)}
                className={`text-sm font-bold whitespace-nowrap transition-colors relative ${
                  activeCategory === cat.name
                    ? "text-red-700"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {cat.name}
                {activeCategory === cat.name && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-red-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Menu Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {MENU_DATA.map((category) => (
          <section
            key={category.name}
            id={category.name}
            className="scroll-mt-32"
          >
            <h3 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-2">
              {category.name}
              <span className="h-px bg-stone-200 flex-1 ml-4 block"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => {
                const quantityInCart =
                  cart.find((c) => c.item.id === item.id)?.quantity || 0;

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-stone-100 transition-all duration-200"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-lg text-stone-900 group-hover:text-red-700 transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-sm text-stone-500 mt-1 mb-3 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="font-bold text-stone-900 text-lg">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between min-w-[80px]">
                        {item.popular && (
                          <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2">
                            Popular
                          </span>
                        )}

                        {quantityInCart > 0 ? (
                          <div className="flex items-center bg-stone-100 rounded-lg p-1 shadow-inner">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-red-600 shadow-sm hover:bg-red-50 font-bold transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold text-stone-800 text-sm">
                              {quantityInCart}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-md text-white shadow-sm hover:bg-red-700 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-stone-100 text-stone-900 hover:bg-red-600 hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-95"
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

      {/* Footer Info */}
      <footer className="bg-stone-900 text-white pt-12 pb-24 mt-12">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-4">
              DB Dai Ko Khaja Junction
            </h4>
            <p className="text-stone-400 mb-6 leading-relaxed">
              Bringing the authentic streets of Kathmandu to Sydney. We
              specialize in traditional Newari cuisine and street food
              favorites.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                {/* Facebook Icon Placeholder */}
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
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                {/* Instagram Icon Placeholder */}
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
          <div className="space-y-4 text-stone-400 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-1">📍</span>
              <p>
                156 Beamish St, Campsie NSW 2194
                <br />
                Sydney, Australia
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">📞</span>
              <p>{WA_NUMBER}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">📧</span>
              <p>dbdaikokhajajunction7@gmail.com</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-1">🕒</span>
              <div>
                <p>Open Daily</p>
                <p className="text-stone-500">3:00 PM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-stone-600 text-xs mt-12 pt-8 border-t border-white/5">
          © {new Date().getFullYear()} DB Dai Ko Khaja Junction. All rights
          reserved.
        </div>
      </footer>

      {/* Floating Cart Button (Mobile/Desktop) */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-4 right-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-red-600 text-white p-4 rounded-2xl shadow-xl shadow-red-900/30 flex justify-between items-center font-bold text-lg hover:bg-red-700 transition-all transform active:scale-95 animate-bounce-subtle"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-sm backdrop-blur-sm">
                {totalItems}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-normal opacity-90">
                  View Order
                </span>
                <span>My Cart</span>
              </div>
            </div>
            <span className="bg-black/20 px-3 py-1 rounded-lg">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal/Sheet */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={(e) => e.target === e.currentTarget && setIsCartOpen(false)}
        >
          <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[80vh] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-extrabold text-stone-900">
                Your Order
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                  <div className="text-6xl mb-4 grayscale opacity-50">🥟</div>
                  <p className="font-medium">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-red-600 font-bold hover:underline"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-stone-800">
                          {item.name}
                        </h4>
                        <p className="font-bold text-stone-900">
                          ${(item.price * quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs text-stone-500 mb-2">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center bg-stone-100 rounded-lg p-1 h-8">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-full flex items-center justify-center rounded text-stone-500 hover:bg-white hover:shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-full flex items-center justify-center rounded text-red-600 hover:bg-white hover:shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 pb-8 sm:pb-6">
                <div className="space-y-2 mb-6 text-sm text-stone-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold text-lg pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={sendOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-900/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Checkout with WhatsApp
                </button>
                <p className="text-center text-xs text-stone-400 mt-4">
                  You'll be redirected to WhatsApp to send your order.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
