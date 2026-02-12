"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

import { products } from "@/data/products";

export default function ShopPage() {
    const { addToCart } = useCart();

    return (
        <main className="pt-24 min-h-screen bg-brand-green text-white">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl md:text-7xl font-serif text-brand-gold mb-8 text-center">The Collection</h1>
                <p className="text-center text-white/60 font-sans max-w-2xl mx-auto mb-16">
                    Small-batch teas, curated for the discerning palate.
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="bg-white/5 h-80 w-full mb-6 flex items-center justify-center relative overflow-hidden">
                                <span className="text-white/20 font-serif text-4xl group-hover:scale-110 transition-transform duration-500">
                                    {product.name.split(" ")[0]}
                                </span>
                                <div className="absolute top-4 right-4 bg-brand-gold text-brand-green text-xs font-bold px-3 py-1 uppercase tracking-widest">
                                    {product.tag}
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-white/60 font-sans text-sm mt-2">{product.desc}</p>
                                </div>
                                <span className="text-brand-gold font-sans font-medium text-lg">{product.formattedPrice}</span>
                            </div>
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price
                                })}
                                className="w-full mt-6 border border-white/20 text-white py-3 hover:bg-brand-gold hover:text-brand-green hover:border-brand-gold transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
