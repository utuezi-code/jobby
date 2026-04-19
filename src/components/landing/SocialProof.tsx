const testimonials = [
  {
    quote: "I went from 1 callback per 20 applications to 1 in 5. The keyword alignment is genuinely insane.",
    name: "Léa M.",
    role: "Product Designer",
    company: "Previously at Figma",
    avatar: "LM",
    color: "bg-brand-100 text-brand-700",
  },
  {
    quote: "Finally a tool that doesn't make my CV sound like a robot wrote it. Every change sounds exactly like me.",
    name: "Karim B.",
    role: "Full Stack Engineer",
    company: "Hired at Vercel",
    avatar: "KB",
    color: "bg-green-100 text-green-700",
  },
  {
    quote: "The ethical guardrail convinced me. It showed me what I was missing — no fake skills, just honest gaps.",
    name: "Sophie T.",
    role: "Marketing Lead",
    company: "Joined Spotify",
    avatar: "ST",
    color: "bg-violet-100 text-violet-700",
  },
];

const stats = [
  { value: "12,000+", label: "CVs optimized", sub: "and counting" },
  { value: "3.2×", label: "More callbacks", sub: "avg. user result" },
  { value: "4.8/5", label: "Satisfaction", sub: "from 2,400 reviews" },
  { value: "< 2min", label: "Per optimization", sub: "end to end" },
];

export default function SocialProof() {
  return (
    <section className="py-28 bg-night-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-night-200 rounded-2xl overflow-hidden mb-24 border border-night-200">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="bg-white px-6 py-8 text-center">
              <div className="text-3xl sm:text-4xl font-black text-night-900 mb-1">{value}</div>
              <div className="text-sm font-semibold text-night-700 mb-0.5">{label}</div>
              <div className="text-xs text-night-400">{sub}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-500 mb-3">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-black text-night-900 tracking-tight">
            What our users say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, company, avatar, color }) => (
            <div
              key={name}
              className="bg-white border border-night-200 rounded-2xl p-7 flex flex-col hover:shadow-md hover:border-night-300 transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <p className="text-night-700 text-[15px] leading-relaxed flex-1 mb-6">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-night-900">{name}</div>
                  <div className="text-xs text-night-400">{role} · {company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
