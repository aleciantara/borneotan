import { countBlogs, countStats } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [blogCount, statCount] = await Promise.all([
    countBlogs(),
    countStats(),
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6 text-center border border-green-100">
          <p className="text-4xl font-extrabold text-green-700">{blogCount}</p>
          <p className="text-gray-500 mt-2 text-sm">Blog Posts</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center border border-orange-100">
          <p className="text-4xl font-extrabold text-orange-500">{statCount}</p>
          <p className="text-gray-500 mt-2 text-sm">Statistics</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/admin/blog" className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
          Manage Blog
        </Link>
        <Link href="/admin/statistics" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm">
          Manage Statistics
        </Link>
      </div>
    </div>
  );
}
