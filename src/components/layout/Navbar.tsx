"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          CVMatch<span className="text-emerald-500">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors duration-150">Features</Link>
          <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors duration-150">How it works</Link>
          <Link href="/#pricing" className="hover:text-indigo-600 transition-colors duration-150">Pricing</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/app" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-150">
            Sign in
          </Link>
          <Link href="/app">
            <Button size="sm" variant="cta">Get started free</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
          <Link href="/#features" className="text-sm font-medium text-slate-600" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-600" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/#pricing" className="text-sm font-medium text-slate-600" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/app">
            <Button size="sm" variant="cta" className="w-full">Get started free</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
