"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Library", href: "/library" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Demo", href: "/#demo" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-cream">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        
        {/* Logo ================================================================================== */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-serif text-lg font-bold text-slate-dark tracking-tight"
        >
          <span className="text-slate-dark text-xs">✦</span>
          <span>Super<span className="italic font-normal">Lang</span></span>
        </Link>
        
        {/* Desktop Navigation Links ============================================================== */}
        <ul className="hidden md:flex items-center gap-2 list-none">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-slate-dark border border-stone-200/80 shadow-xs"
                      : "text-stone-600 hover:text-slate-dark hover:bg-stone-200/40"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions ======================================================================= */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector */}
          <button
            className="flex items-center gap-1.5 border border-stone-200/80 rounded-sm px-2.5 py-1.5 text-xs font-medium text-slate-dark bg-white/50 hover:bg-white transition-all"
            aria-label="Select Language"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>

          {/* Log In Button */}
          <Link
            href="#"
            className="bg-slate-dark text-white px-4 py-1.5 rounded-sm text-xs font-medium transition-all hover:bg-black"
          >
            Log In
          </Link>
        </div>
        
        {/* Mobile Hamburger Button =============================================================== */}
        <button
          className="flex md:hidden items-center justify-center text-slate-dark p-1"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-cream border-b border-stone-200/80 shadow-lg flex flex-col p-4 gap-3 z-50 md:hidden">
            <ul className="flex flex-col gap-1.5 list-none w-full">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2 rounded-sm text-xs font-medium transition-all ${
                        isActive
                          ? "bg-white text-slate-dark border border-stone-200/80"
                          : "text-stone-600 hover:text-slate-dark"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200/80 w-full">
              <button
                className="flex items-center gap-1.5 border border-stone-200/80 rounded-sm px-3 py-1.5 text-xs font-medium text-slate-dark bg-white"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span>EN</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="bg-slate-dark text-white px-4 py-1.5 rounded-sm text-xs font-medium transition-all hover:bg-black"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}