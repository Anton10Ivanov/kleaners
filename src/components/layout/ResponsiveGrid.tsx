
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: {
    mobile?: 1 | 2;
    tablet?: 1 | 2 | 3 | 4;
    desktop?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
}

/**
 * Enhanced responsive grid component with design token integration
 * Automatically adapts to screen sizes with mobile-first approach
 */
export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  align = "stretch",
  ...props
}: ResponsiveGridProps) {
  const { isMobile, isTablet } = useMobileOptimizations();

  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2", 
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch",
  };

  const getGridCols = () => {
    if (isMobile) return `grid-cols-${cols.mobile || 1}`;
    if (isTablet) return `grid-cols-${cols.tablet || 2}`;
    return `grid-cols-${cols.desktop || 3}`;
  };

  return (
    <div
      className={cn(
        "grid w-full",
        getGridCols(),
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
