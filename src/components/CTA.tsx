import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-20 bg-cream text-slate-dark border-t border-stone-200/80 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-stone-200/80 rounded-xs p-10 sm:p-16 text-center shadow-2xs relative overflow-hidden">
        
        {/* Header Badge */}
        <span className="text-xs font-bold tracking-widest text-rust uppercase block mb-3 font-mono">
          ✦ Get Started
        </span>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-dark mb-4 leading-tight">
          Ready to read your first story?
        </h2>

        {/* Description */}
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
          Master English and French naturally through side-by-side reading and instant, context-aware translations.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/library"
            className="inline-flex h-11 items-center justify-center rounded-xs bg-slate-dark px-8 text-xs font-mono uppercase tracking-wider text-cream shadow-2xs hover:bg-black transition-all"
          >
            Start Reading Now
          </Link>
        </div>

        {/* Micro Footer */}
        <p className="mt-5 text-[11px] font-mono text-stone-400 uppercase tracking-wider">
          Free to start • No credit card required
        </p>

      </div>
    </section>
  );
}