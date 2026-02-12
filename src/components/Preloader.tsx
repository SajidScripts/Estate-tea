"use client";

import { motion } from "framer-motion";

export default function Preloader({ progress }: { progress: number }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: progress === 100 ? 0 : 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ pointerEvents: progress === 100 ? "none" : "auto" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-green text-white"
        >
            <div className="mb-4 text-2xl font-serif tracking-widest text-brand-gold">
                ESTATE
            </div>
            <div className="h-1 w-64 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-brand-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-2 text-sm font-sans text-white/60">
                {progress}%
            </div>
        </motion.div>
    );
}
