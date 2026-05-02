"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#why-help", label: "Why Help" },
  { href: "/#fun-facts", label: "Fun Facts" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0C0804]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-white text-xl font-black tracking-tight hover:text-[#E85A00] transition-colors">
          🦧 BorneoTan
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative text-sm font-medium text-white/60 hover:text-white transition-colors group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#E85A00] group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#donate"
              className="bg-[#E85A00] hover:bg-[#C44E00] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0C0804] border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#donate"
            className="bg-[#E85A00] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-[#C44E00] transition-colors"
            onClick={() => setOpen(false)}
          >
            Donate Now
          </Link>
        </div>
      )}
    </nav>
  );
}
