import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden w-full flex-1 flex flex-col items-center justify-center pt-24 pb-32 px-8">
      {/* Background glowing gradient effects for a modern "premium" feel */}
      <div className="absolute top-0 left-1/2 -ml-160 w-7xl h-160 bg-linear-to-b from-indigo-100/50 via-cyan-50/20 to-transparent dark:from-indigo-900/20 dark:via-cyan-900/10 blur-3xl opacity-70 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Huge Headline */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-light-text">
          Read and learn through{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-400">
            engaging stories
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Unlock your true potential in English and French. Immerse yourself in a growing library of bilingual books tailored to make language acquisition feel completely natural.
        </p>

        {/* Interactive CTA Buttons with micro-animations */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/library"
            className="group inline-flex h-14 items-center justify-center rounded-full bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-700 hover:shadow-indigo-500/25 active:scale-95"
          >
            Start Reading for Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Supported Languages indicator */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-gray-400 dark:text-gray-500">
           <div className="text-xs font-bold tracking-widest uppercase">Full Support For</div>
           <div className="flex gap-6 items-center text-lg">
             <span className="font-semibold text-gray-800 dark:text-gray-300">English</span>
             <span className="text-sm">•</span>
             <span className="font-semibold text-gray-800 dark:text-gray-300">Français</span>
             <span className="text-sm">•</span>
             <span className="font-semibold text-gray-800 dark:text-gray-300">العربية</span>
           </div>
        </div>

      </div>
    </div>
  );
}