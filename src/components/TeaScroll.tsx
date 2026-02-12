"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 120;
const MOBILE_FRAME_COUNT = 60; // Use fewer frames on mobile

// Detect mobile device
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
};

export default function TeaScroll({
    setLoadingProgress,
}: {
    setLoadingProgress: (val: number) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mobile, setMobile] = useState(false);
    const { scrollYProgress } = useScroll();
    const lastFrameRef = useRef(-1);

    // Detect mobile on mount
    useEffect(() => {
        setMobile(isMobile());
    }, []);

    // Load Images with optimized count for mobile
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];
        const totalFrames = mobile ? MOBILE_FRAME_COUNT : FRAME_COUNT;
        const frameStep = mobile ? 2 : 1; // Skip every other frame on mobile

        for (let i = 1; i <= FRAME_COUNT; i += frameStep) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [setLoadingProgress, mobile]);

    // Render Frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        // Clear and Draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Image - Object Fit: Cover (Robust)
        const img = images[index];

        // Calculate scale to ensure image covers entire canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);

        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial Draw
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded]);

    // Scroll Listener with throttling for mobile
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;

        const totalFrames = images.length;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        // Skip rendering if frame hasn't changed (performance optimization)
        if (frameIndex === lastFrameRef.current) return;
        lastFrameRef.current = frameIndex;

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize with mobile optimization
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const currentMobile = isMobile();

                // Reduce DPR on mobile to save GPU memory and processing
                const dpr = currentMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Use lower quality smoothing on mobile
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = currentMobile ? "low" : "high";
                }

                // Re-render current frame
                if (isLoaded && lastFrameRef.current >= 0) {
                    renderFrame(lastFrameRef.current);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images]);

    return (
        <div className="h-[600vh] w-full relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{
                        willChange: 'auto', // Disable will-change on mobile for better performance
                    }}
                />
            </div>
        </div>
    );
}
