import { cn } from '@/lib/utils";
import React from "react";

interface FluidTypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "display" | "hero" | "heading" | "subheading" | "body" | "caption";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "muted" | "accent";
}

/**
 * Fluid typography component with responsive sizing
 * Automatically scales between mobile and desktop breakpoints
 */
export const FluidTypography = React.forwardRef<HTMLElement, FluidTypographyProps>(
  ({ 
    className, 
    children, 
    variant = "body",
    as,
    weight = "normal",
    align = "left",
    color = "primary",
    ...props 
  }, ref) => {
    // Auto-determine semantic tag if not specified
    const getSemanticTag = () => {
      if (as) return as;
      switch (variant) {
        case "display":
        case "hero": return "h1";
        case "heading": return "h2";
        case "subheading": return "h3";
        case "body": return "p";
        case "caption": return "span";
        default: return "p";
      }
    };

    const Component = getSemanticTag();

    const variantClasses = {
      // clamp(min, preferred, max) for fluid scaling
      display: "text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-tight",
      hero: "text-[clamp(2rem,6vw,4rem)] leading-[1.1] tracking-tight",
      heading: "text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] tracking-tight",
      subheading: "text-[clamp(1.125rem,2.5vw,1.5rem)] leading-[1.4]",
      body: "text-[clamp(1rem,1.5vw,1.125rem)] leading-[1.6]",
      caption: "text-[clamp(0.875rem,1vw,1rem)] leading-[1.5]",
    };

    const weightClasses = {
      light: "font-light",
      normal: "font-normal", 
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    };

    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const colorClasses = {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      muted: "text-muted-foreground/80",
      accent: "text-accent-foreground",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          variantClasses[variant],
          weightClasses[weight],
          alignClasses[align],
          colorClasses[color],
          "font-sans antialiased",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

FluidTypography.displayName = "FluidTypography";