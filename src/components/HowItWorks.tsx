"use client";

const STEPS = [
  {
    number: "01",
    title: "Choose a story",
    description:
      "Explore the library organized by level (A1–C2) and pick a short story that catches your eye.",
  },
  {
    number: "02",
    title: "Read & translate side-by-side",
    description:
      "Follow along in two languages simultaneously. Click or tap any word to view instant definitions without losing your place.",
  },
  {
    number: "03",
    title: "Keep your thread",
    description:
      "Save new vocabulary directly to your personal list and build a quiet daily reading habit at your own pace.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 bg-cream text-slate-dark border-t border-stone-200/80 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-bold tracking-widest text-rust uppercase block mb-3">
            ✦ How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-dark">
            A simple, quiet reading routine
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            No complex setups or distraction. Just clear stories side-by-side with interactive translation tools.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-stone-200/80 rounded-xs p-8 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition-all"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-rust tracking-wider">
                    {step.number} / ROUTINE
                  </span>
                  <span className="w-1.5 h-1.5 bg-beige-card rounded-full" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-normal text-slate-dark mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>STEP {step.number}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}