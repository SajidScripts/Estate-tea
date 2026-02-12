"use client";

import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const router = useRouter();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-brand-green border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-2xl font-serif text-brand-gold flex items-center gap-2">
                                <ShoppingBag size={24} />
                                Your Collection
                            </h2>
                            <button onClick={toggleCart} className="text-white/60 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                                    <ShoppingBag size={48} />
                                    <p className="font-sans text-lg">Your bag is empty.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-brand-gold hover:underline font-sans"
                                    >
                                        Return to Shop
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                                        {/* Image Placeholder */}
                                        <div className="w-20 h-20 bg-white/10 rounded-md flex-shrink-0 flex items-center justify-center text-brand-gold font-serif text-xl">
                                            {item.name.charAt(0)}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-serif text-white text-lg leading-tight">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/40 hover:text-red-400 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end mt-2">
                                                <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-white/60 hover:text-white"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-sans text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-white/60 hover:text-white"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-sans font-medium text-brand-gold">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-white/5 space-y-4">
                                <div className="flex justify-between items-center text-lg font-sans">
                                    <span className="text-white/60">Subtotal</span>
                                    <span className="text-brand-gold font-bold text-xl">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        toggleCart();
                                        window.location.href = '/checkout'; // Using window location to ensure full navigation or router push
                                    }}
                                    className="w-full bg-brand-gold text-brand-green font-sans font-bold py-4 text-lg hover:bg-white transition-colors uppercase tracking-widest"
                                >
                                    Checkout
                                </button>
                                <p className="text-center text-white/40 text-xs font-sans">
                                    Tax and shipping calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
