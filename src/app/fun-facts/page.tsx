const facts = [
  {
    emoji: "🧠",
    title: "Highly Intelligent",
    body: "Orangutans are among the most intelligent primates. They use tools, solve complex puzzles, and can learn sign language.",
  },
  {
    emoji: "🌿",
    title: "Forest Architects",
    body: 'Known as the "gardeners of the forest," orangutans disperse seeds across wide areas, helping regenerate rainforests.',
  },
  {
    emoji: "👶",
    title: "Long Childhood",
    body: "Orangutans have the longest childhood of any non-human primate — they stay with their mothers for up to 8 years.",
  },
  {
    emoji: "🛌",
    title: "Nest Builders",
    body: "Every night, orangutans construct a new sleeping nest from branches and leaves high up in the forest canopy.",
  },
  {
    emoji: "🌳",
    title: "Solitary by Nature",
    body: "Unlike most great apes, orangutans are semi-solitary and spend the majority of their lives in the treetops.",
  },
  {
    emoji: "🍌",
    title: "Fruit Lovers",
    body: "Fruit makes up around 60% of their diet. They also eat insects, bark, flowers, and small vertebrates.",
  },
  {
    emoji: "🧬",
    title: "97% Human DNA",
    body: "Orangutans share approximately 97% of their DNA with humans, making them one of our closest living relatives.",
  },
  {
    emoji: "📣",
    title: "Long Call",
    body: "Male orangutans produce a haunting 'long call' that can travel up to 1 km through the forest to attract females.",
  },
];

export default function FunFactsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-orange-900 mb-4 text-center">Fun Facts</h1>
      <p className="text-center text-gray-500 mb-12">
        Discover fascinating things about Bornean orangutans.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {facts.map((f) => (
          <div key={f.title} className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-300 transition-all">
            <div className="text-4xl mb-3">{f.emoji}</div>
            <h2 className="text-xl font-semibold text-orange-800 mb-2">{f.title}</h2>
            <p className="text-gray-600">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
