"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/store/appStore";
import { ParsedCV } from "@/types";

function parseMockCV(file: File): ParsedCV {
  return {
    rawText: "Senior Frontend Engineer with 5 years experience...",
    fileName: file.name,
    sections: {
      profile: "Experienced frontend engineer specializing in React and TypeScript.",
      experience: "Senior Frontend Engineer at Acme Corp (2021–Present). Frontend Developer at StartupXYZ (2019–2021).",
      skills: "JavaScript, TypeScript, React, Node.js, REST API, Git, Webpack, Jest",
      education: "B.Sc. Computer Science — University of Paris (2019)",
      projects: "OSS Component Library — 450+ GitHub stars",
    },
  };
}

export default function UploadStep() {
  const { setParsedCV, setStep } = useAppStore();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "done" | "error">("idle");
  const [parsed, setParsed] = useState<ParsedCV | null>(null);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const f = accepted[0];
      if (!f) return;
      setFile(f);
      setStatus("parsing");

      setTimeout(() => {
        const cv = parseMockCV(f);
        setParsed(cv);
        setParsedCV(cv);
        setStatus("done");
      }, 1200);
    },
    [setParsedCV]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: () => setStatus("error"),
  });

  const reset = () => {
    setFile(null);
    setParsed(null);
    setStatus("idle");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-indigo-950 mb-2">Upload your CV</h2>
        <p className="text-slate-500 text-sm">PDF or DOCX · Max 10 MB · We never share your data</p>
      </div>

      {status === "idle" || status === "error" ? (
        <>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-150",
              isDragActive
                ? "border-indigo-400 bg-indigo-50"
                : "border-slate-300 bg-white hover:border-indigo-300 hover:bg-indigo-50/30"
            )}
          >
            <input {...getInputProps()} />
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-indigo-500" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">
              {isDragActive ? "Drop it here" : "Drag & drop your CV here"}
            </p>
            <p className="text-sm text-slate-400 mb-4">or</p>
            <Button variant="outline" size="sm" type="button">Browse files</Button>
            <p className="text-xs text-slate-400 mt-4">PDF or DOCX · Max 10 MB</p>
          </div>

          {status === "error" && (
            <div className="mt-4 flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              <AlertCircle size={16} />
              File rejected. Please upload a PDF or DOCX under 10 MB.
            </div>
          )}
        </>
      ) : null}

      {status === "parsing" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: 3 }} />
          <p className="font-semibold text-slate-700">Parsing your CV…</p>
          <p className="text-sm text-slate-400">Extracting sections and content</p>
        </div>
      )}

      {status === "done" && parsed && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FileText size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{file?.name}</p>
                <p className="text-xs text-slate-400">{(file!.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <button onClick={reset} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Detected sections</p>
            {Object.entries(parsed.sections)
              .filter(([, v]) => v)
              .map(([key, value]) => (
                <div key={key} className="flex gap-3">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide w-24 flex-shrink-0 mt-0.5">
                    {key}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{value}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button
          variant="cta"
          size="lg"
          disabled={status !== "done"}
          onClick={() => setStep("jobs")}
        >
          Continue to job offers
        </Button>
      </div>
    </div>
  );
}
