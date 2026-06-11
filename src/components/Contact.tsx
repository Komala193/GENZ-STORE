import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle } from "lucide-react";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Mock Live Chat state
  const [chatLog, setChatLog] = useState([
    { role: "support", text: "Welcome to GENZ Support. Click one of these common inquiries to instant-resolve your delivery!" }
  ]);

  const commonQuestions = [
    { label: "📦 Tracking Status?", answer: "All style drops are shipped within 24 hours. Once dispatched, you can view your real-time tracking steps inside the Me Dashboard." },
    { label: "💳 Refund Rules?", answer: "Zero-questions asked returns! If the fit isn't right, package the drop and write to us within 7 days for full bank credits." },
    { label: "🎓 Verify Student?", answer: "Simply link your academic portal credentials on our Offers page to instantly activate 20% flat discount vouchers!" }
  ];

  const handleSelectQuestion = (q: typeof commonQuestions[0]) => {
    setChatLog((prev) => [
      ...prev,
      { role: "user", text: q.label },
      { role: "support", text: q.answer }
    ]);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMsg("");
      setSubmitted(false);
      alert("Style report feedback received! We will write back to you within 4 hours.");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="p-1 px-3 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-full tracking-wider">
          Support Hub
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mt-3">
          VIBE CHECK OUR <span className="text-violet-600 font-extrabold">TEAM</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Questions about shipments, sizing checks, or special designer partnerships? Get in touch with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info & Support Mail form (Column span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4">
              Write a Stylist Report
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Alias Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/35 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  University / Personal Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aarav@uni.edu"
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/35 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Query Details
                </label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Ask us anything about sizes, tech specifications, or customized combo drop deals..."
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-violet-300 bg-slate-55/35 text-slate-700 resize-none"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={submitted}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700 py-3 px-4 text-xs font-black text-white shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitted ? "Filing stylist feedback..." : "Submit Report"}</span>
              </button>
            </form>
          </div>

          {/* Grid contact contact specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center space-y-1.5 shadow-2xs">
              <Phone className="w-5 h-5 text-violet-500 mx-auto" />
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call support</h4>
              <p className="text-xs font-bold text-slate-800">+91 11-4090-5026</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center space-y-1.5 shadow-2xs">
              <Mail className="w-5 h-5 text-orange-500 mx-auto" />
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drop emails</h4>
              <p className="text-xs font-bold text-slate-800">support@genzstore.in</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center space-y-1.5 shadow-2xs">
              <MapPin className="w-5 h-5 text-emerald-500 mx-auto" />
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Headquarters</h4>
              <p className="text-xs font-bold text-slate-800">New Delhi, DL</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Support Live Chat Simulator (Column span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-violet-100 bg-linear-to-b from-violet-50/40 to-slate-50/40 p-4 sm:p-5 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-2 pb-3 border-b border-violet-100/50">
              <div className="p-1 px-2 rounded-lg bg-violet-600 text-white text-[10px] font-black animate-pulse">LIVE</div>
              <h3 className="text-xs sm:text-sm font-display font-black text-slate-800">Instant Support Chat</h3>
            </div>

            {/* Support chat dialogs log */}
            <div className="h-[220px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {chatLog.map((chat, idx) => {
                const isSupport = chat.role === "support";
                return (
                  <div key={idx} className={`flex flex-col ${isSupport ? "items-start" : "items-end"}`}>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                      {isSupport ? <MessageSquare className="w-3 h-3 text-violet-500" /> : null}
                      <span>{isSupport ? "Crew Bot" : "You"}</span>
                    </div>
                    <p className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      isSupport
                        ? "bg-white border border-slate-100 text-slate-700"
                        : "bg-violet-600 text-white"
                    }`}>
                      {chat.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick action Questions */}
            <div className="space-y-1.5 pt-2 border-t border-violet-100/30">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Select standard inquiry:</span>
              <div className="flex flex-col gap-1.5">
                {commonQuestions.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => handleSelectQuestion(q)}
                    className="w-full text-left p-2 bg-white hover:bg-violet-50/50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-700 truncate transition-colors cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Mockup frame */}
          <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-2xs relative">
            {/* Styled Mockup Map Graphics */}
            <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              {/* Fake streets layout lines */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#000" strokeWidth="8" />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="#000" strokeWidth="8" />
                  <line x1="280" y1="0" x2="280" y2="200" stroke="#000" strokeWidth="6" />
                  <circle cx="100" cy="50" r="16" fill="#000" />
                </svg>
              </div>

              {/* Dynamic Coordinate pin */}
              <div className="absolute top-[48px] left-[98px] z-10 flex flex-col items-center">
                <MapPin className="w-6 h-6 text-violet-600 fill-violet-700 animate-bounce" />
                <span className="bg-slate-900 border border-slate-800 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-lg mt-0.5">
                  MG ROAD STORE
                </span>
              </div>

              {/* Ambient visual overlay coordinates text */}
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 font-bold">
                LAT: 28.6139° N • LON: 77.2090° E
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
