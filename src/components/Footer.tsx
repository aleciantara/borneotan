import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0C0804] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-white text-2xl font-black mb-3">🦧 BorneoTan</div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Educating the world about Bornean orangutans and the urgent need to
              protect their rainforest home before it&apos;s too late.
            </p>
          </div>
          {/* Explore */}
          <div>
            <h4 className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/#about", "About"],
                ["/#why-help", "Why Help"],
                ["/#fun-facts", "Fun Facts"],
                ["/blog", "Blog"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>info@borneotan.org</li>
              <li>Kalimantan, Indonesia</li>
              <li className="pt-2">
                <Link
                  href="/#donate"
                  className="inline-block bg-[#E85A00] hover:bg-[#C44E00] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Donate Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/25">
          <p>&copy; {new Date().getFullYear()} BorneoTan. All rights reserved.</p>
          <p>Photos by Unsplash contributors — free under the Unsplash License</p>
        </div>
      </div>
    </footer>
  );
}

