import Link from "next/link";
import { Upload, FileText, Sparkles, Download } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Upload your CV",
    description: "Drop your existing PDF or DOCX. We parse and structure every section automatically in seconds.",
    color: "bg-brand-500",
    light: "bg-brand-50 text-brand-600 border-brand-100",
  },
  {
    n: "02",
    icon: FileText,
    title: "Paste job offers",
    description: "Add one or multiple job descriptions. We extract keywords, tools, and requirements — ranked by frequency.",
    color: "bg-green-500",
    light: "bg-green-50 text-green-600 border-green-100",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Get your optimized CV",
    description: "Our AI aligns your content to the job without inventing anything. Review the match score and changes before accepting.",
    color: "bg-violet-500",
    light: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    n: "04",
    icon: Download,
    title: "Export & apply",
    description: "Pick a professional template and export as PDF or DOCX in one click. Ready to send.",
    color: "bg-amber-500",
    light: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white relative overflow-hidden">
      {/* Side glow */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-500 mb-4">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-black text-night-900 leading-tight tracking-tight mb-6">
              From raw CV to{" "}
              <span className="gradient-text">perfect fit</span>
              <br />in 4 steps
            </h2>
            <p className="text-night-500 text-lg leading-relaxed mb-8">
              The entire process takes under 5 minutes. No account required
              for your first two optimizations.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md shadow-brand-500/20 hover:shadow-brand-500/30 transition-all duration-200"
            >
              Try for free — no signup
            </Link>
          </div>

          {/* Right — steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-5 top-10 bottom-10 w-px bg-gradient-to-b from-brand-200 via-night-200 to-transparent" />

            <div className="space-y-6">
              {steps.map(({ n, icon: Icon, title, description, light }) => (
                <div key={n} className="flex gap-5 group">
                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-xl border ${light} flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <Icon size={17} />
                  </div>

                  {/* Content */}
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-night-300 tracking-widest">{n}</span>
                      <h3 className="text-[15px] font-semibold text-night-800">{title}</h3>
                    </div>
                    <p className="text-sm text-night-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
