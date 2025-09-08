
import { cn } from '@/lib/utils";

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
 * Responsive grid component using unified Tailwind responsive classes
 * Mobile-first approach with consistent breakpoints
 */
export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  align = "stretch",
  ...props
}: ResponsiveGridProps) {
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

  const getGridColsClass = () => {
    const mobile = `grid-cols-${cols.mobile || 1}`;
    const tablet = `sm:grid-cols-${cols.tablet || 2}`;
    const desktop = `lg:grid-cols-${cols.desktop || 3}`;
    return `${mobile} ${tablet} ${desktop}`;
  };

  return (
    <div
      className={cn(
        "grid w-full",
        getGridColsClass(),
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
