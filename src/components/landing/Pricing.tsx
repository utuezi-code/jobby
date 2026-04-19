import Link from "next/link";
import { Check, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect to try CVMatch AI on your next application.",
    features: [
      "2 CV optimizations / month",
      "PDF & DOCX upload",
      "Match score",
      "3 free templates",
      "PDF export",
    ],
    missing: ["Unlimited optimizations", "Premium templates", "DOCX export", "Version history"],
    cta: "Get started free",
    href: "/app",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€9",
    period: "/ month",
    description: "For active job seekers who apply to multiple positions.",
    features: [
      "Unlimited optimizations",
      "All file formats",
      "Advanced match score",
      "10+ premium templates",
      "PDF & DOCX export",
      "Version history",
      "Multi-job comparison",
      "Priority processing",
    ],
    missing: [],
    cta: "Start 7-day free trial",
    href: "/app",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
            Pricing
          </p>
          <h2 className="text-4xl font-bold text-indigo-950 mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-8 flex flex-col",
                plan.highlighted
                  ? "bg-indigo-500 border-indigo-500 text-white shadow-xl"
                  : "bg-white border-slate-200"
              )}
            >
              {plan.highlighted && (
                <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white mb-4 self-start">
                  <Zap size={12} />
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn("font-bold text-lg mb-1", plan.highlighted ? "text-white" : "text-indigo-950")}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={cn("text-4xl font-bold", plan.highlighted ? "text-white" : "text-indigo-950")}>
                    {plan.price}
                  </span>
                  <span className={cn("text-sm", plan.highlighted ? "text-indigo-200" : "text-slate-400")}>
                    {plan.period}
                  </span>
                </div>
                <p className={cn("text-sm", plan.highlighted ? "text-indigo-100" : "text-slate-500")}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className={cn("mt-0.5 flex-shrink-0", plan.highlighted ? "text-emerald-300" : "text-emerald-500")} />
                    <span className={plan.highlighted ? "text-white" : "text-slate-700"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  variant={plan.highlighted ? "secondary" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full font-semibold",
                    plan.highlighted && "bg-white text-indigo-600 hover:bg-indigo-50"
                  )}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          All plans include data privacy. We never share your CV data.
        </p>
      </div>
    </section>
  );
}
