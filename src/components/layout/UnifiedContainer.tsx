import { cn } from "@/lib/utils";
<<<<<<< HEAD
import * as React from "react";
=======
import React from "react";
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
<<<<<<< HEAD
  padding?: boolean | "sm" | "md" | "lg" | "xl";
  breakout?: boolean;
  centered?: boolean;
=======
  padding?: boolean;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
}

/**
 * Unified container component that eliminates spacing conflicts
 * Mobile-first responsive design with consistent padding
 */
export const UnifiedContainer = React.forwardRef<HTMLDivElement, UnifiedContainerProps>(
<<<<<<< HEAD
  ({ className, children, size = "xl", padding = true, breakout = false, centered = true, ...props }, ref) => {
    // Standardized responsive container widths for consistency
    const sizeClasses = {
      sm: "max-w-2xl",      // 672px - Forms, narrow content
      md: "max-w-4xl",      // 896px - Articles, medium content  
      lg: "max-w-6xl",      // 1152px - Wide content, dashboards
      xl: "max-w-7xl",      // 1280px - Main content areas
      "2xl": "max-w-[1400px]", // 1400px - Ultra-wide content
      "ultra-wide": "max-w-[1600px]", // 1600px - Maximum width
      full: "max-w-none",   // No constraint
    };

    // Enhanced responsive padding system
    const getPaddingClasses = () => {
      if (typeof padding === "boolean") {
        return padding ? [
          "px-4",      // Mobile: 16px
          "sm:px-6",   // Small: 24px  
          "md:px-8",   // Medium: 32px
          "lg:px-10",  // Large: 40px
          "xl:px-12",  // XL: 48px
          "2xl:px-16", // 2XL: 64px
        ] : [];
      }
      
      const paddingMap = {
        sm: ["px-3", "sm:px-4", "md:px-6"],
        md: ["px-4", "sm:px-6", "md:px-8", "lg:px-10"], 
        lg: ["px-6", "sm:px-8", "md:px-10", "lg:px-12"],
        xl: ["px-8", "sm:px-10", "md:px-12", "lg:px-16"],
      };
      
      return paddingMap[padding] || [];
=======
  ({ className, children, size = "xl", padding = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl", 
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-[1400px]",
      "ultra-wide": "max-w-[1600px]",
      full: "max-w-none",
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
<<<<<<< HEAD
          "w-full",
          // Centering
          centered && "mx-auto",
          // Size constraints (skip if breakout)
          !breakout && sizeClasses[size],
          // Responsive padding
          getPaddingClasses(),
=======
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
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
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