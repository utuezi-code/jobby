import { Upload, Search, Sliders, ShieldCheck, BarChart2, Palette } from "lucide-react";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: Upload,
    title: "CV Import",
    description:
      "Upload your PDF or DOCX. We extract every section — experience, skills, education, certifications — automatically.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Search,
    title: "Job Analysis",
    description:
      "Paste one or multiple job descriptions. We detect recurring keywords, required tools, and key responsibilities.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Sliders,
    title: "Smart Alignment",
    description:
      "We reorder, rephrase, and densify your existing content to better match what recruiters are looking for.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Guardrails",
    description:
      "We never add skills you don't have. If there's a gap, we show it — and suggest what you could learn next.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart2,
    title: "Match Score",
    description:
      "See a real-time score showing how well your CV matches the job — keyword by keyword, section by section.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description:
      "Choose from minimal, corporate, and ATS-friendly templates. Export to PDF or DOCX in one click.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
            Everything you need
          </p>
          <h2 className="text-4xl font-bold text-indigo-950 mb-4">
            Built for serious job seekers
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Stop spending hours customizing your CV manually. Let AI handle the
            alignment while you stay in control of the truth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} hover>
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="font-semibold text-indigo-950 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
