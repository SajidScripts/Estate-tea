"use client";

import { useState, useEffect } from "react";
import TeaScroll from "@/components/TeaScroll";
import Preloader from "@/components/Preloader";
import TextOverlay from "@/components/TextOverlay";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadingProgress === 100) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0); // Reset scroll
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

  return (
    <main className="relative bg-brand-green min-h-screen">
      {/* Preloader - Only show if not fully loaded visually */}
      <AnimatePresence>
        {!isLoaded && (
          <Preloader progress={loadingProgress} />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <TeaScroll setLoadingProgress={setLoadingProgress} />
        <TextOverlay />
      </div>

      {/* Scroll helper / indicator could go here */}
      {!isLoaded && (
        <style jsx global>{`
           body { overflow: hidden; }
         `}</style>
      )}
    </main>
  );
}
