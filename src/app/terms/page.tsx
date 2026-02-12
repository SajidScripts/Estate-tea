export default function TermsPage() {
    return (
        <main className="pt-32 min-h-screen bg-brand-green text-white container mx-auto px-6">
            <h1 className="text-3xl font-serif text-brand-gold mb-6">Terms of Service</h1>
            <div className="font-sans text-white/70 space-y-4 max-w-4xl">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    Welcome to ESTATE Tea. By accessing this website, you agree to comply with and be bound by the following terms and conditions.
                </p>
                <p>
                    [Full legal text would go here...]
                </p>
            </div>
        </main>
    );
}
