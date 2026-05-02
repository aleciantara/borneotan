import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: `${post.title} — BorneoTan`, description: post.title };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    prisma.blog.findUnique({ where: { slug, published: true } }),
    prisma.blog.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  if (!post) notFound();

  const html = await marked(post.content, { gfm: true, breaks: true });

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ── Hero image ── */}
      {post.image && (
        <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-[#0C0804]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0804] via-transparent to-transparent" />
        </div>
      )}

      {/* ── Article ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        {/* Card that overlaps the hero */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#6B5444] hover:text-[#E85A00] text-sm font-semibold transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Stories
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#FFF3E8] text-[#E85A00] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Conservation
            </span>
            <span className="text-[#6B5444] text-sm">
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-[#1A120A] leading-tight mb-10">
            {post.title}
          </h1>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#E85A00]/40 via-[#F4A030]/20 to-transparent mb-10" />

          {/* Content */}
          <div
            className="
              [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-[#1A120A] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight
              [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-[#1A120A] [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-[#3D2B1F] [&_p]:leading-[1.9] [&_p]:mb-6 [&_p]:text-[1.05rem]
              [&_strong]:font-bold [&_strong]:text-[#1A120A]
              [&_ul]:pl-6 [&_ul]:mb-6 [&_ul>li]:list-disc [&_ul>li]:text-[#3D2B1F] [&_ul>li]:leading-[1.8] [&_ul>li]:mb-2
              [&_ol]:pl-6 [&_ol]:mb-6 [&_ol>li]:list-decimal [&_ol>li]:text-[#3D2B1F] [&_ol>li]:leading-[1.8] [&_ol>li]:mb-2
              [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#E85A00] [&_blockquote]:pl-5 [&_blockquote]:text-[#6B5444] [&_blockquote]:italic [&_blockquote]:my-6
              [&_a]:text-[#E85A00] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#C44E00]
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-black text-[#1A120A] mb-8">More Stories</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                  <article className="rounded-2xl overflow-hidden border border-[#F0E4D4] hover:border-[#E85A00]/40 hover:shadow-lg transition-all duration-300">
                    <div className="relative h-36 overflow-hidden">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FFF3E8] flex items-center justify-center text-4xl">🦧</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-black text-[#1A120A] group-hover:text-[#E85A00] transition-colors line-clamp-2 leading-snug">
                        {p.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
