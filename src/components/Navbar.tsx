"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Our Story", href: "/about" },
        { name: "Shop", href: "/shop" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? "bg-brand-green/90 backdrop-blur-md py-4 shadow-lg"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center bg-transparent">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-serif text-brand-gold tracking-widest bg-transparent">
                        ESTATE
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8 bg-transparent">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-sans text-white/80 hover:text-brand-gold transition-colors tracking-wide bg-transparent"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6 bg-transparent">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white/80 hover:text-brand-gold transition-colors bg-transparent"
                        >
                            <Search size={20} />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-white/80 hover:text-brand-gold transition-colors bg-transparent relative"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-green text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white bg-transparent"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-brand-green pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center bg-transparent">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-serif text-white hover:text-brand-gold bg-transparent"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex justify-center space-x-8 mt-8 bg-transparent">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsSearchOpen(true);
                                    }}
                                    className="text-white/80 hover:text-brand-gold bg-transparent"
                                >
                                    <Search size={24} />
                                </button>
                                <button className="text-white/80 hover:text-brand-gold bg-transparent">
                                    <ShoppingBag size={24} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
