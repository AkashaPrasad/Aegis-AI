"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import clsx from "clsx";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function PremiumCard({ children, className, glowOnHover = true }: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Fast, hardware-accelerated motion values mapped outside React state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Normalize the tracking from -0.5 to 0.5 to manage rotation axes
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out coordinate tracking with physics springs
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const springMouseX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springMouseY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  // Map the X and Y coordinates to subtle pixel rotations
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Calculate mouse spot dynamic radial gradient
  const backgroundSpotlight = useMotionTemplate`radial-gradient(400px circle at ${springMouseX}px ${springMouseY}px, rgba(103, 240, 61, 0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;
    
    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
    
    // Calculate normalized -0.5 to 0.5 ratio
    x.set(currentMouseX / width - 0.5);
    y.set(currentMouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={clsx(
        "relative rounded-2xl border border-border/80 bg-surface-elevated/20 overflow-hidden group transition-colors duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.8)]",
        glowOnHover && "hover:border-primary/50",
        className
      )}
    >
      {/* Dynamic 3D Glare Background */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
          style={{ background: backgroundSpotlight }}
        />
      )}

      {/* Subtle top inner glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 z-0 pointer-events-none" />
      
      {/* Render children hoisted structurally higher in 3D scale so they "pop" off the card background */}
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full h-full flex flex-col p-8"
      >
        {children}
      </div>
    </motion.div>
  );
}
