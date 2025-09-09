
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface FlexLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  responsive?: {
    mobile?: "row" | "column";
    tablet?: "row" | "column";
    desktop?: "row" | "column";
  };
}

/**
 * Flexible layout component with responsive direction changes
 * Integrates with design tokens for consistent spacing
 */
export function FlexLayout({
  children,
  className,
  direction = "row",
  align = "start",
  justify = "start",
  gap = "md",
  wrap = false,
  responsive,
  ...props
}: FlexLayoutProps) {
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
    baseline: "items-baseline",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between", 
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const directionClasses = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  const getResponsiveDirection = () => {
    if (!responsive) return directionClasses[direction];
    
    if (isMobile && responsive.mobile) {
      return directionClasses[responsive.mobile];
    }
    if (isTablet && responsive.tablet) {
      return directionClasses[responsive.tablet];
    }
    if (responsive.desktop) {
      return directionClasses[responsive.desktop];
    }
    
    return directionClasses[direction];
  };

  return (
    <div
      className={cn(
        "flex",
        getResponsiveDirection(),
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
