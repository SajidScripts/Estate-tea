import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="pt-24 min-h-screen bg-brand-green text-white">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl md:text-7xl font-serif text-brand-gold mb-12 text-center">Our Heritage</h1>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed">
                        <p>
                            Founded in 1924, ESTATE Tea began as a small family-owned plantation in the misty highlands of Darjeeling.
                            For over a century, we have remained true to our founding principle: to produce the purest, most exquisite tea
                            without compromise.
                        </p>
                        <p>
                            Our estates are located at an altitude of 6,000 feet, where the cool air and rich soil create the perfect
                            conditions for the Camellia sinensis plant to thrive. Every leaf is hand-plucked by our skilled artisans,
                            ensuring that only the finest two leaves and a bud make it into your cup.
                        </p>
                    </div>
                    <div>
                        <div className="relative h-96 rounded-lg overflow-hidden group mb-4">
                            <Image
                                src="/images/heritage.jpg"
                                alt="Original Estate, 1924"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <p className="text-brand-gold italic font-serif text-sm text-right">Original Estate, 1924</p>
                    </div>
                </div>

                <h2 className="text-4xl font-serif text-center mb-16">The Art of Processing</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Plucking", desc: "Selective hand-harvesting at dawn." },
                        { title: "Withering", desc: "Gentle moisture reduction on bamboo racks." },
                        { title: "Rolling", desc: "Twisting the leaves to release essential oils." },
                    ].map((step, i) => (
                        <div key={i} className="bg-white/5 p-8 border border-white/10 hover:border-brand-gold transition-colors">
                            <h3 className="text-2xl font-serif text-brand-gold mb-4">{step.title}</h3>
                            <p className="text-white/70 font-sans">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
