
import { cn } from "@/lib/utils";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * @dev Used to highlight component boundaries during development
   */
  debug?: boolean;
}

/**
 * Box component for creating contained sections with consistent styling
 * 
 * @param padding - Inner padding (none: 0, sm: 8px, md: 16px, lg: 24px)
 * @param border - Whether to show a border
 * @param shadow - Shadow size (none, sm, md, lg)
 * @param rounded - Border radius (none: 0, sm: 4px, md: 8px, lg: 12px, full: 9999px)
 * @param debug - Highlight component boundaries (dev mode only)
 */
export function Box({
  children,
  className,
  padding = "md",
  border = false,
  shadow = "none",
  rounded = "md",
  debug = false,
  ...props
}: BoxProps) {
  const paddingClasses = {
    none: "card-spacing-none",
    sm: "p-2",
    md: "card-spacing-sm",
    lg: "card-spacing-md",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Development outline for easier component visualization
  const debugClass = debug && import.meta.env.DEV 
    ? "outline outline-1 outline-dashed outline-pink-500" 
    : "";

  return (
    <div
      className={cn(
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        border && "border",
        debugClass,
        "bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
