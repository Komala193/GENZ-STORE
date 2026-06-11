import React, { useState, useRef, useEffect } from "react";
import { Product } from "../types";
import { Sparkles, Send, Bot, User, Flame, ShoppingCart, Loader2 } from "lucide-react";

interface AIShoppingAssistantProps {
  products: Product[];
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

interface Message {
  role: "user" | "model";
  text: string;
  recommendedProductIds?: string[];
  time: string;
}

export const AIShoppingAssistant: React.FC<AIShoppingAssistantProps> = ({
  products,
  onAddToCart,
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Yo! Let's check your vibe. I'm your GENZ Personal Lifestyle Stylist. Tell me what vibe we are building today—whether that's a retro campus outfit or an ultra-clean RGB bedroom configuration. I've got you covered with our real products!",
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const prefilledPrompts = [
    { text: "Outfit for college courtyard", label: "🏫 College Fit" },
    { text: "Neon gaming desk setup budget", label: "🎮 Gaming Setup" },
    { text: "Travel accessories for long flights", label: "✈️ Travel Ready" },
    { text: "Smart home ambient hacks", label: "💡 Smart Living" }
  ];

  const handleSendPrompt = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text })
      });

      if (!response.ok) {
        throw new Error("Failed to get streaming or basic response from GenZ advisor.");
      }

      const data = await response.json();
      const botMessage: Message = {
        role: "model",
        text: data.text,
        recommendedProductIds: data.recommendedProductIds || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "My signal is fluctuating a bit out there! Try pairing our Heavyweight Hoodie or Matte Noise Cancelling headphones for an instant aesthetic bump while I restore my connection grid.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-linear-to-b from-violet-50/40 to-slate-50/40 p-4 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Visual Ambient glowing orb backdrop */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Accent */}
      <div className="flex items-center justify-between mb-5 border-b border-violet-100/60 pb-4">
        <div id="ai-assistant-heading" className="flex items-center gap-2.5">
          <div className="gradient-bg p-2 rounded-xl text-white shadow-md animate-glow-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-800 tracking-tight flex items-center gap-1.5">
              AI Vibe Stylist
              <span className="bg-violet-100 text-violet-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-sans font-bold leading-normal">
                Active 24/7
              </span>
            </h3>
            <p className="text-xs text-slate-500">Shop by lifestyle recommendations instantly</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-600 px-3 py-1 bg-violet-50 rounded-full border border-violet-100/30">
          <Bot className="w-4 h-4 text-violet-500" />
          <span className="hidden sm:inline">Ask Fashion advice</span>
        </div>
      </div>

      {/* Chat Bubble Hub */}
      <div className="h-[280px] sm:h-[350px] overflow-y-auto pr-2 space-y-4 mb-4 scrollbar-thin">
        {messages.map((msg, index) => {
          const isBot = msg.role === "model";
          return (
            <div key={index} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
              <div className="flex items-center gap-2 mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {isBot ? <Bot className="w-3.5 h-3.5 text-violet-500" /> : <User className="w-3.5 h-3.5 text-slate-500" />}
                <span>{isBot ? "Stylist" : "You"}</span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>

              {/* Text cloud bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isBot
                    ? "bg-white border border-slate-100 text-slate-700 rounded-tl-sm font-sans"
                    : "bg-violet-600 text-white rounded-tr-sm font-sans"
                }`}
              >
                {msg.text.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                    {para}
                  </p>
                ))}

                {/* Display recommended products cards inlined under bot recommendations! */}
                {isBot && msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> Curated Inventory matches:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {products
                        .filter((p) => msg.recommendedProductIds?.includes(p.id))
                        .map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 transition-colors"
                            onClick={() => onSelectProduct(p)}
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-lg bg-white shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11px] font-bold text-slate-700 truncate">{p.name}</h4>
                              <p className="text-[10px] font-extrabold text-slate-900 mt-0.5">₹{p.price}</p>
                            </div>
                            <button
                              id={`ai-add-${p.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(p, p.colors?.[0], p.sizes?.[0]);
                              }}
                              className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg p-1.5 shadow-sm shrink-0 transition-colors"
                              title="Quick-add to cart"
                            >
                              <ShoppingCart className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1 text-[10px] font-bold text-slate-400">
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              <span>Analyzing your vibe...</span>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-xs font-medium text-slate-500 shadow-xs">
              <Loader2 className="w-4 h-4 text-violet-500 animate-spin" />
              <span>Checking store inventory for styles...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Prompts Row */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {prefilledPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(p.text)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-600 border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Frame */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(inputText);
        }}
        className="relative flex items-center gap-1.5 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-violet-500 transition-all"
      >
        <input
          id="assistant-textbox"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask us: Outfits for college? Gaming audio setups?"
          disabled={loading}
          className="flex-1 text-sm text-slate-700 placeholder-slate-400 px-3 py-2 bg-transparent focus:outline-hidden disabled:opacity-50"
        />
        <button
          id="btn-send-assistant"
          type="submit"
          disabled={!inputText.trim() || loading}
          className="flex items-center justify-center p-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:bg-slate-100 disabled:text-slate-400 transition-colors shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
export default AIShoppingAssistant;
