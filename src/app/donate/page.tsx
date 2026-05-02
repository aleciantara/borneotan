export default function DonatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-orange-900 mb-6">Donate</h1>
      <p className="text-lg text-gray-600 mb-10">
        Your generosity directly supports orangutan rescue, rehabilitation, and forest protection.
        Every ringgit counts.
      </p>

      <div className="bg-orange-50 rounded-2xl p-8 mb-10 text-left border border-orange-100">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">Why Donate?</h2>
        <ul className="space-y-3 text-gray-700">
          <li>🌳 Fund reforestation programs in Borneo</li>
          <li>🦧 Support orangutan rescue and rehabilitation centres</li>
          <li>📚 Enable conservation education in local communities</li>
          <li>🔬 Fund scientific research on orangutan populations</li>
        </ul>
      </div>

      <div className="bg-orange-500 text-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Payment Coming Soon</h2>
        <p className="text-orange-100 mb-4">
          We are currently integrating a secure payment system. In the meantime, please reach out
          to us directly to make a donation.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-orange-100 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
