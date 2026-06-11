import React, { useState, useEffect } from "react";
import { Copy, Check, Ticket, Award, Percent, Zap } from "lucide-react";

interface OffersProps {
  onVerifyStudentStatus: () => void;
  isStudentVerified: boolean;
}

export const Offers: React.FC<OffersProps> = ({ onVerifyStudentStatus, isStudentVerified }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Simulate flash sale countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // Loop back
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const vouchers = [
    { code: "STUDENT20", desc: "Save 20% flat on any outerwear or tech accessory drops. Student verified IDs required.", label: "Verified Student Exclusive" },
    { code: "VIBECHECK", desc: "Siphon 10% flat off your first collection drop order.", label: "Welcome Voucher" },
    { code: "DRIP15", desc: "Unlock 15% flat off when bundle fashion items with and gadgets.", label: "Bundle Boost Drop" }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-10">
      {/* Immersive Flash Sale Banner */}
      <div className="rounded-3xl bg-linear-to-r from-red-500 via-orange-500 to-amber-500 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-36 h-36 bg-black/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-white animate-bounce" /> FLASH DROPS ARENA
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-none">
            AURA UPGRADE IS ON
          </h2>
          <p className="text-xs sm:text-sm text-red-50 max-w-md font-medium">
            Limited stock drops are currently listed at marked down rates. Check out fast before styles vanish!
          </p>
        </div>

        {/* Cooldown Timer */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 text-center shrink-0 min-w-[220px]">
          <span className="text-[10px] uppercase font-bold text-red-100 block mb-2 tracking-widest">Drops Reset In</span>
          <div className="flex items-center justify-center gap-3 font-mono text-xl sm:text-2xl font-black">
            <div className="bg-slate-900/40 p-2 rounded-xl min-w-[44px]">{String(timeLeft.hours).padStart(2, "0")}h</div>
            <span className="animate-pulse">:</span>
            <div className="bg-slate-900/40 p-2 rounded-xl min-w-[44px]">{String(timeLeft.minutes).padStart(2, "0")}m</div>
            <span className="animate-pulse">:</span>
            <div className="bg-slate-900/40 p-2 rounded-xl min-w-[44px]">{String(timeLeft.seconds).padStart(2, "0")}s</div>
          </div>
        </div>
      </div>

      {/* Grid: Promo Codes & Student Claims */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Promo Coupons Cards (Column span 7) */}
        <div className="md:col-span-7 space-y-5">
          <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-violet-600" />
            Promo Vouchers Drawer
          </h3>

          <div className="space-y-4">
            {vouchers.map((v) => (
              <div
                key={v.code}
                className="rounded-2xl border border-slate-100 bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{v.label}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">{v.desc}</h4>
                </div>

                {/* Copy component button */}
                <button
                  id={`btn-copy-${v.code}`}
                  onClick={() => copyToClipboard(v.code)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    copiedCode === v.code
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-slate-55 border-slate-200 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {copiedCode === v.code ? <Check className="w-3.5 h-3.5 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === v.code ? "CLAIMED" : v.code}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Student Verification Portal (Column span 5) */}
        <div className="md:col-span-5">
          <div className="rounded-3xl border border-violet-100 bg-linear-to-b from-violet-50/40 to-slate-50/40 p-5 sm:p-6 shadow-md text-center space-y-4">
            <Award className="w-12 h-12 text-violet-600 mx-auto animate-bounce" />
            <div>
              <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-800">Verified Student Club</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Unlock a flat 20% student discount drop values forever (Verified via standard university portal links in seconds).
              </p>
            </div>

            {isStudentVerified ? (
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex items-center justify-center gap-2 text-emerald-700 text-xs font-bold">
                <Check className="w-4 h-4 text-emerald-500 font-extrabold" />
                <span>Student status verified! Voucher STUDENT20 claims active.</span>
              </div>
            ) : (
              <button
                id="btn-verify-student-status"
                onClick={onVerifyStudentStatus}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-xs font-black shadow-sm transition-colors cursor-pointer"
              >
                Connect Student verification
              </button>
            )}

            <p className="text-[10px] text-slate-400">
              Valid for colleges, high schools, coding academies, and boarding universities. Verification resets annually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offers;
