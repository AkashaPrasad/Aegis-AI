import { ReactNode } from "react";
import clsx from "clsx";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function PremiumCard({ children, className, glowOnHover = true }: PremiumCardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl border border-border bg-surface-elevated overflow-hidden group transition-all duration-300",
        glowOnHover && "hover:border-primary/50 hover:bg-surface-elevated/80",
        className
      )}
    >
      {/* Subtle top inner glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      
      {/* Background glow on hover */}
      {glowOnHover && (
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
      )}
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
