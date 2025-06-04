
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations"

export interface MobileSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  success?: boolean;
}

const MobileSelect = React.forwardRef<HTMLSelectElement, MobileSelectProps>(
  ({ className, children, error, success, ...props }, ref) => {
    const { isMobile } = useMobileOptimizations();
    
    return (
      <div className="relative">
        <select
          className={cn(
            "mobile-select",
            "flex w-full rounded-lg border bg-background ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "appearance-none cursor-pointer",
            "transition-colors duration-200",
            isMobile ? "px-4 py-3 pr-10 h-12 text-base" : "px-3 py-2 pr-8 h-10 text-sm",
            error && "border-destructive focus-visible:ring-destructive/20",
            success && "border-green-500 focus-visible:ring-green-500/20",
            !error && !success && "border-input",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className={cn(
          "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none",
          isMobile ? "h-5 w-5" : "h-4 w-4"
        )} />
      </div>
    )
  }
)
MobileSelect.displayName = "MobileSelect"

export { MobileSelect }
