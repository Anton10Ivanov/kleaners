
import { cn } from "@/lib/utils";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

/**
 * Box component for creating contained sections with consistent styling
 * 
 * @param padding - Inner padding (none: 0, sm: 8px, md: 16px, lg: 24px)
 * @param border - Whether to show a border
 * @param shadow - Shadow size (none, sm, md, lg)
 * @param rounded - Border radius (none: 0, sm: 4px, md: 8px, lg: 12px, full: 9999px)
 */
export function Box({
  children,
  className,
  padding = "md",
  border = false,
  shadow = "none",
  rounded = "md",
  ...props
}: BoxProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
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

  return (
    <div
      className={cn(
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        border && "border",
        "bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
