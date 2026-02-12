"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
    return (
        <main className="pt-24 min-h-screen bg-brand-green text-white flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-lg px-6"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
                        <CheckCircle size={48} />
                    </div>
                </div>

                <h1 className="text-5xl font-serif text-brand-gold mb-6">Thank You!</h1>
                <p className="text-xl text-white/80 font-sans mb-8">
                    Your order has been placed successfully. A confirmation email is on its way to you.
                </p>

                <div className="bg-white/5 border border-white/10 rounded p-6 mb-12">
                    <p className="text-white/60 text-sm mb-2 uppercase tracking-wide">Order Reference</p>
                    <p className="text-2xl font-mono text-white">#EST-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>

                <Link
                    href="/shop"
                    className="inline-block bg-brand-gold text-brand-green font-bold px-8 py-4 rounded hover:bg-white transition-colors uppercase tracking-widest"
                >
                    Continue Shopping
                </Link>
            </motion.div>
        </main>
    );
}
