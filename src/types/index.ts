export interface CVSection {
  title: string;
  content: string;
}

export interface ParsedCV {
  rawText: string;
  fileName: string;
  sections: {
    profile?: string;
    experience?: string;
    education?: string;
    skills?: string;
    certifications?: string;
    languages?: string;
    projects?: string;
  };
}

export interface JobDescription {
  id: string;
  title: string;
  company?: string;
  text: string;
  keywords?: string[];
}

export interface MatchScore {
  overall: number;
  breakdown: {
    keywords: number;
    experience: number;
    skills: number;
    education: number;
  };
  coveredKeywords: string[];
  missingKeywords: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  type: "rephrase" | "highlight" | "reorder" | "gap";
  priority: "high" | "medium" | "low";
  section: string;
  message: string;
}

export interface OptimizedCV {
  content: string;
  sections: ParsedCV["sections"];
  changeLog: Change[];
}

export interface Change {
  section: string;
  type: "rephrased" | "reordered" | "highlighted";
  original: string;
  updated: string;
}

export type TemplateId = "minimal" | "corporate" | "ats" | "modern" | "compact";

export interface CVTemplate {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
  tags: string[];
}

export type AppStep = "upload" | "jobs" | "analyzing" | "results" | "template" | "export";
