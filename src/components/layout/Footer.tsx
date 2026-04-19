import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-indigo-600 text-lg mb-3">
              <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              CVMatch<span className="text-emerald-500">AI</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Optimize your CV for every job — without lying about your experience.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/#features" className="hover:text-indigo-600 transition-colors duration-150">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-indigo-600 transition-colors duration-150">Pricing</Link></li>
              <li><Link href="/app" className="hover:text-indigo-600 transition-colors duration-150">Try for free</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">Blog</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">Templates</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">ATS Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">Privacy</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">Terms</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors duration-150">GDPR</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CVMatch AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Made with honesty — we never invent skills.
          </p>
        </div>
      </div>
    </footer>
  );
}
