import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CVMatch AI — Optimize Your CV",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
