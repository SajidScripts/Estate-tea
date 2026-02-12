export default function FAQPage() {
    return (
        <main className="pt-32 min-h-screen bg-brand-green text-white container mx-auto px-6">
            <h1 className="text-4xl font-serif text-brand-gold mb-12">Frequently Asked Questions</h1>
            <div className="space-y-8 max-w-3xl">
                {[
                    { q: "How should I store my tea?", a: "Store your tea in a cool, dry place, away from light, moisture, and strong odors. Air-tight containers are best." },
                    { q: "Is your packaging sustainable?", a: "Yes, we use biodegradable materials for our tea bags and recyclable tins for loose leaf tea." },
                    { q: "Do you offer wholesale?", a: "Yes, we partner with select cafes and retailers. Please contact us for more information." }
                ].map((item, i) => (
                    <div key={i} className="border-b border-white/10 pb-6">
                        <h3 className="text-xl font-serif text-white mb-2">{item.q}</h3>
                        <p className="text-white/70 font-sans">{item.a}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
