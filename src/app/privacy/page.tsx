export default function PrivacyPage() {
    return (
        <main className="pt-32 min-h-screen bg-brand-green text-white container mx-auto px-6">
            <h1 className="text-3xl font-serif text-brand-gold mb-6">Privacy Policy</h1>
            <div className="font-sans text-white/70 space-y-4 max-w-4xl">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    At ESTATE Tea, we respect your privacy and are committed to protecting your personal data.
                    This policy outlines how we collect, use, and safeguard your information when you visit our website.
                </p>
                <p>
                    [Full legal text would go here...]
                </p>
            </div>
        </main>
    );
}
