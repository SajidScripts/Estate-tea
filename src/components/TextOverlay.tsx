"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function TextOverlay() {
    const { scrollYProgress } = useScroll();

    // Opacity Transforms - Adjusted for strict separation and no overlap
    // Total scroll is 600vh. 0.1 = 60vh.
    // State for strict visibility control (forces unmounting)
    // Initialize to 1 so the first section is visible immediately on load
    const [currentSection, setCurrentSection] = useState(1);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.10) {
            setCurrentSection(1);
        } else if (latest > 0.20 && latest < 0.50) {
            setCurrentSection(2);
        } else if (latest > 0.60 && latest < 0.80) { // Section 3 ends earlier
            setCurrentSection(3);
        } else if (latest > 0.85 && latest < 0.99) { // Section 4 starts earlier
            setCurrentSection(4);
        } else {
            setCurrentSection(0); // Gap or End (Footer)
        }
    });

    // Opacity Transforms for smooth fade in/out within the active window
    const opacity1 = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.20, 0.30, 0.40, 0.50], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.60, 0.65, 0.75, 0.80], [0, 1, 1, 0]); // Fade out faster
    const opacity4 = useTransform(scrollYProgress, [0.85, 0.90, 0.98, 1], [0, 1, 1, 0]); // Start earlier, stay longer

    return (
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center items-center">
            {/* Section 1: Intro */}
            {currentSection === 1 && (
                <motion.div style={{ opacity: opacity1 }} className="absolute text-center max-w-4xl px-6 pointer-events-none">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl">
                        The Essence of Purity.
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-sans max-w-lg mx-auto">
                        Experience the journey of the world&apos;s finest tea, from the mist-covered estates to your cup.
                    </p>
                </motion.div>
            )}

            {/* Section 2: Harvest - Left Aligned */}
            {currentSection === 2 && (
                <motion.div style={{ opacity: opacity2 }} className="absolute top-1/2 left-10 md:left-24 -translate-y-1/2 text-left max-w-xl px-6 pointer-events-none">
                    <h2 className="text-4xl md:text-6xl font-serif text-brand-gold mb-4">
                        Two Leaves & A Bud
                    </h2>
                    <p className="text-xl text-white/80 font-sans border-l-2 border-brand-gold pl-6">
                        Hand-picked at dawn to preserve the delicate aroma and potent antioxidants. Only the youngest shoots make the cut.
                    </p>
                </motion.div>
            )}

            {/* Section 3: Process - Right Aligned */}
            {currentSection === 3 && (
                <motion.div style={{ opacity: opacity3 }} className="absolute top-1/2 right-10 md:right-24 -translate-y-1/2 text-right max-w-xl px-6 pointer-events-none">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
                        Artfully Oxidized
                    </h2>
                    <p className="text-xl text-white/80 font-sans border-r-2 border-white/50 pr-6">
                        A precise fermentation process unlocks complex notes of malt, honey, and wildflowers.
                    </p>
                </motion.div>
            )}

            {/* Section 4: CTA */}
            {currentSection === 4 && (
                <motion.div style={{ opacity: opacity4 }} className="absolute text-center pointer-events-auto">
                    <h2 className="text-5xl md:text-8xl font-serif text-brand-gold mb-8">
                        The Perfect Brew.
                    </h2>
                    <Link
                        href="/shop"
                        className="pointer-events-auto bg-white/10 backdrop-blur-md border border-brand-gold text-brand-gold px-10 py-4 text-xl font-sans uppercase tracking-widest hover:bg-brand-gold hover:text-brand-green transition-all duration-300 inline-block"
                    >
                        Order Experience
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
