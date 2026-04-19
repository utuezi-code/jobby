"use client";
import { useEffect, useState } from "react";

const TASKS = [
  "Parsing job descriptions…",
  "Extracting keywords and requirements…",
  "Comparing with your CV sections…",
  "Identifying alignment opportunities…",
  "Reformulating key bullet points…",
  "Computing match score…",
  "Finalizing optimized version…",
];

export default function AnalyzingStep() {
  const [taskIdx, setTaskIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskIdx((i) => Math.min(i + 1, TASKS.length - 1));
      setProgress((p) => Math.min(p + 100 / TASKS.length, 96));
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center py-8">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#E0E7FF" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="#6366F1"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-950 mb-3">Analyzing your CV</h2>
      <p className="text-sm text-indigo-500 font-medium mb-8 h-5 transition-all duration-200">
        {TASKS[taskIdx]}
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 text-left space-y-2.5 max-w-sm mx-auto">
        {TASKS.slice(0, taskIdx + 1).map((task, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-slate-600">{task}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-6">
        This usually takes under 30 seconds
      </p>
    </div>
  );
}
