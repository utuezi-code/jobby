"use client";
import { useState } from "react";
import { Download, FileText, Share2, RotateCcw, CheckCircle2, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/store/appStore";
import { cn } from "@/lib/utils";

type Format = "pdf" | "docx";

export default function ExportStep() {
  const { matchScore, parsedCV, selectedTemplate, setStep, reset } = useAppStore();
  const [exporting, setExporting] = useState<Format | null>(null);
  const [exported, setExported] = useState<Format[]>([]);

  const handleExport = async (format: Format) => {
    setExporting(format);
    await new Promise((r) => setTimeout(r, 1400));
    setExporting(null);
    setExported((prev) => [...prev, format]);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-indigo-950 mb-2">Your CV is ready!</h2>
        <p className="text-slate-500 text-sm">
          Optimized for <span className="font-semibold text-indigo-600">{parsedCV?.fileName}</span>{" "}
          · {matchScore?.overall}% match score
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 grid grid-cols-3 divide-x divide-slate-100 text-center">
        <div className="px-4">
          <p className="text-2xl font-bold text-emerald-500">{matchScore?.overall}%</p>
          <p className="text-xs text-slate-400 mt-0.5">Match score</p>
        </div>
        <div className="px-4">
          <p className="text-2xl font-bold text-indigo-500">{matchScore?.coveredKeywords.length}</p>
          <p className="text-xs text-slate-400 mt-0.5">Keywords matched</p>
        </div>
        <div className="px-4">
          <p className="text-2xl font-bold text-slate-700 capitalize">{selectedTemplate}</p>
          <p className="text-xs text-slate-400 mt-0.5">Template</p>
        </div>
      </div>

      {/* Export options */}
      <div className="space-y-3 mb-6">
        {(["pdf", "docx"] as Format[]).map((format) => {
          const done = exported.includes(format);
          const loading = exporting === format;
          const isPremium = format === "docx";

          return (
            <div
              key={format}
              className={cn(
                "bg-white border rounded-xl p-4 flex items-center justify-between",
                done ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center",
                  done ? "bg-emerald-100" : "bg-slate-100")}>
                  <FileText size={18} className={done ? "text-emerald-500" : "text-slate-500"} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 uppercase">{format}</p>
                  <p className="text-xs text-slate-400">
                    {format === "pdf" ? "Best for sending" : "Best for editing"}
                    {isPremium && " · Pro"}
                  </p>
                </div>
              </div>

              {done ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  Downloaded
                </div>
              ) : isPremium ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5">
                  <Zap size={12} /> Upgrade to Pro
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleExport(format)}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Generating…
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Download size={14} /> Export {format.toUpperCase()}
                    </span>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Share */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-semibold text-indigo-800">Shareable link</p>
          <p className="text-xs text-indigo-400">Share a read-only version of your optimized CV</p>
        </div>
        <Button variant="outline" size="sm" className="flex-shrink-0">
          <Share2 size={13} /> Copy link
        </Button>
      </div>

      {/* Restart */}
      <div className="text-center">
        <button
          onClick={() => { reset(); setStep("upload"); }}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-150"
        >
          <RotateCcw size={14} />
          Optimize another CV
        </button>
      </div>
    </div>
  );
}
