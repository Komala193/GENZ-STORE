import React from "react";
import { Home, ShoppingBag, Flame, User, ShoppingCart } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const items = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    { id: "shop", label: "Shop", icon: <ShoppingBag className="w-5 h-5" /> },
    { id: "trends", label: "Trends", icon: <Flame className="w-5 h-5" /> },
    { id: "dashboard", label: "Me", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-center justify-around py-2 px-4 pb-[max(12px,env(safe-area-inset-bottom))] shadow-lg">
      {items.map((item) => (
        <button
          id={`bottom-nav-item-${item.id}`}
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all min-w-[50px] cursor-pointer ${
            activeTab === item.id
              ? "text-violet-600 scale-105"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-bold mt-1 tracking-wide leading-none">{item.label}</span>
          {activeTab === item.id && (
            <span className="absolute bottom-0 h-1 w-1 bg-violet-600 rounded-full" />
          )}
        </button>
      ))}

      {/* Floating Cart Trigger inside bottom navigation bar */}
      <button
        id="bottom-nav-cart-trigger"
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-400 cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white font-extrabold text-[8px] h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-1 tracking-wide leading-none">Bag</span>
      </button>
    </div>
  );
};
export default BottomNav;
