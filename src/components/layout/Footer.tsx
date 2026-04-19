import Link from "next/link";

const links = {
  Product: ["Features", "How it works", "Pricing", "Templates"],
  Resources: ["Blog", "ATS Guide", "CV Tips", "Changelog"],
  Legal: ["Privacy", "Terms", "GDPR", "Security"],
};

export default function Footer() {
  return (
    <footer className="bg-night-950 border-t border-night-800 py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="8" cy="8" r="2" fill="white"/>
                </svg>
              </div>
              <span className="text-[15px] font-bold text-white tracking-tight">
                CVMatch<span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-night-400 leading-relaxed max-w-[200px]">
              Optimize your CV for every job — without lying about your experience.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-bold tracking-widest uppercase text-night-500 mb-4">{section}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-night-400 hover:text-white transition-colors duration-150"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-night-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-night-600">
            &copy; {new Date().getFullYear()} CVMatch AI. All rights reserved.
          </p>
          <p className="text-xs text-night-600">
            Made with honesty — we never invent skills.
          </p>
        </div>
      </div>
    </footer>
  );
}
