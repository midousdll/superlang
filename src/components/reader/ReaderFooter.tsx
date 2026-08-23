"use client";

export default function Navbar() {
  return (
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
            Prev
          </button>
          <strong className="text-sm">CHAPTER TITLE</strong>
          <button className="bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
            Next
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-sm font-semibold">
            Words: 1,420
          </span>
          <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-sm font-semibold">
            Known: 850
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-sm font-semibold">
            To Learn: 42
          </span>
        </div>
        <button className="bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
          Saved Words List
        </button>
      </div>
  );
}