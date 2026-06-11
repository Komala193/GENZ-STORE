import React, { useState } from "react";
import { TrendPost, Product } from "../types";
import { Flame, Eye, ThumbsUp, MessageSquare, ArrowRight, BookOpen, Clock } from "lucide-react";

interface TrendHubProps {
  trends: TrendPost[];
  productsPool: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
}

export const TrendHub: React.FC<TrendHubProps> = ({
  trends,
  productsPool,
  onSelectProduct,
  onAddToCart
}) => {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [activeArticle, setActiveArticle] = useState<TrendPost | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Top main editorial hero post
  const mainPost = trends[0];
  const secondaryPosts = trends.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="p-1 px-3 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-full tracking-wider">
          Style Droplet Magazine
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mt-3">
          GENZ <span className="text-violet-600">TREND BULLETIN</span> Hub
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Weekly analysis of micro-trends, room acoustics, aesthetic fits, and bedroom hacks. Updated in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main large editorial card (Column span 7) */}
        {mainPost && (
          <div className="lg:col-span-8 space-y-6">
            <div
              className="group relative rounded-3xl overflow-hidden border border-slate-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setActiveArticle(mainPost)}
            >
              {/* Feature photo */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-50">
                <img
                  src={mainPost.image}
                  alt={mainPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="absolute top-4 left-4 bg-violet-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {mainPost.category}
                </span>
              </div>

              {/* Text content details */}
              <div className="pt-4 space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mainPost.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {(mainPost.views + (likes[mainPost.id] || 0) * 4)} views</span>
                </div>

                <h3 className="font-display font-extrabold text-lg sm:text-2xl text-slate-900 hover:text-violet-700 leading-tight">
                  {mainPost.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {mainPost.excerpt}
                </p>

                {/* Hot item link in lined */}
                {mainPost.relatedProductId && (
                  <div className="p-4 rounded-2xl bg-violet-50/50 border border-violet-100/20 mt-4 flex items-center justify-between">
                    {(() => {
                      const relatedProd = productsPool.find((p) => p.id === mainPost.relatedProductId);
                      if (!relatedProd) return null;
                      return (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={relatedProd.image}
                              alt={relatedProd.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover rounded-xl bg-white shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[9px] font-black text-violet-600 block uppercase">Featured drop blueprint:</span>
                              <h4 className="text-xs font-bold text-slate-800 truncate">{relatedProd.name}</h4>
                              <p className="text-[11px] font-extrabold text-slate-900 mt-0.5">₹{relatedProd.price}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(relatedProd, relatedProd.colors?.[0], relatedProd.sizes?.[0]);
                            }}
                            className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                          >
                            Shop Fit
                          </button>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Social metrics */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold">
                    <button
                      onClick={(e) => handleLike(mainPost.id, e)}
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{mainPost.likes + (likes[mainPost.id] || 0)} Likes</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{mainPost.commentsCount} Columns</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(mainPost)}
                    className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-800"
                  >
                    <span>Read Article</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Column 2: Side secondary list cards (Column span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50/50 rounded-3xl border border-slate-200/50 p-4 sm:p-5">
            <h3 className="text-sm font-display font-black text-slate-800 mb-4 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              HOT ON SOCIALS
            </h3>

            <div className="space-y-4">
              {secondaryPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActiveArticle(post)}
                  className="group bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2.5"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-violet-600 uppercase tracking-widest block">
                      {post.category}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 group-hover:text-violet-600 line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-50">
                      <span>{post.readTime}</span>
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3 text-slate-400" />
                        <span>{post.likes + (likes[post.id] || 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Full-View modal overlay */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={() => setActiveArticle(null)} />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="bg-violet-50 text-violet-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl bg-slate-50"
            />

            <h3 className="font-display font-extrabold text-lg sm:text-2xl text-slate-900 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                As our shopping behaviours shift towards digital ecosystems, we're noticing a massive trend where individual expression is aligned entirely to room setups, desks, and streetwear drop blueprints.
              </p>
              <p>
                Ditching standardized silhouettes in favor of heavyweight organic cotton and multi-pocket tactical utility cargo wear represents a major pivot. Our current drops offer maximum durability for out-of-dorm activities while reflecting clean visual balance.
              </p>
              <p>
                We highly recommend checking out any corresponding accessories or techwear layers highlighted inside this drop catalogue to establish unified looks that low-key slide perfectly into high-fashion aesthetics.
              </p>
            </div>

            {/* Related buy prompt */}
            {activeArticle.relatedProductId && (
              <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 mt-2">
                {(() => {
                  const p = productsPool.find((prod) => prod.id === activeArticle.relatedProductId);
                  if (!p) return null;
                  return (
                    <>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg bg-white shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{p.name}</h4>
                          <p className="text-[11px] font-extrabold text-slate-900 mt-0.5">₹{p.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onAddToCart(p, p.colors?.[0], p.sizes?.[0]);
                          setActiveArticle(null);
                        }}
                        className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white rounded-xl cursor-pointer"
                      >
                        Add to Drop Bag
                      </button>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TrendHub;
