
import * as React from "react"
import { cn } from "@/lib/utils"
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations"

export interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'number';
  error?: boolean;
  success?: boolean;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, variant = 'default', error, success, ...props }, ref) => {
    const { isMobile } = useMobileOptimizations();
    
    const baseClasses = cn(
      "mobile-input",
      "flex w-full rounded-lg border bg-background text-base ring-offset-background",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-colors duration-200",
      isMobile ? "px-4 py-3 h-12 text-base" : "px-3 py-2 h-10 text-sm"
    );

    const variantClasses = {
      default: "border-input",
      search: "border-input bg-muted/50",
      number: "border-input"
    };

    const stateClasses = cn(
      error && "border-destructive focus-visible:ring-destructive/20",
      success && "border-green-500 focus-visible:ring-green-500/20"
    );

    return (
      <input
        type={type}
        className={cn(baseClasses, variantClasses[variant], stateClasses, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
MobileInput.displayName = "MobileInput"

export { MobileInput }
