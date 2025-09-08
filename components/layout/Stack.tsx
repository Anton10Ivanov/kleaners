
import { cn } from '@/lib/utils";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
}

/**
 * Stack component for consistent spacing between items in a flex container
 * 
 * @param spacing - Space between items (none: 0, xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
 * @param direction - Direction of the stack (row or column)
 * @param align - Alignment of items on the cross axis
 * @param justify - Justification of items on the main axis
 * @param wrap - Whether items should wrap to the next line
 */
export function Stack({
  children,
  className,
  spacing = "md",
  direction = "column",
  align = "start",
  justify = "start",
  wrap = false,
  ...props
}: StackProps) {
  const spacingClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const alignmentClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  const directionClasses = {
    row: "flex-row",
    column: "flex-col",
  };

  return (
    <div
      className={cn(
        "flex",
        directionClasses[direction],
        alignmentClasses[align],
        justifyClasses[justify],
        spacingClasses[spacing],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
