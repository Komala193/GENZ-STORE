import React from "react";
import { Order, Product, UserProfile, Notification } from "../types";
import { Package, Heart, Award, Bell, ShieldAlert, BadgeInfo, CheckCircle, Truck, ShoppingBag, Trash2 } from "lucide-react";

interface DashboardProps {
  userProfile: UserProfile;
  orders: Order[];
  wishlist: string[];
  notifications: Notification[];
  productsPool: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onClearNotifications: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userProfile,
  orders,
  wishlist,
  notifications,
  productsPool,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onClearNotifications,
}) => {
  const wishlistedItems = productsPool.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Top Banner with Profile & Reward points */}
      <div className="rounded-3xl bg-linear-to-r from-violet-600 via-purple-600 to-orange-500 p-6 text-white shadow-lg relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black border border-white/25">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight">
                  Hey, {userProfile.name}!
                </h2>
                {userProfile.studentIdVerified && (
                  <span className="bg-emerald-400 text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                    Student Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-violet-100">{userProfile.email}</p>
              <p className="text-[10px] text-violet-200 mt-1 uppercase tracking-widest font-mono">
                Member Tier: <span className="font-bold text-white">{userProfile.tier}</span>
              </p>
            </div>
          </div>

          {/* Gamified Rewards Indicator box */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shrink-0">
            <Award className="w-8 h-8 text-orange-300 animate-bounce" />
            <div>
              <span className="text-[10px] uppercase font-bold text-violet-200 block">Rewards Balance</span>
              <span className="text-xl sm:text-2xl font-display font-black text-white">{userProfile.rewardsPoints} pts</span>
              <span className="text-[9px] block text-orange-200 font-semibold">100 pts valuable in ₹100 drops coupon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid layouts: Orders Tracking on Left, Wishlist & Notifications on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left main: Shipments tracking */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-600" />
              Active shipment tracking ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-10 flex flex-col items-center">
                <ShoppingBag className="w-12 h-12 text-slate-200 mb-2" />
                <p className="text-xs font-bold text-slate-500">No active orders placed yet.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Vibe check your drop bag to place your first style drops!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, orderIdx) => (
                  <div key={order.id} className="border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-4">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-50 text-xs text-slate-500">
                      <div>
                        ORDER ID: <span className="font-bold text-slate-800 font-mono">{order.id}</span>
                      </div>
                      <div>
                        DATE: <span className="font-bold text-slate-800">{order.date}</span>
                      </div>
                      <div className="font-display font-extrabold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full text-[11px]">
                        Total due: ₹{order.totalAmount}
                      </div>
                    </div>

                    {/* Visual Progress Steps Bar */}
                    <div className="relative pt-4 pb-2">
                      {/* Connection Line */}
                      <div className="absolute top-[34px] left-4 right-4 h-1 bg-slate-100 -z-1" />
                      <div
                        className="absolute top-[34px] left-4 h-1 bg-violet-600 transition-all duration-500 -z-1"
                        style={{
                          width:
                            order.trackingStatus === "delivered"
                              ? "100%"
                              : order.trackingStatus === "out-for-delivery"
                              ? "70%"
                              : order.trackingStatus === "shipped"
                              ? "40%"
                              : "15%",
                        }}
                      />

                      <div className="flex items-center justify-between">
                        {order.trackingSteps.map((step, sIdx) => {
                          const IconComponent = sIdx === 0 ? Package : sIdx === 1 ? CheckCircle : sIdx === 2 ? Truck : CheckCircle;
                          return (
                            <div key={sIdx} className="flex flex-col items-center text-center">
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                  step.done
                                    ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-100"
                                    : "bg-white border-slate-200 text-slate-400"
                                }`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-slate-700 mt-2 block">{step.status}</span>
                              <span className="text-[9px] text-slate-400 block mt-0.5">{step.date}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inline Items listing preview */}
                    <div className="bg-slate-50/50 rounded-xl p-3 space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Package Inventory checklist</span>
                      <div className="space-y-1">
                        {order.items.map((item, idX) => (
                          <div key={idX} className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-700 truncate max-w-[250px]">{item.product.name}</span>
                            <span className="text-slate-400">Qty {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sub: Wishlist & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Wishlists Board */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              Wishlist Board ({wishlistedItems.length})
            </h3>

            {wishlistedItems.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <Heart className="w-10 h-10 text-slate-200 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-500">Board matches empty</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Click Hearts on items to save drops here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin pr-1">
                {wishlistedItems.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg shrink-0 bg-white"
                      onClick={() => onSelectProduct(p)}
                    />
                    <div className="min-w-0 flex-1">
                      <h4
                        className="text-[11px] font-bold text-slate-700 truncate cursor-pointer hover:text-violet-600"
                        onClick={() => onSelectProduct(p)}
                      >
                        {p.name}
                      </h4>
                      <p className="text-[10px] font-extrabold text-slate-900 mt-0.5">₹{p.price}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onAddToCart(p, p.colors?.[0], p.sizes?.[0])}
                        className="p-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors cursor-pointer"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                        title="Purge"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications feed */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
              <h3 className="text-xs sm:text-sm font-display font-extrabold text-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-violet-500" />
                Alerts Feed
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearNotifications}
                  className="text-[10px] font-bold text-violet-600 hover:text-slate-800 cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <Bell className="w-8 h-8 text-slate-200 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-500">Inbox tranquil.</p>
                <p className="text-[9px] text-slate-400 mt-0.5">We'll alert you of rapid sales and drops here.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[200px] overflow-y-auto scrollbar-thin pr-1">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-violet-50/50 border border-violet-100/20 text-xs">
                    <p className="font-bold text-slate-800">{n.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[9px] text-slate-400 block mt-1.5 font-mono">{n.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
