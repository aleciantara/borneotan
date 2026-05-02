import Image from "next/image";

const threats = [
  {
    title: "Deforestation",
    icon: "🪓",
    color: "bg-red-50 border-red-200",
    headingColor: "text-red-800",
    body: `Borneo has lost more than half its forest cover in the past century. Palm oil expansion,
    logging, and agriculture have destroyed millions of hectares of critical orangutan habitat.
    Without forests, orangutans cannot survive — they depend entirely on the rainforest for food,
    shelter, and social interaction.`,
  },
  {
    title: "Habitat Loss",
    icon: "🌫️",
    color: "bg-amber-50 border-amber-200",
    headingColor: "text-amber-800",
    body: `As forests shrink, orangutans are pushed into increasingly fragmented patches of habitat.
    Isolated populations cannot maintain genetic diversity, and individuals are forced into dangerous
    proximity with human settlements, leading to conflict, injury, and death.`,
  },
  {
    title: "Illegal Wildlife Trade",
    icon: "🔒",
    color: "bg-orange-50 border-orange-200",
    headingColor: "text-orange-800",
    body: `Despite being protected by law in Indonesia, orangutans are still captured
    and sold as pets. Mothers are often killed so their infants can be taken. This trade directly
    reduces wild populations and causes enormous suffering to individual animals.`,
  },
];

export default function WhyHelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-orange-900 mb-4 text-center">Why Help Our Cause?</h1>
      <p className="text-center text-gray-500 mb-12 text-lg">
        Bornean orangutans face existential threats. Here&apos;s what&apos;s at stake.
      </p>
      <div className="space-y-8">
        {threats.map((t) => (
          <div key={t.title} className={`rounded-2xl border p-8 ${t.color}`}>
            <div className="text-4xl mb-3">{t.icon}</div>
            <h2 className={`text-2xl font-bold mb-4 ${t.headingColor}`}>{t.title}</h2>
            <p className="text-gray-700 leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 relative h-72 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1762482614898-9e826d224a2e?auto=format&fit=crop&w=1200&q=80"
          alt="Orangutan resting in a tree with green leaves"
          fill
          className="object-cover"
        />
        <p className="absolute bottom-2 right-3 text-xs text-white/70">Photo: Avigna Krish / Unsplash</p>
      </div>

      <div className="mt-16 text-center bg-orange-900 text-white rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-4">You Can Make a Difference</h2>
        <p className="text-orange-200 mb-6">
          Every donation, every share, every conversation helps turn the tide for orangutans.
        </p>
        <a
          href="/donate"
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
}
