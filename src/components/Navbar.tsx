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
    <header className="sticky top-0 z-50 w-full border-b border-gray4 bg-gray1">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl text-primary whitespace-nowrap"
        >
          <span>SuperLang</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[0.95rem] font-bold transition-colors duration-200 ${
                    isActive
                      ? "text-accent"
                      : "text-dark-text hover:text-accent"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-1 bg-accent rounded-full"/>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Sign In Button */}
          <Link
            href="#"
            className="text-dark-text text-sm font-semibold whitespace-nowrap transition-colors hover:text-accent"
          >
            Sign In
          </Link>

          {/* Get Started Button */}
          <Link
            href="#"
            className="bg-accent text-white px-5 py-[0.55rem] rounded-lg text-sm font-semibold whitespace-nowrap transition-colors hover:bg-dark-text"
          >
            Get Started
          </Link>

          {/* Language Button */}
          <button
            className="flex items-center gap-1.5 border border-gray4 rounded-md px-3 py-2 text-sm font-medium text-dark-text transition-colors hover:bg-accent hover:text-white"
            aria-label="Select Language"
          >
            <Globe className="w-4 h-4" />
            <span>EN</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button
          className="flex md:hidden items-center justify-center text-dark-text p-1"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray1 border-b border-gray4 shadow-lg flex flex-col px-4 py-5 gap-6 z-50 md:hidden">
            {/* Mobile Nav Links */}
            <ul className="flex flex-col gap-4 list-none w-full">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block text-base font-medium w-full transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-dark-text hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Drawer Actions */}
            <div className="flex flex-col gap-4 pt-5 border-t border-gray4 w-full">
              <div className="flex items-center justify-between w-full">
                <button
                  className="flex items-center gap-1.5 border border-gray4 rounded-md px-3 py-[0.4rem] text-sm font-medium text-dark-text transition-colors hover:bg-accent hover:text-white"
                  aria-label="Select Language"
                >
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center border border-gray4 text-dark-text px-5 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-accent hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="w-full bg-accent text-white px-5 py-3 rounded-lg text-sm font-semibold text-center transition-colors hover:bg-dark-text"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}