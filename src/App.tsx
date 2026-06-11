import React, { useState, useEffect } from "react";
import { PRODUCTS, LIFESTYLES, TRENDS, REVIEWS_POOL } from "./productsData";
import { Product, CartItem, Order, UserProfile, Notification, Review } from "./types";
import { ProductCard } from "./components/ProductCard";
import { AIShoppingAssistant } from "./components/AIShoppingAssistant";
import { Navbar } from "./components/Navbar";
import { BottomNav } from "./components/BottomNav";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Dashboard } from "./components/Dashboard";
import { TrendHub } from "./components/TrendHub";
import { Offers } from "./components/Offers";
import { AboutUs } from "./components/AboutUs";
import { Contact } from "./components/Contact";
import {
  Sparkles,
  Flame,
  ArrowRight,
  SlidersHorizontal,
  Search,
  Check,
  Star,
  ThumbsUp,
  Mail,
  Eye,
  ShoppingBag,
  Percent,
  RefreshCw,
  ShoppingBagIcon,
  ChevronRight
} from "lucide-react";

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>("home");

  // Core application database pools
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "drop-track-9041",
      date: "2026-06-11",
      items: [
        {
          product: PRODUCTS[0], // varsity jacket
          quantity: 1,
          selectedColor: "Cobalt Blue",
          selectedSize: "L"
        },
        {
          product: PRODUCTS[5], // eyeglasses
          quantity: 1,
          selectedColor: "Laser Silver Mirror"
        }
      ],
      totalAmount: 4798,
      trackingStatus: "shipped",
      trackingSteps: [
        { status: "Drop Confirmed", date: "June 11, 09:30 AM", desc: "Order details verified by systems.", done: true },
        { status: "Dispatched", date: "June 11, 02:45 PM", desc: "Courier package left Delhi terminal.", done: true },
        { status: "Transit Out", date: "Pending", desc: "Local courier hub allocation.", done: false },
        { status: "Arrived", date: "Pending", desc: "Vibe package delivered safely.", done: false }
      ],
      shippingAddress: {
        fullName: "Aarav Sharma",
        email: "aarav.sharma26@unimail.edu",
        phone: "+91 98765 43210",
        address: "Tower 4, Flat 1204, Horizon Apartments, MG Road",
        city: "New Delhi",
        zipCode: "110001"
      },
      paymentMethod: "UPI (aaravsharma@paytm)",
      rewardsPointsEarned: 240
    }
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Aarav Sharma",
    email: "aarav.sharma26@unimail.edu",
    phone: "+91 98765 43210",
    studentIdVerified: false,
    rewardsPoints: 480,
    tier: "Gold"
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-01",
      title: "🔥 Welcome to GENZ Drops!",
      message: "Unlock flat ₹150 discount drops on your first order with voucher code VIBECHECK.",
      time: "10 mins ago",
      read: false,
      type: "offer"
    },
    {
      id: "notif-02",
      title: "📦 Pre-Order Dispatch status",
      message: "Your retro vintage varsity jacket has left Delhi systems cargo tracking terminal.",
      time: "2 hours ago",
      read: false,
      type: "order"
    }
  ]);

  // Search & Filter state layers
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLifestyle, setActiveLifestyle] = useState<string>("Campus Life");
  const [catalogCategory, setCatalogCategory] = useState<string>("all");
  const [catalogPriceRange, setCatalogPriceRange] = useState<number>(10000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Detail display trigger states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);

  // Dynamic reviews pool
  const [localReviews, setLocalReviews] = useState<Record<string, Review[]>>({});
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Product Gallery zoom parameters
  const [galleryActiveImage, setGalleryActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Newsletter subscription simulation
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Synchronize initial main image slider in details page
  useEffect(() => {
    if (selectedProduct) {
      setGalleryActiveImage(selectedProduct.image);
      setSelectedSize(selectedProduct.sizes?.[0] || "");
      setSelectedColor(selectedProduct.colors?.[0] || "");
    }
  }, [selectedProduct]);

  // Core cart actions
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    const col = color || product.colors?.[0] || "Standard";
    const sz = size || product.sizes?.[0] || "Standard";

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === col &&
          item.selectedSize === sz
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      } else {
        return [...prev, { product, quantity: 1, selectedColor: col, selectedSize: sz }];
      }
    });

    // Alert notification banner callback
    const newNotif: Notification = {
      id: `add-cart-notif-${Date.now()}`,
      title: "🛒 Added to Drop bag",
      message: `${product.name} Added successfully. Check out inside your drop bag sidebar!`,
      time: "Just now",
      read: false,
      type: "order"
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleVerifyStudentStatus = () => {
    setUserProfile((prev) => ({
      ...prev,
      studentIdVerified: true,
      rewardsPoints: prev.rewardsPoints + 150 // award bonus points on verification
    }));

    setNotifications((prev) => [
      {
        id: `notif-student-verify-${Date.now()}`,
        title: "🎓 Student Status Approved!",
        message: "Your university credentials checked out successfully. Flat 20% discount coupon STUDENT20 active now.",
        time: "Just now",
        read: false,
        type: "offer"
      },
      ...prev
    ]);
  };

  const handlePlaceOrder = (orderData: any) => {
    const pointsAwarded = Math.round(orderData.totalAmount / 20);
    const newOrder: Order = {
      id: `drop-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().split("T")[0],
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      trackingStatus: "processing",
      trackingSteps: [
        { status: "Drop Confirmed", date: "Just now", desc: "Vibe order checked out and confirmed.", done: true },
        { status: "Dispatched", date: "Pending", desc: "Aura drops preparing at warehouse.", done: false },
        { status: "Transit Out", date: "Pending", desc: "Courier logistics assignment.", done: false },
        { status: "Arrived", date: "Pending", desc: "Delivery completed safely.", done: false }
      ],
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      rewardsPointsEarned: pointsAwarded
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // purge active bag
    setIsCheckoutMode(false);
    setActiveTab("dashboard");

    // Upgrade profile reward points state
    setUserProfile((prev) => ({
      ...prev,
      rewardsPoints: prev.rewardsPoints + pointsAwarded
    }));

    setNotifications((prev) => [
      {
        id: `order-placed-notif-${Date.now()}`,
        title: "📦 Style Drop Confirmed!",
        message: `Your order ${newOrder.id} has been added successfully. Track delivery steps instantly inside your dashboard.`,
        time: "Just now",
        read: false,
        type: "order"
      },
      ...prev
    ]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("shop");
  };

  // Add customized customer reviews to matching catalog details
  const handlePostReview = (productId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      userName: newReviewName,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: newReviewComment,
      verifiedPurchase: true,
      likes: 0
    };

    setLocalReviews((prev) => ({
      ...prev,
      [productId]: [newRev, ...(prev[productId] || [])]
    }));

    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setUserProfile((prev) => ({
      ...prev,
      rewardsPoints: prev.rewardsPoints + 50 // award 50 points on subscribing
    }));
    setNotifications((prev) => [
      {
        id: `notif-news-${Date.now()}`,
        title: "✉️ Newsletter Subscriber Reward",
        message: "Thanks for joining our GENZ drip crew! We've credited +50 points bonus towards your drops.",
        time: "Just now",
        read: false,
        type: "offer"
      },
      ...prev
    ]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Bundle buy deals for specific Lifestyles (Buy actual curated combos!)
  const handleBuyLifestyleBundle = (collectionName: string) => {
    const relatedProducts = PRODUCTS.filter((p) => p.lifestyleCollections.includes(collectionName));
    if (relatedProducts.length === 0) return;

    relatedProducts.slice(0, 3).forEach((p) => {
      handleAddToCart(p, p.colors?.[0], p.sizes?.[0]);
    });

    setIsCartOpen(true);

    const newNotif: Notification = {
      id: `bundle-buy-${Date.now()}`,
      title: "🎁 Bundle Drop Applied",
      message: `The 3-item ${collectionName} blueprint has been stacked into your drop bag for premium checkout combo savings!`,
      time: "Just now",
      read: false,
      type: "offer"
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Filter Catalog computations
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lifestyleStory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = catalogCategory === "all" || p.category === catalogCategory;
    const matchesPrice = p.price <= catalogPriceRange;
    const matchesStock = !onlyInStock || p.isLimitedStock || p.isFastSelling;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex flex-col font-sans text-slate-800 pb-16 lg:pb-0">
      {/* Sticky Header Nav */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Tab Routing */}
      <main className="flex-grow">
        {isCheckoutMode ? (
          <Checkout
            cartItems={cart}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setIsCheckoutMode(false)}
          />
        ) : (
          <>
            {/* HUB HOME PAGE */}
            {activeTab === "home" && (
              <div className="space-y-12">
                {/* Full-screen immersive Hero frame */}
                <section className="relative overflow-hidden bg-slate-900 text-white min-h-[500px] flex items-center px-4 sm:px-8 py-12">
                  <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop')" }} />
                  
                  {/* Glass geometric visual floats */}
                  <div className="absolute top-10 right-1/4 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

                  <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                      <span className="p-1 px-3 bg-white/10 backdrop-blur-md text-orange-400 text-xs font-black uppercase tracking-widest rounded-full border border-white/5">
                        ✨ STYLING THE NEXT GENERATION
                      </span>
                      <h1 id="home-hero-headline" className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight uppercase">
                        Shop the Future <br />of <span className="text-violet-400">Fashion & Tech</span>
                      </h1>
                      <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans mt-2">
                        Ditch generic, stale grid categories. Explore complete wearable streetwear bundles, smart desk companion displays, and bio-tracking controllers.
                      </p>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                        <button
                          onClick={() => setActiveTab("shop")}
                          className="px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg hover:shadow-violet-800/30 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          Start Exploring Drops <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveTab("trends")}
                          className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-black rounded-2xl border border-white/10 transition-all cursor-pointer"
                        >
                          Discover Trends
                        </button>
                      </div>
                    </div>

                    {/* Animated visual display grid holding a signature item */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950 p-4 w-full max-w-[340px] animate-float-fade">
                        <img
                          src={PRODUCTS[0].image}
                          alt="Varsity Jacket"
                          referrerPolicy="no-referrer"
                          className="h-64 w-full object-cover rounded-2xl"
                        />
                        <div className="pt-3 text-center space-y-1">
                          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Featured Drip blueprint</span>
                          <h4 className="font-display font-bold text-sm text-white truncate">{PRODUCTS[0].name}</h4>
                          <span className="text-xs font-black text-rose-400">₹{PRODUCTS[0].price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AI SHOPPING ASSISTANT INLINE SECTION */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6">
                  <AIShoppingAssistant
                    products={PRODUCTS}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={setSelectedProduct}
                  />
                </section>

                {/* SHOP BY LIFESTYLE COLLECTION SECTORS */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-black uppercase text-violet-600 tracking-wider font-sans">
                      Modular Blueprints
                    </span>
                    <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight mt-1">
                      Shop By Lifestyle, Not Just Products
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                      Each blueprint packs matching fashion hoodies, mechanical linear keys, water-resistant crossbody bags, and visual companions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {LIFESTYLES.slice(0, 8).map((style) => (
                      <div
                        key={style.id}
                        className="group relative rounded-2xl p-4 sm:p-5 border border-slate-100 bg-white shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[160px]"
                        onClick={() => {
                          setActiveLifestyle(style.id);
                          setActiveTab("lifestyles");
                        }}
                      >
                        <div>
                          <div className="p-2 bg-violet-50 text-violet-600 rounded-xl w-fit group-hover:bg-violet-600 group-hover:text-white transition-all">
                            <Sparkles className="w-5 h-5 fill-transparent group-hover:fill-white" />
                          </div>
                          <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 mt-3 group-hover:text-violet-700 transition-colors">
                            {style.label}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {style.desc}
                          </p>
                        </div>

                        <span className="text-[10px] uppercase font-mono font-bold text-violet-600 mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          Curate Combo <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* TRENDING NOW: Pinterest-style layout */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-black uppercase text-violet-600 tracking-wider">Buzzing inventory</span>
                      <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight mt-1">Trending Now drops</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("shop")}
                      className="text-xs font-bold text-violet-600 hover:text-slate-800 flex items-center gap-1"
                    >
                      Browse Catalogue <ChevronRight className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 4).map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={handleAddToCart}
                        onSelectProduct={setSelectedProduct}
                        isWishlisted={wishlist.includes(p.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                </section>

                {/* FLASH SALES ARENA */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6">
                  <div className="rounded-3xl bg-linear-to-r from-red-500 to-orange-500 p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1.5 text-center sm:text-left">
                      <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        <Flame className="w-3.5 h-3.5 fill-white animate-pulse" /> DEALS CORNER
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl leading-none">FLASH RE-DROPS ACTIVATED</h3>
                      <p className="text-xs text-red-50 max-w-md">
                        Grab the mechanical linear boards, thermal hydration flasks, and retro camcorders at flat discounted rates.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab("offers")}
                      className="px-5 py-3 bg-white text-slate-900 text-xs font-black rounded-xl hover:bg-slate-55 shadow-sm shrink-0 uppercase transition-shadow cursor-pointer"
                    >
                      Foil Offers Gate
                    </button>
                  </div>
                </section>

                {/* NEWSLETTER ENTRANCES */}
                <section className="mx-auto max-w-md px-4 sm:px-6 py-6 text-center space-y-4">
                  <div>
                    <h3 className="font-display font-black text-lg sm:text-xl text-slate-800">Join the GENZ Community</h3>
                    <p className="text-xs text-slate-500 mt-1">Get early access alerts on monthly drop blueprints and exclusive student discount codes.</p>
                  </div>

                  {newsletterSubscribed ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-700 text-xs font-bold shadow-2xs">
                      <Check className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
                      <span>Welcome to the crew! We credited +50 points drop rewards to your tab balance.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-violet-500">
                      <input
                        id="newsletter-textbox"
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter email..."
                        className="flex-1 text-xs px-3 py-2 bg-transparent focus:outline-hidden text-slate-700 font-medium"
                      />
                      <button
                        type="submit"
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 py-2 text-xs font-bold font-button shadow-xs shrink-0 cursor-pointer"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </section>
              </div>
            )}

            {/* SHOP drop page CATALOG */}
            {activeTab === "shop" && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Advanced filters card panel (Column span 3) */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs sticky top-20">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xs sm:text-sm font-display font-black text-slate-800 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-4.5 h-4.5 text-slate-500" /> Smart Filters
                      </h3>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-[10px] font-bold text-violet-600 hover:text-slate-800"
                        >
                          Clear Search
                        </button>
                      )}
                    </div>

                    <div className="space-y-6 text-xs text-slate-600">
                      {/* Search box inline */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search text:</label>
                        <div className="relative">
                          <input
                            id="catalog-searchbox-inline"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type keyword..."
                            className="w-full pl-8 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-xl focus:outline-hidden"
                          />
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Categories filter */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category drop:</label>
                        <div className="flex flex-col gap-1.5">
                          {["all", "fashion", "gadgets", "accessories", "smart-living"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setCatalogCategory(cat)}
                              className={`text-left p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                catalogCategory === cat
                                  ? "bg-violet-50 text-violet-700 border-violet-100"
                                  : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                              }`}
                            >
                              {cat === "all" ? "All Drops" : cat.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price margins slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>Max Price due:</span>
                          <span className="font-mono text-slate-800 font-extrabold text-[11px]">₹{catalogPriceRange}</span>
                        </div>
                        <input
                          id="price-range-slider"
                          type="range"
                          min="1000"
                          max="10000"
                          step="500"
                          value={catalogPriceRange}
                          onChange={(e) => setCatalogPriceRange(Number(e.target.value))}
                          className="w-full accent-violet-600 cursor-pointer"
                        />
                      </div>

                      {/* Stock filters */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <input
                          id="checkbox-instock"
                          type="checkbox"
                          checked={onlyInStock}
                          onChange={(e) => setOnlyInStock(e.target.checked)}
                          className="h-4 w-4 rounded-sm border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                        />
                        <label htmlFor="checkbox-instock" className="text-xs font-bold text-slate-700 select-none cursor-pointer">
                          Only limited stock / Fast Selling item drops
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products catalogs display grid (Column span 9) */}
                <div className="lg:col-span-9 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      Catalog Matches: {filteredProducts.length} items
                    </span>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl">
                      <SlidersHorizontal className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                      <h4 className="font-display font-extrabold text-slate-700 text-sm sm:text-base">No drops found</h4>
                      <p className="text-xs text-slate-400 mt-1">Adjust your filters parameters to align matching inventory items.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          onAddToCart={handleAddToCart}
                          onSelectProduct={setSelectedProduct}
                          isWishlisted={wishlist.includes(p.id)}
                          onToggleWishlist={handleToggleWishlist}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LIFESTYLES COLLECTIONS DETAILED CATALOG */}
            {activeTab === "lifestyles" && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-10">
                {/* Visual horizontal scroll categories selector bar */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin">
                  {LIFESTYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setActiveLifestyle(style.id)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all border cursor-pointer ${
                        activeLifestyle === style.id
                          ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-100"
                          : "bg-white border-slate-100 text-slate-600 hover:text-slate-800 hover:border-slate-300"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>

                {/* Active Lifestyle curation hero bundle highlight */}
                {(() => {
                  const styleData = LIFESTYLES.find((style) => style.id === activeLifestyle);
                  const matchingItems = PRODUCTS.filter((p) => p.lifestyleCollections.includes(activeLifestyle));
                  if (!styleData) return null;

                  return (
                    <div className="space-y-8">
                      {/* Interactive bundle purchase drop box */}
                      <div className="rounded-3xl bg-linear-to-b from-violet-500/10 to-transparent border border-violet-100 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                          <span className="p-1 px-2 bg-violet-600 text-white text-[10px] font-black uppercase rounded-lg tracking-wider">
                            Lifestyle Blueprint
                          </span>
                          <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                            {styleData.label} Curated Pack
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
                            {styleData.desc} Add this complete pack to details drop bag in one stroke.
                          </p>
                        </div>

                        <button
                          id={`btn-buy-bundle-${styleData.id}`}
                          onClick={() => handleBuyLifestyleBundle(styleData.id)}
                          className="px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black rounded-2xl shadow-md uppercase transition-shadow flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <ShoppingBagIcon className="w-4 h-4 fill-white" />
                          <span>Insta-Buy Complete Bundle Drop</span>
                        </button>
                      </div>

                      {/* Display items matching lifestyle */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          Inventory checklist for {styleData.label} Blueprint ({matchingItems.length} items)
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {matchingItems.map((p) => (
                            <ProductCard
                              key={p.id}
                              product={p}
                              onAddToCart={handleAddToCart}
                              onSelectProduct={setSelectedProduct}
                              isWishlisted={wishlist.includes(p.id)}
                              onToggleWishlist={handleToggleWishlist}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* EDITORIAL TRENDS PAGE */}
            {activeTab === "trends" && (
              <TrendHub
                trends={TRENDS}
                productsPool={PRODUCTS}
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* OFFERS DISCOUNTS PAGE */}
            {activeTab === "offers" && (
              <Offers
                onVerifyStudentStatus={handleVerifyStudentStatus}
                isStudentVerified={userProfile.studentIdVerified}
              />
            )}

            {/* ABOUT BRAND MANIFESTO */}
            {activeTab === "about" && <AboutUs />}

            {/* CONTACT CHATS PANEL */}
            {activeTab === "contact" && <Contact />}

            {/* DEVELOPER DASHBAORD SETUPS */}
            {activeTab === "dashboard" && (
              <Dashboard
                userProfile={userProfile}
                orders={orders}
                wishlist={wishlist}
                notifications={notifications}
                productsPool={PRODUCTS}
                onRemoveFromWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onSelectProduct={setSelectedProduct}
                onClearNotifications={handleClearNotifications}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Cart sidebar overlay */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutMode(true);
        }}
        productsPool={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* DETAILED LUXURIOUS PRODUCT DETAILS OVERLAYS */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setSelectedProduct(null)} />

          <div className="relative bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin">
            {/* Gallery Left (Column span 6) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={galleryActiveImage || selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slider thumbs */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedProduct.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryActiveImage(imgUrl)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border cursor-pointer ${
                        (galleryActiveImage || selectedProduct.image) === imgUrl
                          ? "border-violet-600 ring-2 ring-violet-50"
                          : "border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail drop" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Right (Column span 6) */}
            <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                  <span className="p-1 px-2.5 rounded-lg bg-violet-100 text-violet-700 font-sans font-bold text-[10px] uppercase">
                    {selectedProduct.category}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="font-display font-extrabold text-base sm:text-xl text-slate-800 leading-snug mt-3">
                  {selectedProduct.name}
                </h3>

                {/* Rating and Reviews count */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-3">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-semibold text-slate-755 ml-1 mt-0.5">{selectedProduct.rating}</span>
                  </div>
                  <span>•</span>
                  <span className="mt-0.5">{selectedProduct.reviewsCount} verified reviews</span>
                </div>

                {/* Cost tags */}
                <div className="flex items-end gap-2 text-slate-850">
                  <span className="text-xs text-slate-400 line-through">₹{selectedProduct.originalPrice}</span>
                  <span className="font-display font-extrabold text-lg sm:text-xl text-violet-700 tracking-tight leading-none">
                    ₹{selectedProduct.price}
                  </span>
                </div>

                {/* Lifestyle stories narrative */}
                <div className="mt-4 p-3 bg-slate-50/70 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] uppercase font-bold text-violet-600 block mb-1">Stylist Blueprints narrative:</span>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{selectedProduct.lifestyleStory}</p>
                </div>

                {/* Size selections */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && selectedProduct.sizes[0] !== "One Size" && (
                  <div className="mt-4 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Fit Sizing:</label>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors selections */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && selectedProduct.colors[0] !== "One Size" && (
                  <div className="mt-4 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Hue/Color Colorway:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedColor === col
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs sheets table */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-2">Detailed Specifications</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-500">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 p-2 rounded-xl">
                        <span className="font-bold text-slate-700 block">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action purchase checkout buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2 w-full">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, selectedColor, selectedSize);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition-shadow cursor-pointer"
                >
                  Buy Drop Deal Now
                </button>
                <button
                  onClick={() => handleToggleWishlist(selectedProduct.id)}
                  className={`flex items-center justify-center p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                    wishlist.includes(selectedProduct.id)
                      ? "bg-rose-50 border-rose-200 text-rose-500"
                      : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50/55"
                  }`}
                  title="Heart this blueprint"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Verified User Reviews Section inside detail modals */}
              <div className="border-t border-slate-100 pt-4 mt-4 space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Verified User Reviews</h4>
                
                {/* Write a review forms */}
                <form onSubmit={(e) => handlePostReview(selectedProduct.id, e)} className="p-3 bg-slate-50 rounded-2xl space-y-2.5">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Review this Drop</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      id="review-name-textbox"
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="Your Alias"
                      className="col-span-2 text-[11px] font-bold border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden bg-white text-slate-700"
                    />
                    <select
                      id="review-rating-selectbox"
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="text-[11px] font-bold border border-slate-200 rounded-lg px-1 py-1.5 focus:outline-hidden bg-white text-slate-700"
                    >
                      <option value={5}>⭐ 5 Stars</option>
                      <option value={4}>⭐ 4 Stars</option>
                      <option value={3}>⭐ 3 Stars</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      id="review-comment-textbox"
                      type="text"
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Write comment..."
                      className="w-full text-[11px] font-bold border border-slate-200 rounded-lg pl-2.5 pr-8 py-1.5 focus:outline-hidden bg-white text-slate-700"
                    />
                    <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-violet-600 hover:text-violet-800 text-xs font-bold leading-none cursor-pointer">
                      Send
                    </button>
                  </div>
                </form>

                {/* Display reviews pools */}
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {[...(localReviews[selectedProduct.id] || []), ...REVIEWS_POOL].map((rev) => (
                    <div key={rev.id} className="p-2 border border-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                        <span className="text-slate-700">{rev.userName}</span>
                        <span>{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern bottom tab navigation bar for responsive mobile formats */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Aesthetic humblest custom credits footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs text-center py-6 border-t border-slate-800/80 mt-auto">
        <p className="font-display font-medium">GENZ Fashion Store • Discover Trends. Define Your Lifestyle.</p>
        <p className="text-[10px] text-slate-500 mt-1 font-mono">© 2026 GENZ Fashion Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
