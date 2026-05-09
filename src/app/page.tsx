import Image from "next/image";
import Link from "next/link";
import { listLatestPublishedBlogs, listLatestStats } from "@/lib/db";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroBackground from "@/components/HeroBackground";

export const revalidate = 3600;

function excerpt(content: string, maxLen = 120) {
  const plain = content.replace(/#{1,6}\s+/g, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + "…" : plain;
}

const facts = [
  { emoji: "🧠", title: "Highly Intelligent", body: "They use tools, solve complex puzzles, and can even learn sign language — rivalling human cognitive abilities." },
  { emoji: "🌿", title: "Forest Architects", body: "Known as the 'gardeners of the forest', they disperse seeds across vast areas, regenerating the rainforest." },
  { emoji: "👶", title: "Long Childhood", body: "They stay with their mothers for up to 8 years — the longest of any non-human primate on Earth." },
  { emoji: "🛌", title: "Nest Builders", body: "Every night they engineer a new sleeping nest from branches and leaves high in the forest canopy." },
  { emoji: "🌳", title: "Solitary by Nature", body: "Unlike most great apes, they are semi-solitary and spend most of their lives navigating the treetops alone." },
  { emoji: "🍌", title: "Fruit Lovers", body: "Fruit makes up ~60% of their diet. They also eat insects, bark, flowers, and small vertebrates." },
  { emoji: "🧬", title: "97% Human DNA", body: "Orangutans share approximately 97% of their DNA with us — making them one of our closest living relatives." },
  { emoji: "📣", title: "The Long Call", body: "Male orangutans produce a haunting 'long call' that echoes up to 1 km through the jungle to attract mates." },
];

export default async function Home() {
  const [stats, posts] = await Promise.all([
    listLatestStats(4),
    listLatestPublishedBlogs(3),
  ]);

  return (
    <>
      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Hero carousel background */}
        <HeroBackground />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6 py-20">
          {/* Badge */}
          <div className="anim-fade-up delay-0 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E85A00] opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E85A00]" />
            </span>
            Conservation · Education · Action
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up delay-200 text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tight mb-7">
            Protect the<br />
            <span className="text-gradient">Last Wild</span><br />
            Orangutans
          </h1>

          {/* Sub */}
          <p className="anim-fade-up delay-400 text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bornean orangutans are critically endangered. Join us in raising awareness,
            funding conservation, and driving real change across Borneo.
          </p>

          {/* CTAs */}
          <div className="anim-fade-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="bg-[#E85A00] hover:bg-[#C44E00] text-white font-semibold px-9 py-4 rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-[#E85A00]/30"
            >
              Donate Now
            </a>
            <a
              href="#about"
              className="border border-white/25 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-9 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Our Mission
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in delay-800 flex flex-col items-center gap-2 text-white/30 text-[11px] font-medium tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE TICKER
      ════════════════════════════════════ */}
      <div className="bg-[#E85A00] overflow-hidden py-3.5 select-none" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-10 pr-10 text-white/90 text-[11px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
              <span>🦧 Critically Endangered</span>
              <span className="opacity-40">◆</span>
              <span>40% Forest Lost in 40 Years</span>
              <span className="opacity-40">◆</span>
              <span>📉 Only ~100,000 Remain in the Wild</span>
              <span className="opacity-40">◆</span>
              <span>🔥 5 Football Fields of Habitat Destroyed Per Minute</span>
              <span className="opacity-40">◆</span>
              <span>🌿 Your Support Changes Everything</span>
              <span className="opacity-40">◆</span>
              <span>🏝️ Found Only in Borneo &amp; Sumatra, Indonesia</span>
              <span className="opacity-40">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          STATS BAR
      ════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="bg-[#0C0804] border-b border-white/5 py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 120}>
                  <p className="text-3xl md:text-4xl font-black text-[#E85A00]">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-white/40 text-sm mt-1">{s.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════
          ABOUT
      ════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-36 bg-[#FFFDF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <ScrollReveal>
            <div>
              <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-5">
                About Us
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-[#1A120A]">
                We Fight for<br />
                Borneo&apos;s <span className="text-gradient">Most Iconic Ape</span>
              </h2>
              <p className="text-[#6B5444] text-lg leading-relaxed mb-4">
                BorneoTan is a non-profit educational initiative dedicated to raising
                awareness about the plight of Bornean orangutans and the urgent need to
                protect their natural habitat.
              </p>
              <p className="text-[#6B5444] leading-relaxed mb-8">
                The Bornean orangutan (<em>Pongo pygmaeus</em>) shares 97% of our DNA.
                These remarkable primates are the &ldquo;gardeners of the forest&rdquo; — vital seed
                dispersers whose survival determines the fate of the entire Bornean
                rainforest ecosystem.
              </p>

              {/* Mission / Vision cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#FFF3E8] border border-[#F0E4D4] rounded-2xl p-5">
                  <h3 className="text-[#1A120A] font-bold text-xs uppercase tracking-wider mb-2">Mission</h3>
                  <p className="text-sm text-[#6B5444]">Educate, inspire, and mobilize people to protect Bornean orangutans.</p>
                </div>
                <div className="bg-[#FFF3E8] border border-[#F0E4D4] rounded-2xl p-5">
                  <h3 className="text-[#1A120A] font-bold text-xs uppercase tracking-wider mb-2">Vision</h3>
                  <p className="text-sm text-[#6B5444]">A world where orangutans thrive in healthy, intact rainforests.</p>
                </div>
              </div>

              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full">
                Critically Endangered — 50%+ decline in 60 years
              </span>
            </div>
            </ScrollReveal>

            {/* Image with floating accent cards */}
            <ScrollReveal delay={200}>
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1699709823274-f3cb659b640b?auto=format&fit=crop&w=800&q=80"
                  alt="Close-up portrait of a Bornean orangutan"
                  fill
                  className="object-cover hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              {/* Floating card — bottom left */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-[#F0E4D4]">
                <p className="text-2xl font-black text-[#E85A00]">97%</p>
                <p className="text-xs text-[#6B5444] leading-tight">DNA shared<br />with humans</p>
              </div>
              {/* Floating card — top right */}
              <div className="absolute -top-4 -right-4 bg-[#0C0804] text-white rounded-2xl p-4 shadow-xl">
                <p className="text-2xl font-black">&gt;50%</p>
                <p className="text-xs text-white/50 leading-tight">population<br />decline</p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY HELP
      ════════════════════════════════════ */}
      <section id="why-help" className="bg-[#0C0804] overflow-hidden">
        {/* Top label */}
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-36 pb-16 text-center">
            <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-5">The Threats</p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Three Reasons<br />
              <span className="text-gradient">They Are Disappearing</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Full-bleed threat rows */}
        {[
          {
            num: "01",
            title: "Deforestation",
            stat: "50%+",
            statLabel: "of Borneo's forest lost",
            body: "Palm oil plantations, illegal logging, and slash-and-burn agriculture have wiped out over half of Borneo's ancient rainforest in just one century. Every minute, five football fields of habitat vanish forever.",
            img: "https://images.unsplash.com/photo-1645430785800-d7d0daac9c5c?auto=format&fit=crop&w=1200&q=80",
            imgAlt: "Felled timber logs in a cleared forest — deforestation",
            reverse: false,
          },
          {
            num: "02",
            title: "Habitat Fragmentation",
            stat: "100 km²",
            statLabel: "minimum territory needed per group",
            body: "As forests shrink into isolated patches, orangutans are forced to cross farmland and roads — where they are shot, electrocuted on power lines, or captured. Fragmentation is a death sentence for a solitary species.",
            img: "https://images.unsplash.com/photo-1632789124528-07b43ba96460?auto=format&fit=crop&w=1200&q=80",
            imgAlt: "Aerial view of a road cutting through tropical forest — habitat fragmentation",
            reverse: true,
          },
          {
            num: "03",
            title: "Illegal Wildlife Trade",
            stat: "1,000+",
            statLabel: "captured illegally each year",
            body: "Despite legal protection in Indonesia, orangutans are still poached for the exotic pet trade. Mothers are killed so their infants can be taken. Most captive infants die within months. This silent slaughter is accelerating their extinction.",
            img: "https://images.unsplash.com/photo-1571386195942-dfb9db1e17d9?auto=format&fit=crop&w=1200&q=80",
            imgAlt: "Orangutan mother with infant in the wild",
            reverse: false,
          },
        ].map((t, i) => (
          <ScrollReveal key={t.num} delay={80}>
            <div className={`flex flex-col ${t.reverse ? "md:flex-row-reverse" : "md:flex-row"} min-h-[420px] border-t border-white/8`}>
              {/* Image side */}
              <div className="relative w-full md:w-1/2 min-h-[280px] md:min-h-[420px] overflow-hidden">
                <Image
                  src={t.img}
                  alt={t.imgAlt}
                  fill
                  className="object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-75 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Big number watermark */}
                <span className="absolute bottom-4 right-6 text-[7rem] font-black text-white/5 leading-none select-none pointer-events-none">
                  {t.num}
                </span>
              </div>

              {/* Text side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-14 bg-[#0C0804]">
                <p className="text-[#E85A00] text-xs font-bold tracking-[0.22em] uppercase mb-4">{t.num}</p>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{t.title}</h3>
                {/* Stat pill */}
                <div className="inline-flex items-baseline gap-2 bg-[#E85A00]/10 border border-[#E85A00]/25 rounded-full px-5 py-2.5 mb-6 w-fit">
                  <span className="text-2xl font-black text-[#E85A00]">{t.stat}</span>
                  <span className="text-white/45 text-xs">{t.statLabel}</span>
                </div>
                <p className="text-white/55 leading-relaxed text-[0.95rem]">{t.body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Bottom padding */}
        <div className="h-16 md:h-24" />
      </section>

      {/* ════════════════════════════════════
          FUN FACTS
      ════════════════════════════════════ */}
      <section id="fun-facts" className="py-24 md:py-36 bg-[#0C0804] dot-grid relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-4">Did You Know?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Get to Know <span className="text-gradient">Them</span>
            </h2>
          </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facts.map((f, i) => (
              <ScrollReveal key={f.title} delay={Math.min(i * 80, 400)}>
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1.5 hover:border-[#E85A00]/30 transition-all duration-300 cursor-default h-full"
              >
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="text-white font-bold mb-2 text-sm">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.body}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BLOG PREVIEW
      ════════════════════════════════════ */}
      <section id="blog" className="py-24 md:py-36 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-4">From The Blog</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A120A]">Latest Stories</h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#E85A00] hover:text-[#C44E00] transition-colors flex-shrink-0"
            >
              View all posts →
            </Link>
          </div>
          </ScrollReveal>

          {posts.length === 0 ? (
            <ScrollReveal>
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl font-black text-[#1A120A] mb-2">Stories Coming Soon</p>
              <p className="text-sm text-[#6B5444]">We&apos;re working on our first posts. Check back soon!</p>
            </div>
            </ScrollReveal>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 120}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="rounded-3xl overflow-hidden border border-[#F0E4D4] hover:border-[#E85A00]/40 hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-white">
                    {post.image ? (
                      <div className="relative h-52 overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-52 bg-[#FFF3E8] flex items-center justify-center text-5xl flex-shrink-0">
                        🦧
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs text-[#6B5444] mb-2">
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3 className="font-black text-[#1A120A] group-hover:text-[#E85A00] transition-colors line-clamp-2 text-lg leading-snug mb-3">
                        {post.title}
                      </h3>
                      <p className="text-[#6B5444] text-sm leading-relaxed line-clamp-3 flex-1">
                        {excerpt(post.content)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[#E85A00] font-bold text-xs">
                        Read more
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════
          DONATE CTA
      ════════════════════════════════════ */}
      <section id="donate" className="relative py-32 md:py-40 bg-[#0C0804] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586778538929-ee34a8e9d8e7?auto=format&fit=crop&w=1920&q=80"
            alt="Mother orangutan with her baby"
            fill
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0804]/85 via-[#0C0804]/60 to-[#0C0804]/30" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Support Our Work
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Every Donation<br />
            <span className="text-gradient">Saves a Life</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Your support directly funds orangutan rescue, forest protection, and
            conservation education across Borneo.
          </p>

          {/* Fundraising progress bar */}
          <ScrollReveal>
          <div className="max-w-sm mx-auto mb-14">
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span>Rp 42.800.000 raised</span>
              <span>Goal: Rp 50.000.000</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E85A00] to-[#F4A030] rounded-full transition-all duration-1000"
                style={{ width: "85.6%" }}
              />
            </div>
            <p className="text-white/30 text-xs mt-2 text-center">85% of monthly goal · 234 donors</p>
          </div>
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/donate"
              className="bg-[#E85A00] hover:bg-[#C44E00] text-white font-semibold text-lg px-11 py-4 rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-[#E85A00]/25"
            >
              Donate Now
            </Link>
            <a
              href="#contact"
              className="border border-white/20 hover:border-white/50 text-white font-semibold text-lg px-11 py-4 rounded-full transition-all duration-300"
            >
              Get Involved
            </a>
          </div>

          {/* Impact cards */}
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { amount: "Rp 100.000", impact: "Feeds a rescued orangutan for 1 week" },
              { amount: "Rp 500.000", impact: "Plants 20 trees in degraded forest" },
              { amount: "Rp 1.000.000", impact: "Funds 1 month of field research" },
            ].map((item, i) => (
              <ScrollReveal key={item.amount} delay={i * 120}>
              <div
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-[#E85A00]/40 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <p className="text-2xl font-black text-[#E85A00] mb-1">{item.amount}</p>
                <p className="text-white/45 text-sm">{item.impact}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTACT
      ════════════════════════════════════ */}
      <ContactSection />
    </>
  );
}

