import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-green text-white border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 bg-transparent">
                        <h3 className="text-2xl font-serif text-brand-gold mb-6 tracking-widest bg-transparent">ESTATE</h3>
                        <p className="text-white/60 font-sans text-sm leading-relaxed bg-transparent">
                            Cultivating the finest tea leaves since 1924. A legacy of purity, tradition, and exquisite flavor in every cup.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="bg-transparent">
                        <h4 className="text-lg font-serif text-white mb-6 bg-transparent">Explore</h4>
                        <ul className="space-y-4 bg-transparent">
                            <li><Link href="/shop" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">Shop Collection</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">Our Heritage</Link></li>
                            <li><Link href="/journal" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">Tea Journal</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="bg-transparent">
                        <h4 className="text-lg font-serif text-white mb-6 bg-transparent">Support</h4>
                        <ul className="space-y-4 bg-transparent">
                            <li><Link href="/contact" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="text-white/60 hover:text-brand-gold transition-colors text-sm bg-transparent">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="bg-transparent">
                        <h4 className="text-lg font-serif text-white mb-6 bg-transparent">Stay Connected</h4>
                        <div className="flex bg-transparent">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/20 text-white px-4 py-2 w-full focus:outline-none focus:border-brand-gold font-sans text-sm"
                            />
                            <button className="bg-brand-gold text-brand-green px-4 py-2 font-sans font-medium hover:bg-white transition-colors">
                                Join
                            </button>
                        </div>
                        <div className="flex space-x-4 mt-6 bg-transparent">
                            <Instagram className="text-white/60 hover:text-brand-gold cursor-pointer" size={20} />
                            <Facebook className="text-white/60 hover:text-brand-gold cursor-pointer" size={20} />
                            <Twitter className="text-white/60 hover:text-brand-gold cursor-pointer" size={20} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-transparent">
                    <p className="text-white/40 text-xs font-sans bg-transparent">
                        © 2024 ESTATE Tea. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 bg-transparent">
                        <Link href="/privacy" className="text-white/40 hover:text-white text-xs bg-transparent">Privacy Policy</Link>
                        <Link href="/terms" className="text-white/40 hover:text-white text-xs bg-transparent">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
