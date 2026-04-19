"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.2s, box-shadow 0.2s",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "none",
      }}
    >
      <div className="container-xl" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", letterSpacing: "-0.02em" }}>
            CVMatch<span style={{ color: "#6366f1" }}>AI</span>
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden md:flex">
          {[["Features", "#features"], ["How it works", "#how-it-works"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <Link key={label} href={href}
              style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0f172a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden md:flex">
          <Link href="/app" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>Sign in</Link>
          <Link href="/app" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#6366f1", color: "#fff", fontWeight: 600, fontSize: 14,
            padding: "8px 16px", borderRadius: 8, textDecoration: "none",
            transition: "background 0.15s",
          }}>
            Get started free
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ padding: 8, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#475569" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #e2e8f0", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {[["Features", "#features"], ["How it works", "#how-it-works"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}
              style={{ fontSize: 14, fontWeight: 500, color: "#334155", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
          <Link href="/app" onClick={() => setOpen(false)}
            style={{ display: "flex", justifyContent: "center", background: "#6366f1", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px", borderRadius: 8, textDecoration: "none" }}>
            Get started free
          </Link>
        </div>
      )}
    </header>
  );
}
