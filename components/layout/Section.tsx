
import { cn } from '@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

/**
 * Section component for consistent vertical spacing
 * 
 * @param spacing - Amount of vertical spacing (none: 0, sm: 16px, md: 32px, lg: 64px, xl: 96px)
 */
export function Section({
  children,
  className,
  spacing = "md",
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "section-spacing-none",
    sm: "section-spacing-xs",
    md: "section-spacing-md",
    lg: "section-spacing-xl",
    xl: "py-24",
  };

  return (
    <section
      className={cn(
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
