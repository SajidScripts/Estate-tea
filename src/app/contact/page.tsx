import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="pt-24 min-h-screen bg-brand-green text-white">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl md:text-7xl font-serif text-brand-gold mb-16 text-center">Get in Touch</h1>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-6">Headquarters</h3>
                            <div className="flex items-start gap-4 text-white/70 font-sans">
                                <MapPin className="text-brand-gold shrink-0" />
                                <p>
                                    124 Tea Estate Road,<br />
                                    Darjeeling, West Bengal,<br />
                                    India - 734101
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-white mb-6">Inquiries</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white/70 font-sans">
                                    <Mail className="text-brand-gold shrink-0" />
                                    <p>hello@estatetea.com</p>
                                </div>
                                <div className="flex items-center gap-4 text-white/70 font-sans">
                                    <Phone className="text-brand-gold shrink-0" />
                                    <p>+91 987 654 3210</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        action="https://formsubmit.co/sajid1sayyed@gmail.com"
                        method="POST"
                        className="space-y-6"
                    >
                        {/* Honeypot for spam protection */}
                        <input type="text" name="_honey" style={{ display: "none" }} />

                        {/* Disable Captcha for cleaner UX */}
                        <input type="hidden" name="_captcha" value="false" />

                        {/* Success Page Redirection (Optional, defaults to generic success page) */}
                        <input type="hidden" name="_next" value="http://localhost:3000/success" />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-sans text-brand-gold uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-white/5 border border-white/20 p-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-sans text-brand-gold uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/20 p-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-sans text-brand-gold uppercase tracking-widest">Message</label>
                            <textarea
                                name="message"
                                rows={5}
                                required
                                className="w-full bg-white/5 border border-white/20 p-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-brand-gold text-brand-green px-8 py-4 font-sans font-bold uppercase tracking-widest hover:bg-white transition-colors w-full md:w-auto">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
