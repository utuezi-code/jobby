import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-indigo-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to land more interviews?
        </h2>
        <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
          Your first two optimizations are free. No account required. Just upload
          your CV and a job description — we&apos;ll handle the rest.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/app">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold gap-2"
            >
              Start optimizing now
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
