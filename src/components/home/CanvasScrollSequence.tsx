"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const FRAME_COUNT = 150;

export function CanvasScrollSequence({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Bind the scroll progress STRICTLY to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Remove loading screen immediately after the first 5 frames are loaded
        if (loadedCount === 5) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    if (!images[index] || !canvasRef.current || !isLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    
    // Calculate aspect ratio to cover canvas without distortion
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark background behind canvas in case of edge bleed
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded && canvasRef.current) {
      // Set actual canvas resolution to match window strictly once loaded
      const resizeCanvas = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          renderFrame(0);
        }
      };
      
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Sync scroll to frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    
    // Map progress 0-1 to frame 0-149
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    
    // Fallback: If hitting a frame that hasn't loaded yet, it just skips drawing
    // until it is loaded, ensuring smooth failure without breaking the loop
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-background">
      
      {/* Sticky wrapper pinning the canvas and text for the entire 400vh scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Loading overlay - only lasts for 5 frames now */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </div>
        )}

        {/* 4K Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover mix-blend-screen opacity-90 contrast-125 saturate-150 brightness-110 absolute inset-0 z-0"
        />
        
        {/* Gradients to seamlessly blend frames into black background */}
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] z-10 pointer-events-none opacity-80" />
        
        {/* Child content (Hero text) overlay */}
        <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center pointer-events-none">
          <div className="pointer-events-auto w-full">
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}
