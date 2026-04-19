import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppStep } from "@/types";

const STEPS: { id: AppStep; label: string }[] = [
  { id: "upload", label: "Upload CV" },
  { id: "jobs", label: "Job offers" },
  { id: "results", label: "Analysis" },
  { id: "template", label: "Template" },
  { id: "export", label: "Export" },
];

const ORDER: AppStep[] = ["upload", "jobs", "analyzing", "results", "template", "export"];

function getIndex(step: AppStep) {
  const i = ORDER.indexOf(step);
  return i === 2 ? 2 : i; // analyzing maps to results index visually
}

export default function StepIndicator({ current }: { current: AppStep }) {
  const currentIdx = getIndex(current);

  return (
    <div className="flex items-center gap-0">
      {STEPS.map(({ id, label }, i) => {
        const stepIdx = getIndex(id);
        const done = currentIdx > stepIdx;
        const active = currentIdx === stepIdx || (current === "analyzing" && i === 2);

        return (
          <div key={id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200",
                  done && "bg-emerald-500 text-white",
                  active && !done && "bg-indigo-500 text-white",
                  !done && !active && "bg-slate-200 text-slate-400"
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  active ? "text-indigo-600" : done ? "text-emerald-600" : "text-slate-400"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-10 sm:w-16 mx-1 mb-5 transition-all duration-300",
                  currentIdx > stepIdx ? "bg-emerald-400" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
