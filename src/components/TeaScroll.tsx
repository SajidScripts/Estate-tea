"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 120;
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export default function TeaScroll({
    setLoadingProgress,
}: {
    setLoadingProgress: (val: number) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Load Images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Adjust path format as needed (e.g., /sequence/ezgif-frame-001.jpg)
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [setLoadingProgress]);

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

    // Scroll Listener
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set actual canvas size to window size for sharp rendering
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Use high quality image smoothing
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    return (
        <div className="h-[600vh] w-full relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                // Style width/height handled by CSS, attributes for resolution
                />
            </div>
        </div>
    );
}
