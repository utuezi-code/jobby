import { Upload, Search, Sliders, ShieldCheck, BarChart2, Palette } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Smart CV Import",
    description: "Drop your PDF or DOCX. We extract every section instantly — experience, skills, education, certifications, projects.",
    gradient: "from-brand-500 to-brand-400",
    bg: "bg-brand-50",
    border: "border-brand-100",
    iconColor: "text-brand-600",
    size: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    icon: Search,
    title: "Job Description Analysis",
    description: "Paste one or multiple offers. We surface recurring keywords, required tools, responsibilities — ranked by importance.",
    gradient: "from-green-500 to-green-400",
    bg: "bg-green-50",
    border: "border-green-100",
    iconColor: "text-green-600",
    size: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    icon: Sliders,
    title: "Intelligent Alignment",
    description: "We reorder, rephrase, and densify your existing content to match what the recruiter is actually looking for. Nothing invented.",
    gradient: "from-violet-500 to-brand-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    iconColor: "text-violet-600",
    size: "col-span-2 md:col-span-2 row-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Ethical AI Guardrails",
    description: "We never fabricate skills or experience. Gaps are shown clearly. You stay in control of every change.",
    gradient: "from-amber-500 to-amber-400",
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconColor: "text-amber-600",
    size: "col-span-2 md:col-span-2 row-span-1",
  },
  {
    icon: BarChart2,
    title: "Match Score",
    description: "See a real-time match score broken down by keywords, experience, skills, and education — with clear gaps highlighted.",
    gradient: "from-blue-500 to-brand-400",
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-blue-600",
    size: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    icon: Palette,
    title: "Pro Templates",
    description: "Minimal, corporate, ATS-ready. Export to PDF or DOCX in one click.",
    gradient: "from-pink-500 to-rose-400",
    bg: "bg-pink-50",
    border: "border-pink-100",
    iconColor: "text-pink-600",
    size: "col-span-2 md:col-span-1 row-span-1",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-night-950 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-4">
            Everything you need
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Built for serious job seekers
          </h2>
          <p className="text-night-400 text-lg max-w-xl mx-auto leading-relaxed">
            Stop spending hours adapting your CV manually. Let AI handle the
            alignment while you stay in full control.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description, bg, border, iconColor, size }) => (
            <div
              key={title}
              className={`${size} group relative bg-night-900 border border-night-800 rounded-2xl p-6 overflow-hidden hover:border-night-700 transition-all duration-200 cursor-default`}
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

              <div className={`relative z-10 w-10 h-10 ${bg} border ${border} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={18} className={iconColor} />
              </div>
              <h3 className="relative z-10 font-semibold text-white mb-2 text-[15px]">{title}</h3>
              <p className="relative z-10 text-sm text-night-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
