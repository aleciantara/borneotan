import Link from "next/link";
import Image from "next/image";
import { listPublishedBlogs } from "@/lib/db";

export const revalidate = 3600;

function excerpt(content: string, maxLen = 140) {
  const plain = content.replace(/#{1,6}\s+/g, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + "…" : plain;
}

export default async function BlogPage() {
  const posts = await listPublishedBlogs();

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ── Hero header ── */}
      <div className="bg-[#0C0804] pt-20 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative">
          <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Conservation Stories
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            The BorneoTan Blog
          </h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Deep dives into orangutan conservation, Borneo's rainforest, and the
            science behind our work.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-5xl mb-4">🦧</p>
            <p className="text-xl font-black text-[#1A120A] mb-2">Stories Coming Soon</p>
            <p className="text-sm text-[#6B5444]">We&apos;re working on our first posts. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* ── Featured post ── */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-16">
                <article className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#F0E4D4] hover:border-[#E85A00]/40 hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FFF3E8] flex items-center justify-center text-6xl">🦧</div>
                    )}
                    <span className="absolute top-4 left-4 bg-[#E85A00] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-10 bg-white">
                    <p className="text-xs text-[#6B5444] mb-3">
                      {new Date(featured.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#1A120A] group-hover:text-[#E85A00] transition-colors leading-tight mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-[#6B5444] text-sm leading-relaxed mb-6">
                      {excerpt(featured.content, 200)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#E85A00] font-bold text-sm">
                      Read article
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            )}

            {/* ── Rest of posts ── */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <article className="rounded-3xl overflow-hidden border border-[#F0E4D4] hover:border-[#E85A00]/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
                      <div className="relative h-52 overflow-hidden flex-shrink-0">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#FFF3E8] flex items-center justify-center text-5xl">🦧</div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs text-[#6B5444] mb-2">
                          {new Date(post.createdAt).toLocaleDateString("id-ID", {
                            year: "numeric", month: "long", day: "numeric",
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
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
