import { Upload, Search, Sliders, ShieldCheck, BarChart2, Palette } from "lucide-react";

const cards = [
  {
    icon: Upload, label: "Smart CV Import",
    desc: "Drop your PDF or DOCX. We extract every section instantly — experience, skills, education, certifications, projects.",
    iconBg: "#eef2ff", iconColor: "#6366f1", span: 1,
  },
  {
    icon: Search, label: "Job Analysis",
    desc: "Paste one or multiple offers. We surface keywords, required tools, and responsibilities — ranked by importance.",
    iconBg: "#ecfdf5", iconColor: "#10b981", span: 1,
  },
  {
    icon: Sliders, label: "Intelligent Alignment",
    desc: "We reorder, rephrase, and densify your existing content to match what the recruiter is actually looking for. Nothing invented. Ever.",
    iconBg: "#f5f3ff", iconColor: "#8b5cf6", span: 2,
  },
  {
    icon: ShieldCheck, label: "Ethical Guardrails",
    desc: "We never fabricate skills or experience. Every gap is surfaced clearly. You review every single change before it's applied.",
    iconBg: "#fffbeb", iconColor: "#d97706", span: 2,
  },
  {
    icon: BarChart2, label: "Match Score",
    desc: "Real-time score by section — keywords, experience, skills, education. Clear and actionable.",
    iconBg: "#eff6ff", iconColor: "#3b82f6", span: 1,
  },
  {
    icon: Palette, label: "Pro Templates",
    desc: "Minimal, corporate, ATS-ready. Export PDF or DOCX instantly.",
    iconBg: "#fff1f2", iconColor: "#f43f5e", span: 1,
  },
];

export default function Features() {
  return (
    <section id="features" style={{ background: "#020617", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Top glow */}
      <div style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)",
      }} />

      <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", marginBottom: 16 }}>
            Everything you need
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Built for serious job seekers
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Stop adapting your CV manually. Let AI handle the alignment while you stay in full control.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {cards.map(({ icon: Icon, label, desc, iconBg, iconColor, span }) => (
            <div
              key={label}
              style={{
                gridColumn: `span ${span}`,
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 16,
                padding: 28,
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon size={18} color={iconColor} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{label}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile stacked fallback via CSS override */}
        <style>{`
          @media (max-width: 767px) {
            #features-grid > div { grid-column: span 4 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
