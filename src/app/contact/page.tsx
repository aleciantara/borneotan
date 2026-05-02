"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-4xl font-bold text-orange-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you.
        </p>

        <h2 className="text-xl font-semibold text-orange-800 mb-4">📍 Where to Find Us</h2>
        <div className="space-y-2 text-gray-600 mb-8">
          <p>📧 info@borneotan.org</p>
          <p>📍 Kalimantan, Indonesia</p>
        </div>

        {/* Map embed placeholder */}
        <div className="bg-orange-100 rounded-2xl h-48 flex items-center justify-center text-orange-600">
          <p className="text-sm font-medium">Map embed coming soon</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-orange-700 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <p className="text-orange-600 text-sm text-center">Message sent! We will be in touch soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
