"use client";
import { useAppStore } from "@/store/appStore";
import { CVTemplate, TemplateId } from "@/types";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

const TEMPLATES: CVTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, whitespace-first. Perfect for tech and design roles.",
    preview: "minimal",
    isPremium: false,
    tags: ["ATS-friendly", "Modern"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Traditional structure, professional look. Finance & consulting.",
    preview: "corporate",
    isPremium: false,
    tags: ["Classic", "Structured"],
  },
  {
    id: "ats",
    name: "ATS Pro",
    description: "Optimized for applicant tracking systems. Maximum parse rate.",
    preview: "ats",
    isPremium: false,
    tags: ["ATS-friendly", "Plain"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column layout with accent color. Creative and tech roles.",
    preview: "modern",
    isPremium: true,
    tags: ["Premium", "Creative"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense, one-page optimized. Fit everything without clutter.",
    preview: "compact",
    isPremium: true,
    tags: ["Premium", "One-page"],
  },
];

const PREVIEW_COLORS: Record<TemplateId, { bg: string; accent: string; line: string }> = {
  minimal: { bg: "bg-white", accent: "bg-indigo-500", line: "bg-slate-200" },
  corporate: { bg: "bg-slate-50", accent: "bg-slate-700", line: "bg-slate-300" },
  ats: { bg: "bg-white", accent: "bg-slate-800", line: "bg-slate-200" },
  modern: { bg: "bg-indigo-950", accent: "bg-indigo-400", line: "bg-indigo-800" },
  compact: { bg: "bg-white", accent: "bg-emerald-500", line: "bg-slate-200" },
};

function TemplatePreview({ id }: { id: TemplateId }) {
  const colors = PREVIEW_COLORS[id];

  if (id === "modern") {
    return (
      <div className={`${colors.bg} rounded-lg h-40 overflow-hidden flex`}>
        <div className="w-1/3 bg-indigo-900 p-2 space-y-1.5">
          <div className="w-8 h-8 rounded-full bg-indigo-400 mx-auto mb-2" />
          {[40, 60, 50].map((w, i) => (
            <div key={i} className="h-1.5 bg-indigo-700 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="h-2 bg-indigo-400 rounded-full w-3/4" />
          <div className="h-1 bg-indigo-800 rounded-full w-1/2" />
          <div className="mt-2 space-y-1">
            {[80, 60, 70].map((w, i) => (
              <div key={i} className="h-1 bg-indigo-800 rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} rounded-lg h-40 overflow-hidden p-3 border border-slate-100`}>
      <div className={`h-2 ${colors.accent} rounded-full w-2/3 mb-1`} />
      <div className={`h-1 ${colors.line} rounded-full w-1/3 mb-3`} />
      <div className={`h-px ${colors.line} mb-2`} />
      {id === "compact"
        ? [90, 75, 85, 70, 80].map((w, i) => (
            <div key={i} className={`h-1 ${colors.line} rounded-full mb-1`} style={{ width: `${w}%` }} />
          ))
        : [80, 60, 75, 50].map((w, i) => (
            <div key={i} className={`h-1.5 ${colors.line} rounded-full mb-2`} style={{ width: `${w}%` }} />
          ))}
    </div>
  );
}

export default function TemplateStep() {
  const { selectedTemplate, setSelectedTemplate, setStep } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-950 mb-2">Choose your template</h2>
        <p className="text-slate-500 text-sm">
          Free templates are ready to export. Premium templates unlock with a Pro plan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {TEMPLATES.map((tpl) => {
          const selected = selectedTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => !tpl.isPremium && setSelectedTemplate(tpl.id)}
              className={cn(
                "relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-150 cursor-pointer group",
                selected
                  ? "border-indigo-500 shadow-md"
                  : tpl.isPremium
                  ? "border-slate-200 opacity-70 cursor-not-allowed"
                  : "border-slate-200 hover:border-indigo-300"
              )}
            >
              <div className="p-4 pb-3">
                <TemplatePreview id={tpl.id} />
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-800">{tpl.name}</span>
                  {tpl.isPremium ? (
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
                      <Lock size={10} /> Pro
                    </div>
                  ) : selected ? (
                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                      <Check size={11} className="text-white" />
                    </div>
                  ) : null}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">{tpl.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.tags.map((tag) => (
                    <Badge key={tag} variant={tag === "Premium" ? "warning" : "default"} className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep("results")}>Back</Button>
        <Button variant="cta" size="lg" onClick={() => setStep("export")}>
          Export my CV
        </Button>
      </div>
    </div>
  );
}
