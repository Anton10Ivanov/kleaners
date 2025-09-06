import { cn } from "@/lib/utils";
import React from "react";

interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
  padding?: boolean | "sm" | "md" | "lg" | "xl";
  breakout?: boolean;
  centered?: boolean;
}

/**
 * Unified container component that eliminates spacing conflicts
 * Mobile-first responsive design with consistent padding
 */
export const UnifiedContainer = React.forwardRef<HTMLDivElement, UnifiedContainerProps>(
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
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          "w-full",
          // Centering
          centered && "mx-auto",
          // Size constraints (skip if breakout)
          !breakout && sizeClasses[size],
          // Responsive padding
          getPaddingClasses(),
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