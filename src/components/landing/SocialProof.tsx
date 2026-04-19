const testimonials = [
  {
    quote:
      "I went from 1 callback per 20 applications to 1 in 5. The keywords alignment is insane.",
    name: "Léa M.",
    role: "Product Designer",
    avatar: "LM",
  },
  {
    quote:
      "Finally a tool that doesn't make my CV sound like a robot wrote it. Everything sounds like me.",
    name: "Karim B.",
    role: "Full Stack Developer",
    avatar: "KB",
  },
  {
    quote:
      "The ethical guardrail is what convinced me. It warned me about missing skills instead of faking them.",
    name: "Sophie T.",
    role: "Marketing Manager",
    avatar: "ST",
  },
];

const stats = [
  { value: "12,000+", label: "CVs optimized" },
  { value: "3.2×", label: "More interview callbacks" },
  { value: "4.8/5", label: "User satisfaction" },
  { value: "< 2 min", label: "Average optimization time" },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-1">{value}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-950 mb-3">
            What our users say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <div
              key={name}
              className="bg-slate-50 border border-slate-100 rounded-xl p-6"
            >
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-indigo-950">{name}</div>
                  <div className="text-xs text-slate-400">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
