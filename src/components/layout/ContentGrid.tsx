import { cn } from "@/lib/utils";
import React from "react";

interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "asymmetric" | "sidebar" | "feature" | "magazine" | "masonry";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  reverseOnMobile?: boolean;
}

/**
 * Advanced grid component for modern, asymmetric layouts
 * Breaks away from traditional symmetric containers
 */
export const ContentGrid = React.forwardRef<HTMLDivElement, ContentGridProps>(
  ({ 
    className, 
    children, 
    variant = "asymmetric",
    gap = "lg",
    align = "start",
    reverseOnMobile = false,
    ...props 
  }, ref) => {
    const gapClasses = {
      none: "gap-0",
      sm: "gap-4 lg:gap-6",
      md: "gap-6 lg:gap-8", 
      lg: "gap-8 lg:gap-12",
      xl: "gap-12 lg:gap-16",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end", 
      stretch: "items-stretch",
    };

    const variantClasses = {
      // 60/40 split for content/visual
      asymmetric: [
        "grid grid-cols-1 lg:grid-cols-5",
        "lg:[&>:first-child]:col-span-3 lg:[&>:last-child]:col-span-2"
      ],
      // Traditional sidebar layout
      sidebar: [
        "grid grid-cols-1 lg:grid-cols-4",
        "lg:[&>:first-child]:col-span-3 lg:[&>:last-child]:col-span-1"
      ],
      // Feature spotlight
      feature: [
        "grid grid-cols-1 xl:grid-cols-3",
        "xl:[&>:first-child]:col-span-2 xl:[&>:last-child]:col-span-1"
      ],
      // Magazine-style layout
      magazine: [
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12",
        "md:[&>:first-child]:col-span-1 lg:[&>:first-child]:col-span-7",
        "md:[&>:last-child]:col-span-1 lg:[&>:last-child]:col-span-5"
      ],
      // Masonry-inspired
      masonry: [
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        "auto-rows-min"
      ]
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          variantClasses[variant],
          gapClasses[gap],
          alignClasses[align],
          reverseOnMobile && "flex-col-reverse lg:grid",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContentGrid.displayName = "ContentGrid";