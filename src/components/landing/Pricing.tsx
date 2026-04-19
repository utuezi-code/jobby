import Link from "next/link";
import { Check, Zap, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Try CVMatch AI risk-free. No credit card.",
    features: [
      { text: "2 CV optimizations / month", included: true },
      { text: "PDF & DOCX upload", included: true },
      { text: "Match score & keywords", included: true },
      { text: "3 free templates", included: true },
      { text: "PDF export", included: true },
      { text: "Unlimited optimizations", included: false },
      { text: "Premium templates", included: false },
      { text: "DOCX export", included: false },
    ],
    cta: "Start for free",
    href: "/app",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€9",
    period: "per month",
    description: "For active job seekers. Cancel anytime.",
    features: [
      { text: "Unlimited optimizations", included: true },
      { text: "All file formats", included: true },
      { text: "Advanced match score", included: true },
      { text: "10+ premium templates", included: true },
      { text: "PDF & DOCX export", included: true },
      { text: "Version history", included: true },
      { text: "Multi-job comparison", included: true },
      { text: "Priority processing", included: true },
    ],
    cta: "Start 7-day free trial",
    href: "/app",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-500 mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-black text-night-900 tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-night-500 text-lg max-w-md mx-auto">
            Start free. Upgrade when you need more. No hidden fees, ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-night-950 border border-night-800 shadow-2xl"
                  : "bg-white border border-night-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-500/30">
                    <Zap size={11} /> Most popular
                  </span>
                </div>
              )}

              <div className="mb-7">
                <h3 className={`text-lg font-bold mb-1 ${plan.highlighted ? "text-white" : "text-night-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className={`text-5xl font-black ${plan.highlighted ? "text-white" : "text-night-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-medium ${plan.highlighted ? "text-night-400" : "text-night-400"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.highlighted ? "text-night-400" : "text-night-500"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(({ text, included }) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    {included ? (
                      <Check size={15} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <X size={15} className="text-night-600 flex-shrink-0" />
                    )}
                    <span className={included
                      ? plan.highlighted ? "text-night-100" : "text-night-700"
                      : "text-night-500 line-through"
                    }>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center font-semibold text-[15px] py-3.5 rounded-xl transition-all duration-150 ${
                  plan.highlighted
                    ? "bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/25"
                    : "bg-night-900 hover:bg-night-800 text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-night-400 mt-8">
          Your CV data is encrypted and never shared. GDPR compliant.
        </p>
      </div>
    </section>
  );
}
