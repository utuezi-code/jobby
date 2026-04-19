import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#EEF2FF,transparent)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-8">
          <Zap size={14} />
          No hallucination. No lies. Just better expression.
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-indigo-950 leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
          Your CV, optimized for{" "}
          <span className="text-indigo-500">every job</span>
          {" "}you apply to
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Paste a job description. Get a tailored CV in seconds. We rewrite what
          you already have — we never invent skills you don&apos;t own.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link href="/app">
            <Button variant="cta" size="lg" className="gap-2 shadow-sm">
              Optimize my CV — it&apos;s free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/#how-it-works">
            <Button variant="ghost" size="lg">
              See how it works
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            2 free optimizations
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            PDF & DOCX export
          </span>
        </div>

        <div className="mt-16 relative rounded-2xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto bg-white">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-400 font-mono">cvmatch.ai/app</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-slate-200">
            <div className="p-5 bg-white">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Your CV</p>
              <div className="space-y-2">
                {["Senior Frontend Dev", "React · TypeScript · Node", "5 years experience", "Open Source contributor"].map((t) => (
                  <div key={t} className="h-5 bg-slate-100 rounded text-xs flex items-center px-2 text-slate-400">{t}</div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Job Description</p>
              <div className="space-y-2">
                {["We need a React expert", "TypeScript required", "GraphQL is a plus", "Remote-first culture"].map((t) => (
                  <div key={t} className="h-5 bg-indigo-50 rounded text-xs flex items-center px-2 text-indigo-400">{t}</div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Optimized CV</p>
              <div className="space-y-2">
                {["React & TypeScript Expert", "5y Frontend · GraphQL", "Remote-ready contributor", "Open Source · 400+ stars"].map((t) => (
                  <div key={t} className="h-5 bg-emerald-50 rounded text-xs flex items-center px-2 text-emerald-600">{t}</div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-emerald-100 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "87%" }} />
                </div>
                <span className="text-xs font-bold text-emerald-600">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
