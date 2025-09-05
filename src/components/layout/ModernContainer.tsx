import { UnifiedContainer } from "./UnifiedContainer";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ModernContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  breakout?: boolean;
  centered?: boolean;
}

/**
 * Modern container component - now uses UnifiedContainer for consistency
 * @deprecated Use UnifiedContainer directly for new components
 */
export const ModernContainer = React.forwardRef<HTMLDivElement, ModernContainerProps>(
  ({ className, children, size = "xl", padding = "md", breakout = false, centered = true, ...props }, ref) => {
    // Map ModernContainer padding to UnifiedContainer format
    const paddingMap = {
      none: false,
      sm: "sm" as const,
      md: "md" as const, 
      lg: "lg" as const,
      xl: "xl" as const,
    };

    return (
      <UnifiedContainer
        ref={ref}
        size={size}
        padding={paddingMap[padding]}
        breakout={breakout}
        centered={centered}
        className={className}
        {...props}
      >
        {children}
      </UnifiedContainer>
    );
  }
);

ModernContainer.displayName = "ModernContainer";