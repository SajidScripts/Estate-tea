"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, CreditCard, Loader2, QrCode } from "lucide-react";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card'); // New state

    // Form State
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearCart();
        router.push("/success");
    };

    if (cartItems.length === 0) {
        // Redirect or show empty state if accessed directly
        return (
            <main className="pt-32 min-h-screen bg-brand-green text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-serif mb-4">Your cart is empty</h1>
                    <button onClick={() => router.push('/shop')} className="text-brand-gold underline">Return to Shop</button>
                </div>
            </main>
        )
    }

    return (
        <main className="pt-24 pb-16 md:pb-24 min-h-screen bg-brand-green text-white">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-serif text-brand-gold mb-8">Checkout</h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-serif text-white/80 border-b border-white/10 pb-2">Contact</h2>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                />
                            </section>

                            {/* Shipping */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-serif text-white/80 border-b border-white/10 pb-2">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} className="input-field" />
                                    <input required type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} className="input-field" />
                                </div>
                                <input required type="text" name="address" placeholder="Address" onChange={handleInputChange} className="input-field w-full" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" name="city" placeholder="City" onChange={handleInputChange} className="input-field" />
                                    <input required type="text" name="zip" placeholder="ZIP / Postal Code" onChange={handleInputChange} className="input-field" />
                                </div>
                                <input required type="text" name="country" placeholder="Country" onChange={handleInputChange} className="input-field w-full" />
                            </section>

                            {/* Payment (Simulated) */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-serif text-white/80 border-b border-white/10 pb-2">Payment</h2>

                                {/* Payment Method Toggle */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded border transition-colors ${paymentMethod === 'card'
                                            ? 'bg-brand-gold text-brand-green border-brand-gold font-bold'
                                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <CreditCard size={18} /> Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded border transition-colors ${paymentMethod === 'upi'
                                            ? 'bg-brand-gold text-brand-green border-brand-gold font-bold'
                                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <QrCode size={18} /> UPI
                                    </button>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="bg-white/5 p-4 rounded border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex items-center gap-2 text-brand-gold mb-2">
                                            <CreditCard size={20} />
                                            <span className="text-sm font-sans">Secure Simulation</span>
                                        </div>
                                        <input required type="text" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} className="input-field w-full" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="text" name="expiry" placeholder="MM / YY" onChange={handleInputChange} className="input-field" />
                                            <input required type="text" name="cvc" placeholder="CVC" onChange={handleInputChange} className="input-field" />
                                        </div>
                                        <input required type="text" name="cardName" placeholder="Name on Card" onChange={handleInputChange} className="input-field w-full" />
                                    </div>
                                ) : (
                                    <div className="bg-white/5 p-8 rounded border border-white/10 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-white/80 mb-6 font-sans">Scan QR using any UPI App</p>
                                        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                                            {/* Synthesized QR Code Placeholder */}
                                            <div className="w-48 h-48 bg-gray-900 pattern-dots relative flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                    <QrCode size={32} className="text-white" />
                                                </div>
                                                {/* Corner markers for "QR" look */}
                                                <div className="absolute top-2 left-2 w-8 h-8 border-4 border-white"></div>
                                                <div className="absolute top-2 right-2 w-8 h-8 border-4 border-white"></div>
                                                <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-white"></div>
                                            </div>
                                        </div>
                                        <p className="text-white/60 text-sm font-sans">
                                            Google Pay, PhonePe, Paytm, or BHIM
                                        </p>
                                        <div className="mt-6 w-full">
                                            <label className="text-left text-white/60 text-xs block mb-2">UPI ID (Optional)</label>
                                            <input type="text" placeholder="username@upi" className="input-field w-full" />
                                        </div>
                                    </div>
                                )}
                            </section>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-brand-gold text-brand-green font-bold py-4 rounded hover:bg-white transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    "Place Order"
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Column: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:pl-12"
                    >
                        <div className="bg-white/5 p-6 md:p-8 rounded-lg border border-white/10 lg:sticky lg:top-32">
                            <h2 className="text-xl md:text-2xl font-serif text-brand-gold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start gap-4">
                                        <div className="flex gap-3 md:gap-4 flex-1 min-w-0">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded flex items-center justify-center text-brand-gold font-serif flex-shrink-0">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-serif text-white text-sm md:text-base truncate">{item.name}</p>
                                                <p className="text-xs md:text-sm text-white/60">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-sans font-medium text-sm md:text-base flex-shrink-0">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-white/60">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                                <span className="text-xl font-serif">Total</span>
                                <span className="text-2xl font-bold text-brand-gold">₹{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .input-field {
                    @apply w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors;
                }
            `}</style>
        </main>
    );
}
