"use client";

import { useState } from "react";

export default function ContactSection() {
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
    <section id="contact" className="bg-[#120C07] text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div>
          <p className="text-[#E85A00] text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            Let&apos;s Make a Difference{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Have questions, want to collaborate, or looking to volunteer? We&apos;d
            love to hear from you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <span className="text-xl">📧</span>
              <span>info@borneotan.org</span>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <span className="text-xl">📍</span>
              <span>Kalimantan, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85A00] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85A00] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us how you'd like to help..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85A00] transition-colors text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#E85A00] hover:bg-[#C44E00] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-green-400 text-sm text-center">
              ✓ Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
