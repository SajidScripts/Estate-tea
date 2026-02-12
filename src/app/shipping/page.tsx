export default function ShippingPage() {
    return (
        <main className="pt-32 min-h-screen bg-brand-green text-white container mx-auto px-6">
            <h1 className="text-4xl font-serif text-brand-gold mb-8">Shipping & Returns</h1>
            <div className="space-y-8 font-sans text-white/80 max-w-3xl">
                <section>
                    <h2 className="text-2xl text-white mb-4">Shipping Policy</h2>
                    <p>
                        We ship worldwide. Orders are processed within 1-2 business days.
                        Complimentary shipping on orders over ₹2000.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl text-white mb-4">Returns</h2>
                    <p>
                        If you are not completely satisfied with your purchase, please contact us within 14 days of receipt for a full refund or exchange.
                    </p>
                </section>
            </div>
        </main>
    );
}
