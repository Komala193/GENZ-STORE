import React, { useState } from "react";
import { CartItem, Product } from "../types";
import { X, Plus, Minus, Trash2, ArrowRight, Percent, Check, Sparkles, HelpCircle } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  onRemoveItem: (productId: string, color?: string, size?: string) => void;
  onProceedToCheckout: () => void;
  productsPool: Product[];
  onAddToCart: (product: Product, color?: string, size?: string) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  productsPool,
  onAddToCart,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingEstimate, setShippingEstimate] = useState<string>("");

  if (!isOpen) return null;

  // Calculation summaries
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0;
  const shippingFee = subtotal > 3000 || subtotal === 0 ? 0 : 150;
  const totalAmount = subtotal - discountAmount + shippingFee;
  const rewardsEarned = Math.round(totalAmount / 20); // 1 point for every ₹20 spent

  const validCoupons: Record<string, number> = {
    STUDENT20: 20, // 20% off for verified students
    VIBECHECK: 10, // 10% off general discount
    DRIP15: 15,    // 15% off fashion items
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const upperCode = couponCode.toUpperCase().trim();
    if (validCoupons[upperCode]) {
      setAppliedDiscount({ code: upperCode, percent: validCoupons[upperCode] });
      setCouponCode("");
    } else {
      setCouponError("Invalid voucher! Try STUDENT20 or VIBECHECK.");
    }
  };

  const handleZipLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode || zipCode.length < 5) {
      setShippingEstimate("Enter a valid ZIP/PIN code.");
      return;
    }
    // Simulate some real delivery ZIP mappings
    const lastDigit = zipCode.slice(-1);
    if (["1", "3", "5"].includes(lastDigit)) {
      setShippingEstimate("Lightning Delivery - Guaranteed Tomorrow!");
    } else if (["2", "4", "0"].includes(lastDigit)) {
      setShippingEstimate("Express shipping - Arriving in 2 Days.");
    } else {
      setShippingEstimate("Standard drop - Arriving in 3-5 Days.");
    }
  };

  // Curate Upsell suggestions - select products that are NOT currently in the cart
  const inCartIds = cartItems.map((item) => item.product.id);
  const upsellProducts = productsPool
    .filter((p) => !inCartIds.includes(p.id))
    .slice(0, 3); // top 3 recommendations

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-all">
          {/* Header */}
          <div className="px-4 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between sm:px-6">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 rounded-lg bg-violet-100 text-violet-700 text-xs font-black">
                BAG
              </span>
              <h2 id="cart-drawer-heading" className="text-base sm:text-lg font-display font-black text-slate-800">
                Your Drop Bag ({cartItems.length})
              </h2>
            </div>
            <button
              id="btn-close-cart"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 sm:px-6 scrollbar-thin">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-700 text-sm sm:text-base">Your bag is empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Drip check failed! Browse our curated lifestyle drops to assemble your first outfit combination.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Start Exploring Drops
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || "default"}-${item.selectedSize || "default"}`}
                    className="flex gap-3 pb-4 border-b border-slate-100"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {item.product.name}
                      </h4>
                      {/* Configuration specifications (color & size) */}
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {item.selectedColor && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                              Size {item.selectedSize}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Quantity adjusting and deletion */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-slate-100 rounded-lg p-0.5 bg-slate-50/50">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1),
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-700">{item.quantity}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                            ₹{item.product.price * item.quantity}
                          </span>
                          <button
                            id={`btn-remove-item-${idx}`}
                            onClick={() => onRemoveItem(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Purge drop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Smart upsell panel inside shopping bag */}
            {cartItems.length > 0 && upsellProducts.length > 0 && (
              <div className="bg-gradient-glow rounded-3xl border border-violet-100/30 p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-spin" /> Up-Drip Recommendations:
                </div>
                <div className="space-y-2.5">
                  {upsellProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-violet-100/40"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded-lg shrink-0 bg-slate-50"
                        />
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold text-slate-700 truncate">{p.name}</h4>
                          <p className="text-[10px] text-slate-400">₹{p.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(p, p.colors?.[0], p.sizes?.[0])}
                        className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-[10px] font-bold text-white rounded-lg cursor-pointer transition-colors"
                      >
                        + Add Too
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summaries & Promo Application */}
          {cartItems.length > 0 && (
            <div className="bg-slate-50 border-t border-slate-100 px-4 py-5 space-y-4 sm:px-6">
              {/* Delivery Estimates Zip box */}
              <div className="flex flex-col gap-1.5 pb-3 border-b border-slate-100">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Estimate shipping time:
                </label>
                <form onSubmit={handleZipLookup} className="flex gap-1.5">
                  <input
                    id="zip-estimate-textbox"
                    type="text"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter 6-digit PIN/ZIP code"
                    className="flex-1 text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden bg-white text-slate-700"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-slate-800 hover:bg-slate-900 border border-slate-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </form>
                {shippingEstimate && (
                  <p className="text-[11px] font-bold text-violet-700 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-500" /> {shippingEstimate}
                  </p>
                )}
              </div>

              {/* Coupon Codes Panel */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Promo voucher:
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <div className="relative flex-1">
                    <input
                      id="coupon-textbox"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. STUDENT20"
                      className="w-full text-xs font-medium border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 focus:outline-hidden bg-white text-slate-700 capitalize"
                    />
                    <Percent className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Apply Coupon
                  </button>
                </form>
                {couponError && <p className="text-[10px] font-semibold text-rose-500">{couponError}</p>}
                {appliedDiscount && (
                  <p className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md p-1 px-2.5 mt-1 flex items-center justify-between">
                    <span>Applied: {appliedDiscount.code} ({appliedDiscount.percent}% off)</span>
                    <button
                      onClick={() => setAppliedDiscount(null)}
                      className="text-rose-500 hover:text-rose-700 font-extrabold text-[10px] ml-2"
                    >
                      [Remove]
                    </button>
                  </p>
                )}
              </div>

              {/* Order bill breakdown */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Voucher Saved value</span>
                    <span className="font-bold">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Standard Shipping</span>
                  <span className="font-bold text-slate-800">
                    {shippingFee === 0 ? "FREE Drops" : `₹${shippingFee}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[10px] text-slate-400 text-right leading-none">
                    Spend ₹3,000+ for FREE premium delivery drop.
                  </p>
                )}
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 border-t border-slate-200/60 pt-2.5">
                  <span>Total Due Amount</span>
                  <span className="font-display">₹{totalAmount}</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50/50 p-2 rounded-xl text-center flex items-center justify-center gap-1 border border-emerald-100/30">
                  <Check className="w-3.5 h-3.5" />
                  <span>Earns +{rewardsEarned} loyalty reward points towards next drops!</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="btn-trigger-checkout"
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700 py-3.5 px-4 text-xs sm:text-sm font-black text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Confirm Purchase Drops</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
