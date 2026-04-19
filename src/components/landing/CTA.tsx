import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section style={{ background: "#020617", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Center radial */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="container-xl" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", marginBottom: 20 }}>
          Ready to apply?
        </p>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20 }}>
          Land more interviews{" "}
          <br />
          <span className="gradient-text">starting today</span>
        </h2>
        <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>
          Your first two optimizations are completely free.
          No account required — just upload and go.
        </p>
        <Link href="/app" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#fff", color: "#0f172a",
          fontWeight: 700, fontSize: 16,
          padding: "16px 32px", borderRadius: 14, textDecoration: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}>
          Optimize my CV — free <ArrowRight size={18} />
        </Link>
        <p style={{ fontSize: 13, color: "#334155", marginTop: 20 }}>
          No credit card · 2 free optimizations · Cancel anytime
        </p>
      </div>
    </section>
  );
}
