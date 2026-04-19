"use client";
import { create } from "zustand";
import { ParsedCV, JobDescription, MatchScore, OptimizedCV, AppStep, TemplateId } from "@/types";

interface AppState {
  step: AppStep;
  parsedCV: ParsedCV | null;
  jobDescriptions: JobDescription[];
  matchScore: MatchScore | null;
  optimizedCV: OptimizedCV | null;
  selectedTemplate: TemplateId;

  setStep: (step: AppStep) => void;
  setParsedCV: (cv: ParsedCV) => void;
  addJobDescription: (job: JobDescription) => void;
  removeJobDescription: (id: string) => void;
  updateJobDescription: (id: string, updates: Partial<JobDescription>) => void;
  setMatchScore: (score: MatchScore) => void;
  setOptimizedCV: (cv: OptimizedCV) => void;
  setSelectedTemplate: (id: TemplateId) => void;
  reset: () => void;
}

const initialState = {
  step: "upload" as AppStep,
  parsedCV: null,
  jobDescriptions: [],
  matchScore: null,
  optimizedCV: null,
  selectedTemplate: "minimal" as TemplateId,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setParsedCV: (parsedCV) => set({ parsedCV }),
  addJobDescription: (job) =>
    set((state) => ({ jobDescriptions: [...state.jobDescriptions, job] })),
  removeJobDescription: (id) =>
    set((state) => ({
      jobDescriptions: state.jobDescriptions.filter((j) => j.id !== id),
    })),
  updateJobDescription: (id, updates) =>
    set((state) => ({
      jobDescriptions: state.jobDescriptions.map((j) =>
        j.id === id ? { ...j, ...updates } : j
      ),
    })),
  setMatchScore: (matchScore) => set({ matchScore }),
  setOptimizedCV: (optimizedCV) => set({ optimizedCV }),
  setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
  reset: () => set(initialState),
}));
