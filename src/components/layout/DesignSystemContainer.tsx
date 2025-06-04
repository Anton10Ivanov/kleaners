
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface DesignSystemContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

/**
 * Container component with design token-based sizing and spacing
 * Mobile-first responsive design with consistent padding patterns
 */
export function DesignSystemContainer({
  children,
  className,
  size = "xl",
  padding = "md",
  centered = true,
  ...props
}: DesignSystemContainerProps) {
  const { getMobileSpacing } = useMobileOptimizations();

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: getMobileSpacing('sm'),
    md: getMobileSpacing('md'),
    lg: getMobileSpacing('lg'),
    xl: getMobileSpacing('xl'),
  };

  return (
    <div
      className={cn(
        "w-full",
        sizeClasses[size],
        paddingClasses[padding],
        centered && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
