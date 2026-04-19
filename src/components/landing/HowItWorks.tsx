import Link from "next/link";
import { Upload, FileText, Sparkles, Download } from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your CV",
    description:
      "Drop your existing CV in PDF or DOCX format. We parse it instantly and structure every section.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Paste job descriptions",
    description:
      "Add one or more job postings you're targeting. We analyze them for keywords and requirements.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get your optimized CV",
    description:
      "Our AI aligns your content to the job without inventing anything. Review a match score and recommendations.",
  },
  {
    number: "04",
    icon: Download,
    title: "Pick a template & export",
    description:
      "Choose a professional template and export your polished CV as PDF or DOCX in seconds.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
            How it works
          </p>
          <h2 className="text-4xl font-bold text-indigo-950 mb-4">
            Four steps to a better CV
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            The entire process takes under 5 minutes. No account required for
            your first two optimizations.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-slate-200 mx-24" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center mb-5 shadow-sm">
                  <span className="text-xs font-bold text-slate-300 absolute top-2 right-3">
                    {number}
                  </span>
                  <Icon size={28} className="text-indigo-500" />
                </div>
                <h3 className="font-semibold text-indigo-950 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link href="/app">
            <Button variant="cta" size="lg">
              Try it now — no signup needed
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
