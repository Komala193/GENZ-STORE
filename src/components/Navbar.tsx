import React from "react";
import { ShoppingCart, Heart, User, Sparkles, Flame, Percent } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const navItems = [
    { id: "home", label: "Hub Home" },
    { id: "shop", label: "Shop Drop" },
    { id: "lifestyles", label: "Lifestyles" },
    { id: "trends", label: "Trend Hub", icon: <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse fill-orange-500" /> },
    { id: "offers", label: "Offers", icon: <Percent className="w-3.5 h-3.5 text-emerald-500" /> },
    { id: "about", label: "Our Story" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo design */}
        <div
          id="navbar-logo"
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200 transition-all group-hover:scale-105 active:scale-95 group-hover:rotate-6">
            <Sparkles className="h-5 w-5 fill-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-base sm:text-lg tracking-tight text-slate-800 leading-none">
              GENZ <span className="text-violet-600">STORE</span>
            </h1>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mt-0.5">
              Lifestyle Drop
            </span>
          </div>
        </div>

        {/* Global Navigation links for desktop layouts */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Search Bar & Action Accessories */}
        <div className="flex items-center gap-3">
          {/* Smart Search box */}
          <form onSubmit={onSearchSubmit} className="hidden md:flex items-center relative w-48 lg:w-60">
            <input
              id="navbar-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trends..."
              className="w-full text-xs font-medium pl-3 pr-8 py-2 border border-slate-100 bg-slate-50/50 rounded-xl focus:outline-hidden focus:border-violet-300 focus:bg-white transition-all text-slate-700"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-violet-600 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Action trigger group */}
          <div className="flex items-center gap-1.5">
            {/* Wishlist Board link */}
            <button
              id="navbar-wishlist-trigger"
              onClick={() => setActiveTab("dashboard")}
              className="relative flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
              title="Vibe Board (Wishlist)"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Slider trigger */}
            <button
              id="navbar-cart-trigger"
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Dashboard icon */}
            <button
              id="navbar-user-trigger"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center p-2 rounded-xl transition-all border cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-100"
                  : "border-slate-100 text-slate-500 hover:text-violet-600 hover:bg-violet-50"
              }`}
              title="User Dashboard"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
