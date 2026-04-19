import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVMatch AI — Optimize Your CV for Every Job",
  description:
    "AI-powered CV optimizer that adapts your resume to any job description. Get more interviews without lying about your experience.",
  openGraph: {
    title: "CVMatch AI — Optimize Your CV for Every Job",
    description:
      "AI-powered CV optimizer that adapts your resume to any job description. Get more interviews without lying about your experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
