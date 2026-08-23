"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full min-h-20 border-b border-black bg-yellow px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/library"
            className="flex px-4 py-2 bg-white text-black gap-1">
              <ChevronLeft></ChevronLeft>
              BACK TO LIBRARY
          </Link>
          <span className="text-base font-semibold">THE BOOK TITLE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
            View: Bilingual
          </button>
          <button className="bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
            Mode: Word
          </button>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Language: FR
          </button>
        </div>
      </header>
  );
}