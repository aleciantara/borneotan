"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-green-700">🦧 Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            Dashboard
          </Link>
          <Link href="/admin/blog" className="block px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            Blog Posts
          </Link>
          <Link href="/admin/statistics" className="block px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            Statistics
          </Link>
        </nav>
        <div className="p-4 border-t border-green-700">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-left text-sm text-green-300 hover:text-white transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        {children}
      </div>
    </div>
  );
}
