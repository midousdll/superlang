import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-24 bg-white dark:bg-black px-8">
      <div className="max-w-5xl mx-auto rounded-3xl bg-indigo-600 px-8 py-20 text-center text-white shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Decorative background glow behind the CTA box */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-400 blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-500 blur-3xl opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to read your first book?
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-10 leading-relaxed">
            Join thousands of Arabic speakers mastering English and French naturally through the power of interactive storytelling.
          </p>
          <Link
            href="/library"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-bold text-indigo-900 shadow-lg transition-transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Create Your Free Account
          </Link>
          <p className="mt-5 text-sm font-medium text-indigo-200">
            No credit card required. Start reading in under 30 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
