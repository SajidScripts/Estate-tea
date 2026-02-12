"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Filter products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.desc.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-brand-green/95 backdrop-blur-md flex flex-col pt-32 px-6"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="container mx-auto max-w-4xl">
                        {/* Search Input */}
                        <div className="relative border-b-2 border-white/20 focus-within:border-brand-gold transition-colors mb-12">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40" size={32} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for teas..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent text-4xl md:text-6xl font-serif text-white placeholder-white/20 py-6 pl-16 focus:outline-none"
                            />
                        </div>

                        {/* Results */}
                        <div className="grid md:grid-cols-2 gap-8 overflow-y-auto max-h-[60vh] pb-12">
                            {query && filteredProducts.length === 0 ? (
                                <p className="text-white/40 text-xl font-sans">No results found for "{query}".</p>
                            ) : (
                                filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href="/shop" // Linking to shop for now
                                        onClick={onClose}
                                        className="group flex gap-6 items-start p-4 hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <div className="w-20 h-20 bg-white/10 rounded flex items-center justify-center text-brand-gold font-serif text-2xl flex-shrink-0">
                                            {product.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-white/60 text-sm mt-1 mb-2 line-clamp-2">{product.desc}</p>
                                            <span className="text-brand-gold font-sans font-bold flex items-center gap-2 text-sm">
                                                View Product <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
