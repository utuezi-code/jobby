"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ChevronRight, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Recommendation } from "@/types";

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ * (score / 100);
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E0E7FF" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-indigo-950">{score}%</span>
        <span className="text-xs text-slate-400 font-medium">match</span>
      </div>
    </div>
  );
}

const PRIORITY_COLOR = {
  high: "bg-red-50 border-red-100 text-red-700",
  medium: "bg-amber-50 border-amber-100 text-amber-700",
  low: "bg-slate-50 border-slate-200 text-slate-600",
};

const PRIORITY_ICON = {
  high: <XCircle size={14} className="text-red-500 flex-shrink-0" />,
  medium: <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />,
  low: <CheckCircle2 size={14} className="text-slate-400 flex-shrink-0" />,
};

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className={cn("border rounded-lg px-4 py-3 flex items-start gap-3", PRIORITY_COLOR[rec.priority])}>
      {PRIORITY_ICON[rec.priority]}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide opacity-60">{rec.section}</span>
          <Badge
            variant={rec.type === "gap" ? "error" : rec.type === "rephrase" ? "indigo" : "default"}
            className="text-[10px]"
          >
            {rec.type}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed">{rec.message}</p>
      </div>
    </div>
  );
}

export default function ResultsStep() {
  const { matchScore, optimizedCV, setStep } = useAppStore();
  const [showOriginal, setShowOriginal] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "cv">("overview");

  if (!matchScore || !optimizedCV) return null;

  const { overall, breakdown, coveredKeywords, missingKeywords, recommendations } = matchScore;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-950 mb-2">Your optimization results</h2>
        <p className="text-slate-500 text-sm">Review the match score, recommendations, and your optimized CV.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 max-w-xs">
        {(["overview", "cv"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 text-sm font-semibold py-2 rounded-lg cursor-pointer transition-all duration-150",
              activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab === "overview" ? "Overview" : "Optimized CV"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Score + Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Global match score</p>
              <ScoreRing score={overall} />
              <p className="text-xs text-slate-400 mt-4 max-w-[180px] text-center">
                {overall >= 80
                  ? "Excellent alignment with this offer."
                  : overall >= 60
                  ? "Good alignment — a few gaps to address."
                  : "Several improvements needed before applying."}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Score breakdown</p>
              <div className="space-y-4">
                {Object.entries(breakdown).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 capitalize">{key}</span>
                      <span className="font-semibold text-slate-800">{val}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          val >= 80 ? "bg-emerald-500" : val >= 60 ? "bg-amber-400" : "bg-red-400"
                        )}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <p className="text-sm font-semibold text-slate-700">Covered keywords</p>
                <Badge variant="success">{coveredKeywords.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {coveredKeywords.map((kw) => (
                  <span key={kw} className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={16} className="text-red-400" />
                <p className="text-sm font-semibold text-slate-700">Missing keywords</p>
                <Badge variant="error">{missingKeywords.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((kw) => (
                  <span key={kw} className="bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                We never add these automatically — only if you confirm you have the skill.
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm font-semibold text-slate-700 mb-4">
              Recommendations ({recommendations.length})
            </p>
            <div className="space-y-3">
              {recommendations
                .sort((a, b) => (a.priority === "high" ? -1 : b.priority === "high" ? 1 : 0))
                .map((rec, i) => (
                  <RecommendationCard key={i} rec={rec} />
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "cv" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="success">Optimized</Badge>
              <span className="text-xs text-slate-400">{optimizedCV.changeLog.length} changes applied</span>
            </div>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors duration-150"
            >
              {showOriginal ? <EyeOff size={13} /> : <Eye size={13} />}
              {showOriginal ? "Hide" : "Show"} changes
            </button>
          </div>

          {showOriginal && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Changes log</p>
              {optimizedCV.changeLog.map((change, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">{change.section}</Badge>
                    <span className="text-amber-600 capitalize">{change.type}</span>
                  </div>
                  <p className="text-slate-500 line-through">{change.original}</p>
                  <p className="text-emerald-700 font-medium">{change.updated}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 font-mono text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {optimizedCV.content}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={() => setStep("jobs")}>Back</Button>
        <Button variant="cta" size="lg" onClick={() => setStep("template")}>
          Choose a template <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
