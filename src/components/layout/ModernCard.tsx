import { cn } from "@/lib/utils";
import React from "react";

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive" | "glass" | "gradient" | "minimal";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  hover?: boolean;
}

/**
 * Modern card component with advanced styling options
 * Supports glass morphism, gradients, and micro-interactions
 */
export const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ 
    className, 
    children, 
    variant = "default",
    padding = "lg",
    radius = "xl",
    shadow = "md",
    border = true,
    hover = false,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "bg-card text-card-foreground",
      elevated: "bg-card text-card-foreground shadow-lg hover:shadow-xl",
      interactive: "bg-card text-card-foreground cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
      glass: "bg-card/95 backdrop-blur-sm border-border/20 shadow-xl",
      gradient: "bg-gradient-to-br from-card to-card/80 text-card-foreground",
      minimal: "bg-transparent border-0 shadow-none",
    };

    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md", 
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
    };

    const shadowClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg", 
      xl: "shadow-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variantClasses[variant],
          paddingClasses[padding],
          radiusClasses[radius],
          variant !== "glass" && variant !== "minimal" && shadowClasses[shadow],
          border && variant !== "minimal" && "border border-border",
          hover && "hover:shadow-lg hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModernCard.displayName = "ModernCard";