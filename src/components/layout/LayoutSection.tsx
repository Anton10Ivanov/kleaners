
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface LayoutSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  background?: "transparent" | "card" | "muted" | "accent";
  as?: "section" | "div" | "main" | "article" | "aside";
}

/**
 * Standardized section component with consistent vertical rhythm
 * Uses design tokens for spacing and background colors
 */
export function LayoutSection({
  children,
  className,
  spacing = "lg",
  background = "transparent",
  as: Component = "section",
  ...props
}: LayoutSectionProps) {
  const { getMobileSpacing } = useMobileOptimizations();

  const spacingClasses = {
    none: "py-0",
    sm: "py-4",
    md: "py-6",
    lg: "py-8 md:py-12",
    xl: "py-12 md:py-16",
    "2xl": "py-16 md:py-24",
  };

  const backgroundClasses = {
    transparent: "bg-transparent",
    card: "bg-card",
    muted: "bg-muted",
    accent: "bg-accent",
  };

  return (
    <Component
      className={cn(
        "w-full",
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
