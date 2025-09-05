import { cn } from "@/lib/utils";
import React from "react";

interface ModernContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "ultra-wide" | "content-grid";
  padding?: boolean | "sm" | "md" | "lg" | "xl";
  breakout?: boolean;
  centered?: boolean;
}

/**
 * Modern container component for 2024+ web design
 * Supports ultra-wide displays and content-aware sizing
 */
export const ModernContainer = React.forwardRef<HTMLDivElement, ModernContainerProps>(
  ({ className, children, size = "xl", padding = true, breakout = false, centered = true, ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-3xl",
      lg: "max-w-5xl", 
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
      "ultra-wide": "max-w-[1600px]",
      full: "max-w-none",
      "content-grid": "max-w-[1400px] 2xl:max-w-[1600px]",
    };

    const getPaddingClasses = () => {
      if (typeof padding === "boolean") {
        return padding ? [
          "px-4", // Mobile: 16px
          "sm:px-6", // Tablet: 24px
          "lg:px-8", // Desktop: 32px
          "xl:px-12", // Large: 48px
          "2xl:px-16", // Ultra-wide: 64px
        ] : [];
      }
      
      const paddingMap = {
        sm: "px-4 sm:px-6",
        md: "px-4 sm:px-6 lg:px-8", 
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
      };
      
      return paddingMap[padding];
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          centered && "mx-auto",
          !breakout && sizeClasses[size],
          breakout && "container-breakout",
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

ModernContainer.displayName = "ModernContainer";