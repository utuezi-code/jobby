import Link from "next/link";
import { Upload, FileText, Sparkles, Download } from "lucide-react";

const steps = [
  { n: "01", icon: Upload, title: "Upload your CV", color: "#6366f1", bg: "#eef2ff",
    desc: "Drop your PDF or DOCX. We parse and structure every section automatically in seconds." },
  { n: "02", icon: FileText, title: "Paste job offers", color: "#10b981", bg: "#ecfdf5",
    desc: "Add one or multiple job descriptions. We extract keywords, tools, and requirements ranked by frequency." },
  { n: "03", icon: Sparkles, title: "Get your optimized CV", color: "#8b5cf6", bg: "#f5f3ff",
    desc: "Our AI aligns your content without inventing anything. Review the match score and every change before accepting." },
  { n: "04", icon: Download, title: "Export & apply", color: "#d97706", bg: "#fffbeb",
    desc: "Pick a professional template and export as PDF or DOCX in one click. Ready to send." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: "#fff", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Accent */}
      <div style={{
        position: "absolute", right: -200, top: "50%", transform: "translateY(-50%)",
        width: 500, height: 500, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)",
      }} />

      <div className="container-xl">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
              How it works
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
              From raw CV to{" "}
              <span className="gradient-text">perfect fit</span>{" "}
              in 4 steps
            </h2>
            <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7, marginBottom: 36 }}>
              The entire process takes under 5 minutes. No account required
              for your first two optimizations.
            </p>
            <Link href="/app" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#6366f1", color: "#fff",
              fontWeight: 600, fontSize: 15,
              padding: "14px 24px", borderRadius: 12, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
            }}>
              Try free — no signup needed
            </Link>
          </div>

          {/* Right — steps */}
          <div style={{ position: "relative" }}>
            {/* Connector */}
            <div style={{
              position: "absolute", left: 20, top: 40, bottom: 40, width: 1,
              background: "linear-gradient(to bottom, #e0e7ff, #f1f5f9, transparent)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {steps.map(({ n, icon: Icon, title, desc, color, bg }) => (
                <div key={n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{
                    position: "relative", zIndex: 1, flexShrink: 0,
                    width: 40, height: 40, borderRadius: 12,
                    background: bg, border: `1px solid ${bg}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    <Icon size={17} color={color} />
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: "#cbd5e1", letterSpacing: "0.1em" }}>{n}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{title}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 767px) {
          #how-it-works > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
