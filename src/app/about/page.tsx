import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-orange-900 mb-6">About BorneoTan</h1>

      <section className="mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          BorneoTan is a non-profit educational initiative dedicated to raising awareness about
          the plight of Bornean orangutans and the urgent need to protect their natural habitat.
          We believe that informed communities can drive meaningful conservation outcomes.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">Mission &amp; Vision</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="font-semibold text-orange-900 text-lg mb-2">Mission</h3>
            <p className="text-gray-700">
              To educate, inspire, and mobilize people worldwide to protect Bornean orangutans
              and their rainforest home through knowledge, advocacy, and community action.
            </p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="font-semibold text-amber-900 text-lg mb-2">Vision</h3>
            <p className="text-gray-700">
              A world where Bornean orangutans thrive in healthy, intact rainforests, and where
              human communities coexist sustainably with nature.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-orange-800 mb-6">About Bornean Orangutans</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Bornean orangutan (<em>Pongo pygmaeus</em>) is one of the most intelligent primates
              on Earth. They share approximately 97% of their DNA with humans and are known for their
              remarkable problem-solving abilities, tool use, and complex social learning.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Found only on the island of Borneo, these great apes play a crucial ecological role as
              &quot;gardeners of the forest&quot; &mdash; dispersing seeds across vast areas and maintaining
              the biodiversity of tropical rainforests.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Sadly, the Bornean orangutan is classified as <strong className="text-red-600">Critically Endangered</strong> by
              the IUCN, with populations having declined by more than 50% over the past 60 years due
              to deforestation, habitat loss, and the illegal wildlife trade.
            </p>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1699709823274-f3cb659b640b?auto=format&fit=crop&w=800&q=80"
              alt="Close-up portrait of a Bornean orangutan"
              fill
              className="object-cover"
            />
            <p className="absolute bottom-2 right-3 text-xs text-white/70">Photo: Sies Kranen / Unsplash</p>
          </div>
        </div>
      </section>
    </div>
  );
}
