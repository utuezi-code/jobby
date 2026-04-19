"use client";
import Link from "next/link";
import { Zap } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import StepIndicator from "@/components/app/StepIndicator";
import UploadStep from "@/components/app/UploadStep";
import JobsStep from "@/components/app/JobsStep";
import AnalyzingStep from "@/components/app/AnalyzingStep";
import ResultsStep from "@/components/app/ResultsStep";
import TemplateStep from "@/components/app/TemplateStep";
import ExportStep from "@/components/app/ExportStep";

export default function AppPage() {
  const { step } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* App header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 text-base">
            <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            CVMatch<span className="text-emerald-500">AI</span>
          </Link>

          {step !== "export" && (
            <StepIndicator current={step} />
          )}

          <div className="w-24 flex justify-end">
            {step !== "export" && (
              <span className="text-xs text-slate-400 font-medium">
                {step === "analyzing" ? "Analyzing…" : null}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Step content */}
      <main className="flex-1 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {step === "upload" && <UploadStep />}
          {step === "jobs" && <JobsStep />}
          {step === "analyzing" && <AnalyzingStep />}
          {step === "results" && <ResultsStep />}
          {step === "template" && <TemplateStep />}
          {step === "export" && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-indigo-950 mb-1">Done!</h1>
            </div>
          )}
          {step === "export" && <ExportStep />}
        </div>
      </main>

      {/* Progress bar */}
      {step !== "export" && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-slate-200">
          <div
            className="h-1 bg-indigo-500 transition-all duration-500"
            style={{
              width:
                step === "upload" ? "10%" :
                step === "jobs" ? "30%" :
                step === "analyzing" ? "55%" :
                step === "results" ? "70%" :
                step === "template" ? "85%" : "100%",
            }}
          />
        </div>
      )}
    </div>
  );
}
