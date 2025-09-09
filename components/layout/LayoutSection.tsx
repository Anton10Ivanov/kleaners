
import { cn } from '@/lib/utils';

interface LayoutSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  background?: "transparent" | "card" | "muted" | "accent";
  as?: "section" | "div" | "main" | "article" | "aside";
}

/**
 * Standardized section component with consistent vertical rhythm
 * Uses unified responsive design tokens
 */
export function LayoutSection({
  children,
  className,
  spacing = "lg",
  background = "transparent",
  as: Component = "section",
  ...props
}: LayoutSectionProps) {
  const spacingClasses = {
    none: "section-spacing-none",
    sm: "section-spacing-xs",
    md: "section-spacing-sm",
    lg: "section-spacing-md md:section-spacing-lg",
    xl: "section-spacing-lg md:section-spacing-xl",
    "2xl": "section-spacing-xl md:py-24",
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
