
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "xs" | "sm" | "md" | "lg";
  responsive?: boolean;
}

/**
 * Grid component for consistent column layouts
 * 
 * @param cols - Number of columns (1-6)
 * @param gap - Size of gap between items (none: 0, xs: 4px, sm: 8px, md: 16px, lg: 24px)
 * @param responsive - Whether grid should collapse to single column on mobile
 */
export function Grid({
  children,
  className,
  cols = 3,
  gap = "md",
  responsive = true,
  ...props
}: GridProps) {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const responsiveClass = responsive 
    ? `grid-cols-1 sm:${colsClasses[cols]}` 
    : colsClasses[cols];

  return (
    <div
      className={cn(
        "grid",
        responsiveClass,
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
