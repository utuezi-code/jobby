import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white mesh-bg pt-16">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-200 bg-brand-50 text-brand-600 text-xs font-semibold mb-8 shadow-sm">
          <Sparkles size={12} />
          AI-powered · No hallucination · No lies
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black leading-[1.05] tracking-tight text-night-900 mb-6 max-w-5xl mx-auto">
          Your CV,{" "}
          <span className="gradient-text">perfectly aligned</span>
          <br className="hidden sm:block" />
          {" "}for every job
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-night-500 max-w-2xl mx-auto mb-10 leading-relaxed font-[400]">
          Paste a job offer. Get your CV rewritten in seconds — smarter keywords,
          better structure, same honest you.{" "}
          <span className="text-night-700 font-medium">No invented skills. Ever.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200"
          >
            Optimize my CV — free
            <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-night-600 hover:text-night-900 font-medium text-[15px] px-4 py-3.5 rounded-xl hover:bg-night-100 transition-all duration-150"
          >
            See how it works
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 mb-16 text-sm text-night-400 font-medium">
          {[
            "No credit card required",
            "2 free optimizations",
            "PDF & DOCX export",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-green-500" />
              {t}
            </span>
          ))}
        </div>

        {/* Product mockup */}
        <div className="relative max-w-4xl mx-auto">
          {/* Outer glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-b from-brand-500/20 to-green-500/10 blur-2xl" />

          <div className="relative rounded-2xl border border-night-200 bg-white shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-night-50 border-b border-night-100">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-night-400 font-mono bg-white border border-night-200 rounded-md px-3 py-1">
                  cvmatch.ai/app
                </span>
              </div>
            </div>

            {/* App content */}
            <div className="grid grid-cols-3 divide-x divide-night-100">
              {/* Col 1 - CV */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-night-300" />
                  <span className="text-[10px] font-bold tracking-widest text-night-400 uppercase">Your CV</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { text: "Senior Frontend Dev", w: "w-full" },
                    { text: "React · TypeScript · Node", w: "w-4/5" },
                    { text: "5 years experience", w: "w-3/4" },
                    { text: "Open Source contributor", w: "w-full" },
                  ].map(({ text, w }) => (
                    <div key={text} className={`h-5 bg-night-100 rounded-md ${w} flex items-center px-2.5`}>
                      <span className="text-[10px] text-night-500 font-medium truncate">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2 - Job */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span className="text-[10px] font-bold tracking-widest text-brand-400 uppercase">Job Offer</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "We need a React expert",
                    "TypeScript required",
                    "GraphQL is a plus",
                    "Remote-first culture",
                  ].map((t) => (
                    <div key={t} className="h-5 bg-brand-50 border border-brand-100 rounded-md flex items-center px-2.5">
                      <span className="text-[10px] text-brand-600 font-medium truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3 - Optimized */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold tracking-widest text-green-600 uppercase">Optimized</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "React & TypeScript Expert",
                    "5y Frontend · GraphQL",
                    "Remote-ready contributor",
                    "Open Source · 400+ stars",
                  ].map((t) => (
                    <div key={t} className="h-5 bg-green-50 border border-green-100 rounded-md flex items-center px-2.5">
                      <span className="text-[10px] text-green-700 font-medium truncate">{t}</span>
                    </div>
                  ))}
                </div>

                {/* Score bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-night-400 font-medium">Match score</span>
                    <span className="text-[11px] font-bold text-green-600">87%</span>
                  </div>
                  <div className="h-1.5 bg-night-100 rounded-full overflow-hidden">
                    <div className="h-1.5 bg-green-500 rounded-full w-[87%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logos row */}
        <p className="text-xs text-night-400 font-medium mt-12 mb-4">Trusted by job seekers at</p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-35">
          {["Google", "Meta", "Spotify", "Airbnb", "Stripe", "Notion"].map((co) => (
            <span key={co} className="text-sm font-bold text-night-600 tracking-tight">{co}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
