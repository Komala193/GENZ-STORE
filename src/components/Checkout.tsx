import React, { useState } from "react";
import { CartItem, Order } from "../types";
import { CreditCard, CheckCircle, Smartphone, Truck, ShieldCheck, ArrowLeft, Loader2, Flame } from "lucide-react";

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (orderData: Omit<Order, "id" | "date" | "trackingStatus" | "trackingSteps" | "rewardsPointsEarned">) => void;
  onBackToCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder, onBackToCart }) => {
  const [shippingMethod, setShippingMethod] = useState<"standard" | "lightning">("standard");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [placing, setPlacing] = useState(false);

  // Form entries
  const [fullName, setFullName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("aarav.sharma26@unimail.edu");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Tower 4, Flat 1204, Horizon Apartments, MG Road");
  const [city, setCity] = useState("New Delhi");
  const [zipCode, setZipCode] = useState("110001");

  // Payment specific fields
  const [upiId, setUpiId] = useState("aaravsharma@paytm");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 9012");

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = shippingMethod === "lightning" ? 250 : subtotal > 3000 ? 0 : 150;
  const totalDue = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city || !zipCode) {
      alert("Please configure shipping parameters thoroughly.");
      return;
    }

    setPlacing(true);

    // Simulate database write delay
    setTimeout(() => {
      onPlaceOrder({
        items: cartItems,
        totalAmount: totalDue,
        shippingAddress: { fullName, email, phone, address, city, zipCode },
        paymentMethod: paymentMethod === "upi" ? `UPI (${upiId})` : paymentMethod === "card" ? `Card (ending in ${cardNumber.slice(-4)})` : "Cash on Delivery",
      });
      setPlacing(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Back trigger */}
      <button
        onClick={onBackToCart}
        className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Drop Bag
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Shipping Details & Payment Option */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping details */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-violet-100 text-violet-700 font-sans font-bold text-[10px] uppercase">01</span>
                Drop Delivery Location
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Full Name / Alias
                  </label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Email address
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="checkout-phone"
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Delivery Address (Apartment, Street)
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      ZIP/PIN Code
                    </label>
                    <input
                      id="checkout-zip"
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/30 text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Methods speed selectors */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-violet-100 text-violet-700 font-sans font-bold text-[10px] uppercase">02</span>
                Shipping Speed Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "border-violet-600 bg-violet-50/20"
                      : "border-slate-100 bg-slate-50/50 hover:border-slate-300"
                  }`}
                  onClick={() => setShippingMethod("standard")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <Truck className={`w-5 h-5 shrink-0 ${shippingMethod === "standard" ? "text-violet-600" : "text-slate-400"}`} />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">Standard Drop</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Arrives in 3-5 days</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-700">{subtotal > 3000 ? "FREE" : "₹150"}</span>
                  </div>
                </div>

                <div
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    shippingMethod === "lightning"
                      ? "border-violet-600 bg-violet-50/20"
                      : "border-slate-100 bg-slate-50/50 hover:border-slate-300"
                  }`}
                  onClick={() => setShippingMethod("lightning")}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <Flame className={`w-5 h-5 shrink-0 ${shippingMethod === "lightning" ? "text-violet-600 animate-pulse" : "text-slate-400"}`} />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">Lightning Delivery</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Guaranteed tomorrow</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-700">₹250</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment selections */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-violet-100 text-violet-700 font-sans font-bold text-[10px] uppercase">03</span>
                Secure checkout
              </h3>

              <div className="space-y-4">
                {/* Method Radios */}
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "upi" ? "border-violet-600 bg-violet-50/30 text-violet-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-1.5" />
                    <span className="text-[10px] font-bold uppercase">UPI Pay</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "card" ? "border-violet-600 bg-violet-50/30 text-violet-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1.5" />
                    <span className="text-[10px] font-bold uppercase">Debit/Credit</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod" ? "border-violet-600 bg-violet-50/30 text-violet-700" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-1.5" />
                    <span className="text-[10px] font-bold uppercase">Cash on Del</span>
                  </div>
                </div>

                {/* Conditional Fields */}
                {paymentMethod === "upi" && (
                  <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Enter UPI ID / address (Google Pay, PhonePe, Paytm)
                    </label>
                    <input
                      id="upi-textboxID"
                      type="text"
                      required={paymentMethod === "upi"}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@upi"
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden bg-white text-slate-700"
                    />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Card Number
                        </label>
                        <input
                          id="checkout-cardnumber"
                          type="text"
                          required={paymentMethod === "card"}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden bg-white text-slate-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Expiry date
                          </label>
                          <input
                            id="checkout-expiry"
                            type="text"
                            placeholder="08/29"
                            required={paymentMethod === "card"}
                            className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3 py-2-center text-center focus:outline-hidden bg-white text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            CVV
                          </label>
                          <input
                            id="checkout-cvv"
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            required={paymentMethod === "card"}
                            className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 text-center focus:outline-hidden bg-white text-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <p className="text-[11px] text-slate-500 italic bg-amber-50 border border-amber-100 p-3 rounded-2xl">
                    🔔 Please verify your mobile address. A confirmation pin code will be dispatched via text during courier arrival to assure safe drops.
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Submit action button */}
            <button
              id="checkout-confirm-payment-btn"
              type="submit"
              disabled={placing}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-black py-4 px-4 text-xs sm:text-sm font-black text-white shadow-md transition-all cursor-pointer disabled:opacity-70"
            >
              {placing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Configuring secured bank drops...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm and Place Drop Order (₹{totalDue})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right column: Order Summary items preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-100">
              Drop Bag Summary
            </h3>

            {/* Item Previews list */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto scrollbar-thin pr-1">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-2.5 items-center justify-between text-xs">
                  <div className="flex gap-2.5 items-center min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg shrink-0 bg-slate-50"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-700 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 shrink-0">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Cost totals */}
            <div className="border-t border-slate-100 pt-4 mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery fees</span>
                <span className="font-bold text-slate-800">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 border-t border-slate-100 pt-2 text-lg">
                <span>Grand Total Due</span>
                <span className="font-display font-black text-violet-700">₹{totalDue}</span>
              </div>
            </div>
          </div>

          {/* Secure Trust widget */}
          <div className="rounded-2xl bg-linear-to-b from-slate-50 to-slate-100 border border-slate-200/50 p-4 text-center">
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Encryption Verified
            </h4>
            <p className="text-[10px] text-slate-400">
              The credentials you submit are protected with SSL. Drop purchases are certified real and fully refundable within 7 calendar days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
