import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-cream min-h-[85vh] w-full flex items-center justify-center px-6 py-12 md:py-20 text-slate-dark">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Controls */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Tagline */}
          <div className="flex items-center gap-2 text-rust text-xs font-bold tracking-widest uppercase">
            <span>✦</span>
            <span>Your Personal Reading Corner</span>
          </div>

          {/* Headline with Serif & Italic Accent */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-slate-dark">
            Read a little. <br />
            <span className="italic text-rust font-normal">Keep the thread.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-600 text-base sm:text-lg max-w-lg leading-relaxed pt-1">
            Short stories for growing your English, French, and Arabic, one understandable page at a time.
          </p>

          {/* Language Selection Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/library?lang=en"
              className="inline-flex items-center gap-2 bg-slate-dark text-white px-5 py-3 rounded-xs text-xs font-semibold hover:bg-black transition-all shadow-xs"
            >
              <span className="w-2 h-2 border border-white inline-block rotate-45" />
              <span>Start with English</span>
            </Link>

            <Link
              href="/library?lang=fr"
              className="inline-flex items-center gap-1.5 border border-stone-300 bg-transparent text-slate-dark px-5 py-3 rounded-xs text-xs font-semibold hover:bg-stone-200/50 transition-all"
            >
              <span>Lire en français</span>
              <span>→</span>
            </Link>
          </div>

          {/* Footer Note / Meta */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-2">
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full inline-block" />
            <span>No account needed · Progress stays on this device</span>
          </div>

        </div>

        {/* Right Column: Paper Note Preview */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end pt-6 lg:pt-0">
          
          {/* Outer Layer Card Accent */}
          <div className="bg-beige-card/40 absolute inset-0 max-w-sm mx-auto lg:ml-auto rounded-xs transform rotate-3 scale-102 -z-10" />

          {/* Main Paper Note Card */}
          <div className="bg-white p-8 sm:p-10 rounded-xs shadow-xl rotate-1 border border-stone-200/60 max-w-sm w-full relative">
            
            {/* Paper Tape Top Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-beige-card/70 rotate-1 shadow-2xs border-t border-white/50" />

            {/* Note Meta Header */}
            <div className="flex justify-between items-center text-[11px] text-stone-400 font-mono tracking-wider uppercase mb-8">
              <span>FIELD NOTE 01</span>
              <span>2026</span>
            </div>

            {/* Note Icon */}
            <div className="w-10 h-10 border border-rust/40 rounded-full flex items-center justify-center mb-6">
              <span className="w-3 h-3 border border-rust rotate-45" />
            </div>

            {/* Quote Body */}
            <p className="font-serif text-2xl text-slate-dark leading-snug mb-8">
              “The best way to meet a new language is to spend a few quiet minutes with it.”
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-stone-100 mb-6" />

            {/* Note Footer */}
            <span className="text-xs text-stone-400 font-sans block">
              A personal reader for curious beginners
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}