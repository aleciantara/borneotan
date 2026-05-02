"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  async function togglePublished(post: Post) {
    await fetch(`/api/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-green-800 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Title</th>
                <th className="text-left p-4 font-medium text-gray-600">Slug</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Date</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{post.title}</td>
                  <td className="p-4 text-gray-500">{post.slug}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublished(post)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-green-700 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
