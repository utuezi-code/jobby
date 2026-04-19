import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 bg-night-950 relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-5">Ready to apply?</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
          Land more interviews
          <br />
          <span className="gradient-text">starting today</span>
        </h2>
        <p className="text-night-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Your first two optimizations are completely free. No account required.
          Upload your CV and a job description — we do the rest.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 bg-white hover:bg-night-100 text-night-900 font-bold text-[16px] px-8 py-4 rounded-xl shadow-xl transition-all duration-200"
          >
            Optimize my CV — free
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>
        <p className="text-night-600 text-sm mt-6">No credit card · 2 free optimizations · Cancel anytime</p>
      </div>
    </section>
  );
}
