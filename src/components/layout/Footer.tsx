import Link from "next/link";

const cols = {
  Product: ["Features", "How it works", "Pricing", "Templates"],
  Resources: ["Blog", "ATS Guide", "CV Tips", "Changelog"],
  Legal: ["Privacy", "Terms", "GDPR", "Security"],
};

export default function Footer() {
  return (
    <footer style={{ background: "#020617", borderTop: "1px solid #0f172a", padding: "64px 0 40px" }}>
      <div className="container-xl">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                CVMatch<span style={{ color: "#818cf8" }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, maxWidth: 200 }}>
              Optimize your CV for every job — without lying about your experience.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([section, items]) => (
            <div key={section}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#334155", marginBottom: 16 }}>
                {section}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" style={{ fontSize: 14, color: "#475569", textDecoration: "none" }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #0f172a", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#334155" }}>
            © {new Date().getFullYear()} CVMatch AI · All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#334155" }}>
            Made with honesty — we never invent skills.
          </p>
        </div>
      </div>
    </footer>
  );
}
