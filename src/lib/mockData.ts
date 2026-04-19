import { MatchScore, OptimizedCV } from "@/types";

export const MOCK_MATCH_SCORE: MatchScore = {
  overall: 82,
  breakdown: {
    keywords: 88,
    experience: 79,
    skills: 85,
    education: 75,
  },
  coveredKeywords: [
    "React", "TypeScript", "Node.js", "REST API", "Agile", "Git",
    "Frontend", "Performance optimization", "Team collaboration",
  ],
  missingKeywords: ["GraphQL", "AWS", "Docker", "CI/CD"],
  recommendations: [
    {
      type: "highlight",
      priority: "high",
      section: "experience",
      message: "Your React experience is strong but buried. Move it higher in your bullet points.",
    },
    {
      type: "rephrase",
      priority: "high",
      section: "profile",
      message: "Add 'performance optimization' to your summary — the job mentions it 3 times.",
    },
    {
      type: "reorder",
      priority: "medium",
      section: "skills",
      message: "List TypeScript before JavaScript — the job prioritizes it.",
    },
    {
      type: "gap",
      priority: "medium",
      section: "skills",
      message: "GraphQL is mentioned 4x in the job description but absent from your CV. Consider adding it if you have experience.",
    },
    {
      type: "highlight",
      priority: "low",
      section: "projects",
      message: "Your open source contributions show initiative — the job values autonomy.",
    },
  ],
};

export const MOCK_OPTIMIZED_CV: OptimizedCV = {
  content: `# Jane Doe
**Senior Frontend Engineer** · jane.doe@email.com · linkedin.com/in/janedoe

---

## Profile
Frontend engineer with 5+ years building high-performance React and TypeScript applications. Specialized in component architecture, performance optimization, and developer experience. Strong track record of shipping in agile teams with measurable impact.

---

## Experience

### Senior Frontend Engineer — Acme Corp (2021–Present)
- Led migration of legacy jQuery codebase to React + TypeScript, reducing bundle size by 40%
- Implemented performance optimizations cutting LCP from 4.2s to 1.8s
- Built reusable component library used across 3 product teams
- Collaborated in 2-week agile sprints, delivering features on schedule

### Frontend Developer — StartupXYZ (2019–2021)
- Developed REST API integrations for real-time data dashboards
- Shipped 12 major features with zero critical regressions
- Mentored 2 junior developers on React best practices

---

## Skills
TypeScript · React · Node.js · REST API · Git · Webpack · Jest · Tailwind CSS · Figma

---

## Education
B.Sc. Computer Science — University of Paris (2019)

---

## Projects
**OSS Component Library** — 450+ GitHub stars · React + TypeScript
`,
  sections: {
    profile: "Frontend engineer with 5+ years building high-performance React and TypeScript applications.",
    experience: "Led migration of legacy jQuery codebase to React + TypeScript...",
    skills: "TypeScript · React · Node.js · REST API · Git · Webpack · Jest · Tailwind CSS",
    education: "B.Sc. Computer Science — University of Paris (2019)",
  },
  changeLog: [
    { section: "profile", type: "rephrased", original: "Experienced developer...", updated: "Frontend engineer with 5+ years..." },
    { section: "skills", type: "reordered", original: "JavaScript · React · TypeScript", updated: "TypeScript · React · Node.js" },
    { section: "experience", type: "highlighted", original: "Worked on performance", updated: "Implemented performance optimizations cutting LCP from 4.2s to 1.8s" },
  ],
};
