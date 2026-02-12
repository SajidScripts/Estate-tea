"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    id: number;
    name: string;
    price: number; // Stored as number for calculations
    quantity: number;
    image?: string; // Optional for now
};

type CartContextType = {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: { id: number; name: string; price: string | number }) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // ... (persistence logic remains)

    const clearCart = () => setCartItems([]);

    // Persist cart to localStorage (optional, but good for UX)
    useEffect(() => {
        const savedCart = localStorage.getItem("estate_cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("estate_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: { id: number; name: string; price: string | number }) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Parse price string like "$28.00" to number 28.00
            const numericPrice = typeof product.price === 'string'
                ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
                : product.price;

            return [...prev, { ...product, price: numericPrice, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when adding item for feedback
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
