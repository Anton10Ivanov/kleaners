
import * as React from "react"
import { cn } from "@/lib/utils"
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    const { isMobile } = useMobileOptimizations();
    
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
          // Mobile-responsive sizing using design tokens
          isMobile ? "px-4 py-3 h-12 text-base" : "px-3 section-spacing-xs h-10 text-sm",
          // Design token integration for states
          error && "border-destructive focus-visible:ring-destructive/20",
          success && "border-green-500 focus-visible:ring-green-500/20",
          !error && !success && "border-input",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
