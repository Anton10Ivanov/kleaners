import { cn } from "@/lib/utils";
import React from "react";

interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
  padding?: boolean;
}

/**
 * Unified container component that eliminates spacing conflicts
 * Mobile-first responsive design with consistent padding
 */
export const UnifiedContainer = React.forwardRef<HTMLDivElement, UnifiedContainerProps>(
  ({ className, children, size = "xl", padding = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl", 
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-[1400px]",
      "ultra-wide": "max-w-[1600px]",
      full: "max-w-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          "mx-auto w-full",
          // Size constraint
          sizeClasses[size],
          // Enhanced responsive padding - mobile first
          padding && [
            "px-4", // 16px on mobile
            "sm:px-6", // 24px on tablet
            "lg:px-8", // 32px on desktop
            "xl:px-12", // 48px on large desktop
            "2xl:px-16", // 64px on ultra-wide
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

UnifiedContainer.displayName = "UnifiedContainer";