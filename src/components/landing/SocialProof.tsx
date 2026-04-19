const stats = [
  { value: "12,000+", label: "CVs optimized", sub: "and counting" },
  { value: "3.2×", label: "More callbacks", sub: "avg. user result" },
  { value: "4.8/5", label: "User satisfaction", sub: "2,400+ reviews" },
  { value: "< 2min", label: "Per optimization", sub: "end to end" },
];

const testimonials = [
  { quote: "I went from 1 callback per 20 applications to 1 in 5. The keyword alignment is genuinely incredible.", name: "Léa M.", role: "Product Designer", company: "Previously at Figma", avatar: "LM", color: "#eef2ff", textColor: "#4f46e5" },
  { quote: "Finally a tool that doesn't make my CV sound like a robot wrote it. Every change sounds exactly like me.", name: "Karim B.", role: "Full Stack Engineer", company: "Hired at Vercel", avatar: "KB", color: "#ecfdf5", textColor: "#059669" },
  { quote: "The ethical guardrail is what convinced me. It showed gaps honestly — no fake skills, just real opportunities.", name: "Sophie T.", role: "Marketing Lead", company: "Joined Spotify", avatar: "ST", color: "#f5f3ff", textColor: "#7c3aed" },
];

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="#fbbf24">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function SocialProof() {
  return (
    <section style={{ background: "#f8fafc", padding: "100px 0" }}>
      <div className="container-xl">

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", marginBottom: 80 }}>
          {stats.map(({ value, label, sub }, i) => (
            <div key={label} style={{
              padding: "32px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #f1f5f9" : undefined,
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#334155", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 12 }}>Testimonials</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>
            What our users say
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.map(({ quote, name, role, company, avatar, color, textColor }) => (
            <div key={name} style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
              padding: 28, display: "flex", flexDirection: "column",
              transition: "box-shadow 0.2s",
            }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[...Array(5)].map((_, i) => <Star key={i} />)}
              </div>
              <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
                &ldquo;{quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: textColor, flexShrink: 0 }}>
                  {avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{role} · {company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          section > div > div:first-child { grid-template-columns: repeat(2, 1fr) !important; }
          section > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
