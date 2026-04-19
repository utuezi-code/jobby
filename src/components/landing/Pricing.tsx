import Link from "next/link";
import { Check, X, Zap } from "lucide-react";

const FREE = [
  [true, "2 optimizations / month"],
  [true, "PDF & DOCX upload"],
  [true, "Match score + keywords"],
  [true, "3 free templates"],
  [true, "PDF export"],
  [false, "Unlimited optimizations"],
  [false, "Premium templates"],
  [false, "DOCX export"],
  [false, "Version history"],
] as [boolean, string][];

const PRO = [
  "Unlimited optimizations",
  "All file formats",
  "Advanced match score",
  "10+ premium templates",
  "PDF & DOCX export",
  "Version history",
  "Multi-job comparison",
  "Priority AI processing",
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#fff", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      <div style={{
        position: "absolute", bottom: -100, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
      }} />

      <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 14 }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 420, margin: "0 auto" }}>
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 780, margin: "0 auto" }}>

          {/* Free */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Free</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em" }}>€0</span>
              <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>forever</span>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28, lineHeight: 1.5 }}>Try CVMatch AI risk-free. No credit card.</p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 28 }}>
              {FREE.map(([ok, text]) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  {ok
                    ? <Check size={15} color="#10b981" style={{ flexShrink: 0 }} />
                    : <X size={15} color="#cbd5e1" style={{ flexShrink: 0 }} />}
                  <span style={{ color: ok ? "#334155" : "#94a3b8", textDecoration: ok ? undefined : "line-through" }}>{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/app" style={{
              display: "block", textAlign: "center",
              background: "#0f172a", color: "#fff",
              fontWeight: 600, fontSize: 15, padding: "13px", borderRadius: 10, textDecoration: "none",
            }}>
              Start for free
            </Link>
          </div>

          {/* Pro */}
          <div style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

            {/* Glow */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 200, height: 200,
              borderRadius: "50%", background: "radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Badge */}
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "#6366f1", color: "#fff",
                fontSize: 11, fontWeight: 700,
                padding: "5px 14px", borderRadius: 100,
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
              }}>
                <Zap size={11} /> Most popular
              </span>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Pro</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>€9</span>
              <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>/ month</span>
            </div>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28, lineHeight: 1.5 }}>For active job seekers. Cancel anytime.</p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 28 }}>
              {PRO.map(text => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <Check size={15} color="#34d399" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#e2e8f0" }}>{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/app" style={{
              display: "block", textAlign: "center",
              background: "#6366f1", color: "#fff",
              fontWeight: 600, fontSize: 15, padding: "13px", borderRadius: 10, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
            }}>
              Start 7-day free trial
            </Link>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
          Your CV data is encrypted and never shared. GDPR compliant.
        </p>
      </div>

      <style>{`@media(max-width:640px){#pricing>div>div:nth-child(2){grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
