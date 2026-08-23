import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-cream border-t border-stone-200/80 text-stone-600 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 font-serif text-base font-bold text-slate-dark tracking-tight"
            >
              <span className="text-slate-dark text-xs">✦</span>
              <span>Super<span className="italic font-normal">Lang</span></span>
            </Link>
            <p className="text-stone-500 leading-relaxed max-w-xs">
              Read copyright-free stories side-by-side with interactive translations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-dark uppercase tracking-wider mb-3 text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="hover:text-slate-dark transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-slate-dark transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#demo" className="hover:text-slate-dark transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages Column */}
          <div>
            <h4 className="font-semibold text-slate-dark uppercase tracking-wider mb-3 text-[11px]">
              Supported Languages
            </h4>
            <ul className="space-y-2 text-stone-500">
              <li>English</li>
              <li>French</li>
              <li>Arabic</li>
            </ul>
          </div>

          {/* Legal / Note */}
          <div>
            <h4 className="font-semibold text-slate-dark uppercase tracking-wider mb-3 text-[11px]">
              Practice Daily
            </h4>
            <p className="text-stone-500 leading-relaxed italic">
              &quot;The best way to meet a new language is to spend a few quiet minutes with it.&quot;
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <p>© {new Date().getFullYear()} SuperLang. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-stone-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-stone-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}