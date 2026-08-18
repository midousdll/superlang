"use client";

export default function HowItWorks() {
  return (
    <section className="w-full py-24 bg-white dark:bg-black px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* 1 */}
        <div className="flex-1 space-y-6 bg-accent px-9 py-4.5 min-h-100">
          <h2 className="text-2xl md:text-5xl font-extrabold text-light-text tracking-tight">
            Choose a book
          </h2>
          <p className="text-lg text-dark-text leading-relaxed">
            Explore the library and pick the book you want.
          </p>
        </div>

        {/* 2 */}
        <div className="flex-1 space-y-6 bg-accent px-9 py-4.5 min-h-100">
          <h2 className="text-2xl md:text-5xl font-extrabold text-light-text tracking-tight">
            Start reading
          </h2>
          <p className="text-lg text-dark-text leading-relaxed">
            Start reading side by side, a,d click to translate words.
          </p>
        </div>

      </div>
    </section>
  );
}
