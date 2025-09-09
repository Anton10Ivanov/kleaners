import { cn } from '@/lib/utils';
import React from "react";
import { ModernContainer } from "./ModernContainer";

interface FullWidthSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: "transparent" | "primary" | "secondary" | "accent" | "muted" | "card" | "gradient";
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "content-grid";
  overlay?: boolean;
  as?: "section" | "div" | "header" | "main" | "article";
}

/**
 * Full-width section component that allows content to break out of traditional containers
 * Perfect for hero sections, testimonials, and visual showcases
 */
export const FullWidthSection = React.forwardRef<HTMLElement, FullWidthSectionProps>(
  ({ 
    className, 
    children, 
    background = "transparent", 
    spacing = "lg",
    containerSize = "content-grid",
    overlay = false,
    as: Component = "section",
    ...props 
  }, ref) => {
    const backgroundClasses = {
      transparent: "bg-transparent",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground", 
      accent: "bg-accent text-accent-foreground",
      muted: "bg-muted text-muted-foreground",
      card: "bg-card text-card-foreground",
      gradient: "bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10",
    };

    const spacingClasses = {
      none: "section-spacing-none",
      sm: "section-spacing-md sm:section-spacing-lg",
      md: "section-spacing-lg sm:section-spacing-xl", 
      lg: "section-spacing-xl sm:section-spacing-2xl lg:py-24",
      xl: "section-spacing-2xl sm:py-24 lg:py-32",
      "2xl": "py-24 sm:py-32 lg:py-40",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          "relative w-full",
          backgroundClasses[background],
          spacingClasses[spacing],
          overlay && "isolate",
          className
        )}
        {...props}
      >
        {overlay && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" aria-hidden="true" />
        )}
        <ModernContainer size={containerSize} className="relative">
          {children}
        </ModernContainer>
      </Component>
    );
  }
);

FullWidthSection.displayName = "FullWidthSection";