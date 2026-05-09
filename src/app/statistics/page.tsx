import { listStats } from "@/lib/db";

export const revalidate = 3600;

export default async function StatisticsPage() {
  const stats = await listStats();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-orange-900 mb-4 text-center">Statistics</h1>
      <p className="text-center text-gray-500 mb-12">
        Key numbers that tell the story of Bornean orangutan conservation.
      </p>
      {stats.length === 0 ? (
        <p className="text-center text-gray-400">No statistics available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl shadow-sm p-8 text-center border border-orange-100 hover:border-orange-300 transition-colors">
              <p className="text-4xl font-extrabold text-orange-500 mb-2">{s.value}</p>
              <p className="text-gray-600 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
