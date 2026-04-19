import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "radial-gradient(ellipse 90% 60% at 50% -10%, #eef2ff 0%, #fff 65%)",
      paddingTop: 120, paddingBottom: 80,
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #c7d2fe 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.35,
      }} />

      <div className="container-xl" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, border: "1px solid #c7d2fe", background: "#eef2ff", color: "#4f46e5", fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
          <Sparkles size={13} />
          AI-powered · No hallucination · No lies
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#0f172a", marginBottom: 24, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          Your CV, <span className="gradient-text">perfectly aligned</span>{" "}
          <br style={{ display: "block" }} />
          for every job
        </h1>

        {/* Subtext */}
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#64748b", maxWidth: 560, margin: "0 auto 40px", fontWeight: 400 }}>
          Paste a job offer. Get your CV rewritten in seconds — smarter keywords,
          better structure, same honest you.{" "}
          <strong style={{ color: "#334155", fontWeight: 600 }}>No invented skills. Ever.</strong>
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40 }}>
          <Link href="/app" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#6366f1", color: "#fff", fontWeight: 600, fontSize: 15,
            padding: "14px 24px", borderRadius: 12, textDecoration: "none",
            boxShadow: "0 4px 24px rgba(99,102,241,0.30)",
          }}>
            Optimize my CV — free <ArrowRight size={16} />
          </Link>
          <Link href="#how-it-works" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#475569", fontWeight: 500, fontSize: 15,
            padding: "14px 20px", borderRadius: 12, textDecoration: "none",
            background: "rgba(0,0,0,0.04)",
          }}>
            See how it works
          </Link>
        </div>

        {/* Trust row */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 28px", marginBottom: 64, color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>
          {["No credit card required", "2 free optimizations", "PDF & DOCX export"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ShieldCheck size={13} style={{ color: "#10b981" }} /> {t}
            </span>
          ))}
        </div>

        {/* Mockup */}
        <div style={{ position: "relative", maxWidth: 920, margin: "0 auto" }}>
          {/* Glow */}
          <div style={{
            position: "absolute", inset: -16, borderRadius: 28,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.08) 100%)",
            filter: "blur(24px)", zIndex: 0,
          }} />

          {/* Browser window */}
          <div style={{ position: "relative", zIndex: 1, borderRadius: 16, border: "1px solid #e2e8f0", background: "#fff", boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)", overflow: "hidden" }}>

            {/* Chrome bar */}
            <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f87171", display: "block" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#fbbf24", display: "block" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#34d399", display: "block" }} />
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <span style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 14px", fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>
                  cvmatch.ai/app
                </span>
              </div>
            </div>

            {/* 3-column content */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "none" }}>

              {/* Col 1 */}
              <div style={{ padding: "24px", borderRight: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#cbd5e1" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>Your CV</span>
                </div>
                {["Senior Frontend Dev", "React · TypeScript · Node", "5 years experience", "Open Source contributor"].map((t, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 6, marginBottom: 6, fontSize: 12, color: "#64748b", fontWeight: 500 }}>{t}</div>
                ))}
              </div>

              {/* Col 2 */}
              <div style={{ padding: "24px", borderRight: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8" }}>Job Offer</span>
                </div>
                {["We need a React expert", "TypeScript required", "GraphQL is a plus", "Remote-first culture"].map((t, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "#eef2ff", border: "1px solid #e0e7ff", borderRadius: 6, marginBottom: 6, fontSize: 12, color: "#4f46e5", fontWeight: 500 }}>{t}</div>
                ))}
              </div>

              {/* Col 3 */}
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981" }}>Optimized</span>
                </div>
                {["React & TypeScript Expert", "5y Frontend · GraphQL", "Remote-ready contributor", "Open Source · 400+ stars"].map((t, i) => (
                  <div key={i} style={{ padding: "6px 10px", background: "#ecfdf5", border: "1px solid #d1fae5", borderRadius: 6, marginBottom: 6, fontSize: 12, color: "#059669", fontWeight: 500 }}>{t}</div>
                ))}
                {/* Score bar */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Match score</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>87%</span>
                  </div>
                  <div style={{ height: 5, background: "#f1f5f9", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: "87%", height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 100 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logos */}
        <div style={{ marginTop: 56 }}>
          <p style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 500, marginBottom: 16 }}>
            Trusted by job seekers applying to
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 36px", opacity: 0.4 }}>
            {["Google", "Stripe", "Notion", "Airbnb", "Vercel", "Spotify"].map(c => (
              <span key={c} style={{ fontSize: 13, fontWeight: 800, color: "#64748b", letterSpacing: "-0.02em" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
