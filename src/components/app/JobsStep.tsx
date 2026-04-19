"use client";
import { useState } from "react";
import { Plus, Trash2, Briefcase, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/store/appStore";
import { JobDescription } from "@/types";
import { cn } from "@/lib/utils";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function JobCard({
  job,
  onRemove,
  onUpdate,
}: {
  job: JobDescription;
  onRemove: () => void;
  onUpdate: (updates: Partial<JobDescription>) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Briefcase size={15} className="text-indigo-500" />
          </div>
          <input
            className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none flex-1 min-w-0 placeholder:text-slate-400"
            placeholder="Job title (e.g. Senior Frontend Engineer)"
            value={job.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer rounded-lg hover:bg-slate-100 transition-colors duration-150"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer rounded-lg hover:bg-red-50 transition-colors duration-150"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="p-4">
          <input
            className="text-xs text-slate-500 bg-transparent border-none outline-none w-full mb-3 placeholder:text-slate-400"
            placeholder="Company name (optional)"
            value={job.company || ""}
            onChange={(e) => onUpdate({ company: e.target.value })}
          />
          <textarea
            className="w-full text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3 resize-none outline-none focus:border-indigo-300 focus:bg-white transition-all duration-150 placeholder:text-slate-400 min-h-[140px]"
            placeholder="Paste the full job description here…"
            value={job.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

export default function JobsStep() {
  const { jobDescriptions, addJobDescription, removeJobDescription, updateJobDescription, setStep, setMatchScore, setOptimizedCV } =
    useAppStore();

  const canAnalyze = jobDescriptions.length > 0 && jobDescriptions.every((j) => j.text.trim().length > 20);

  const handleAdd = () => {
    addJobDescription({ id: generateId(), title: "", text: "" });
  };

  const handleAnalyze = async () => {
    setStep("analyzing");
    await new Promise((r) => setTimeout(r, 2800));

    const { MOCK_MATCH_SCORE, MOCK_OPTIMIZED_CV } = await import("@/lib/mockData");
    setMatchScore(MOCK_MATCH_SCORE);
    setOptimizedCV(MOCK_OPTIMIZED_CV);
    setStep("results");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-950 mb-2">Add job descriptions</h2>
        <p className="text-slate-500 text-sm">
          Paste one or more offers. We extract keywords, responsibilities, and required tools.
        </p>
      </div>

      <div className="space-y-4 mb-4">
        {jobDescriptions.length === 0 && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Briefcase size={22} className="text-indigo-400" />
            </div>
            <p className="font-semibold text-slate-600 mb-1">No job offers yet</p>
            <p className="text-sm text-slate-400 mb-4">Add at least one job description to analyze</p>
            <Button variant="primary" size="sm" onClick={handleAdd}>
              <Plus size={15} /> Add a job offer
            </Button>
          </div>
        )}

        {jobDescriptions.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onRemove={() => removeJobDescription(job.id)}
            onUpdate={(updates) => updateJobDescription(job.id, updates)}
          />
        ))}
      </div>

      {jobDescriptions.length > 0 && jobDescriptions.length < 5 && (
        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-sm font-medium text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all duration-150"
        >
          <Plus size={15} /> Add another job offer
        </button>
      )}

      {!canAnalyze && jobDescriptions.length > 0 && (
        <div className="flex items-center gap-2 text-amber-600 text-xs bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">
          <AlertCircle size={13} />
          Please fill in the job description text to continue.
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" size="md" onClick={() => setStep("upload")}>
          Back
        </Button>
        <Button
          variant="cta"
          size="lg"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
          className={cn(!canAnalyze && "opacity-50")}
        >
          Analyze my CV
        </Button>
      </div>
    </div>
  );
}
