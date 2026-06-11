import React from "react";
import { Product } from "../types";
import { Star, Flame, ShoppingBag, Heart, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2"
    >
      {/* Dynamic Tags */}
      <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {product.isFastSelling && (
          <span className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-white uppercase">
            <Flame className="w-3 h-3 fill-white animate-pulse" /> FAST SELLING
          </span>
        )}
        {product.isLimitedStock && (
          <span className="bg-red-500/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-white uppercase">
            ONLY {product.limitedStockCount} LEFT
          </span>
        )}
        {product.trendingBadges?.map((badge, idx) => (
          <span
            key={idx}
            className="bg-zinc-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-white uppercase"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Trend Score Ring */}
      <div className="absolute top-5 right-5 z-10">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-violet-700 shadow-sm border border-violet-100/30">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span>HV {product.trendScore}%</span>
        </div>
      </div>

      {/* Product Image Stage */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft shadow transition layer */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover quick-action visual bar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            id={`btn-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-lg hover:bg-slate-50 border border-slate-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" /> Quick View
          </button>
        </div>
      </div>

      {/* Core Details Frame */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Rating and Reviews count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-semibold text-slate-700 ml-1 mt-0.5">{product.rating}</span>
          </div>
          <span>•</span>
          <span className="mt-0.5">{product.reviewsCount} verified vibes</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="font-display font-bold text-sm text-slate-800 leading-snug cursor-pointer hover:text-violet-700 line-clamp-2 min-h-[40px] mb-1.5"
        >
          {product.name}
        </h3>

        {/* Lifestyle story snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 min-h-[32px] font-sans leading-relaxed">
          {product.lifestyleStory}
        </p>

        {/* Price & Action Alignment */}
        <div className="mt-auto flex items-end justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
            <span className="font-display font-extrabold text-base text-slate-900 tracking-tight">
              ₹{product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`btn-wishlist-${product.id}`}
              onClick={() => onToggleWishlist(product.id)}
              className={`rounded-xl p-2 border transition-all ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50"
              }`}
              title={isWishlisted ? "Remove from Board" : "Heart this Vibe"}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
            </button>

            <button
              id={`btn-add-cart-${product.id}`}
              onClick={() => onAddToCart(product, product.colors?.[0], product.sizes?.[0])}
              className="flex items-center gap-1 rounded-xl bg-violet-600 hover:bg-violet-700 px-3 py-2 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
