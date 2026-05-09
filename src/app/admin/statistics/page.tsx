"use client";

import { useEffect, useState } from "react";

type Stat = { id: string; label: string; value: string };

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ label: "", value: "" });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ label: "", value: "" });

  async function fetchStats() {
    const res = await fetch("/api/stats");
    const data = await res.json();
    setStats(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchStats();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newStat = await res.json();
      setStats((prev) => [...prev, newStat]);
      setForm({ label: "", value: "" });
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this statistic?")) return;
    await fetch(`/api/stats/${id}`, { method: "DELETE" });
    setStats((prev) => prev.filter((s) => s.id !== id));
  }

  function startEdit(stat: Stat) {
    setEditId(stat.id);
    setEditForm({ label: stat.label, value: stat.value });
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (editId === null) return;
    await fetch(`/api/stats/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setStats((prev) =>
      prev.map((s) => (s.id === editId ? { ...s, ...editForm } : s))
    );
    setEditId(null);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Statistics</h1>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          required
          placeholder="Label (e.g. Orangutans Remaining)"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <input
          type="text"
          required
          placeholder="Value (e.g. ~104,700)"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="w-44 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-green-800 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-60 whitespace-nowrap"
        >
          + Add
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : stats.length === 0 ? (
        <p className="text-gray-400">No statistics yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Label</th>
                <th className="text-left p-4 font-medium text-gray-600">Value</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.id} className="border-b last:border-0 hover:bg-gray-50">
                  {editId === stat.id ? (
                    <td colSpan={2} className="p-4">
                      <form onSubmit={handleEdit} className="flex gap-3">
                        <input
                          type="text"
                          required
                          value={editForm.label}
                          onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                          className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          required
                          value={editForm.value}
                          onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                          className="w-36 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button type="submit" className="text-green-700 hover:underline text-sm">Save</button>
                        <button type="button" onClick={() => setEditId(null)} className="text-gray-400 hover:underline text-sm">Cancel</button>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="p-4 text-gray-800">{stat.label}</td>
                      <td className="p-4 font-bold text-orange-500">{stat.value}</td>
                    </>
                  )}
                  {editId !== stat.id && (
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => startEdit(stat)} className="text-green-700 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(stat.id)} className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
