
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "2xl";
}

/**
 * Container component that centers content with consistent max-width
 * 
 * @param size - Size of the container (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1400px, full: 100%)
 */
export function Container({
  children,
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-[1400px]",
    full: "max-w-full"
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
