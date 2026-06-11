import React from "react";
import { Sparkles, Heart, Earth, Milestone } from "lucide-react";

export const AboutUs: React.FC = () => {
  const values = [
    { icon: <Sparkles className="w-6 h-6 text-violet-500" />, label: "Aura Preservation", desc: "We design elements curated around complete visual personalities, not generic wholesale stock blocks." },
    { icon: <Heart className="w-6 h-6 text-rose-500" />, label: "Genz Community Focused", desc: "Built by designers, for visual designers. Your drip check reviews and board feedback drive our weekly drop cycles." },
    { icon: <Earth className="w-6 h-6 text-emerald-500" />, label: "Sustainable Sourcing", desc: "Our heavyweight hoodies are loom-crafted from 100% Certified Organic ethical cotton with zero rain wastes." },
    { icon: <Milestone className="w-6 h-6 text-blue-500" />, label: "Seamless Technology Era", desc: "No clumsy setups or visual overheads. Complete lifestyle curations checked out in unified strokes." }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-12">
      {/* Brand Hero Story */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="p-1 px-3 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-full tracking-wider">
          Our Manifesto
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-none">
          Ditching Categories. Defining <span className="text-violet-600 font-black">Lifestyles.</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
          GENZ Fashion Store was born in 2026. Traditional web shops made us browse endless pages of tags. We believed shopping should follow your personality profile—fusing streetwear hoodies, Bluetooth mechanical boards, and ambient studio light nodes into matching drop bundles.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col text-center items-center space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-slate-55/35">
              {v.icon}
            </div>
            <h4 className="font-display font-extrabold text-sm text-slate-800">{v.label}</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Community Commitments */}
      <div className="rounded-3xl bg-linear-to-b from-slate-900 via-slate-900 to-violet-950 p-6 sm:p-8 text-white text-center sm:text-left shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-xl">
          <h3 className="font-display font-black text-lg sm:text-xl text-white">Our Promise of Quality</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every outerwear piece, accessory bag, and smart living companion in our warehouse undergoes thorough vibe and safety benchmarks before drop cycles. We stand behind our drops with zero-question 7-day returns.
          </p>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 text-center sm:text-left shrink-0">
          <span className="font-display font-black text-3xl sm:text-4xl text-violet-400 block leading-none">100%</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Aesthetic Satisfaction certified</span>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
