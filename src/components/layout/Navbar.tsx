"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-night-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </div>
          <span className={`text-[15px] font-bold tracking-tight ${scrolled ? "text-night-900" : "text-night-900"}`}>
            CVMatch<span className="text-brand-500">AI</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {["Features", "How it works", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-night-600 hover:text-night-900 transition-colors duration-150"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/app"
            className="text-sm font-medium text-night-600 hover:text-night-900 transition-colors duration-150 px-1"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-night-600 hover:bg-night-100 cursor-pointer transition-colors duration-150"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-night-100 px-5 py-5 flex flex-col gap-4">
          {["Features", "How it works", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-night-700"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/app"
            className="mt-1 inline-flex items-center justify-center text-sm font-semibold bg-brand-500 text-white px-4 py-2.5 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Get started free
          </Link>
        </div>
      )}
    </header>
  );
}
