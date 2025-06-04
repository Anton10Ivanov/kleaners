
import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  safe?: boolean;
}

const MobileContainer = React.forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ className, size = 'lg', padding = true, safe = false, ...props }, ref) => {
    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm', 
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          sizeClasses[size],
          padding && 'px-4 sm:px-6',
          safe && 'safe-area-top safe-area-bottom',
          className
        )}
        {...props}
      />
    )
  }
)
MobileContainer.displayName = "MobileContainer"

const MobileSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("mobile-section py-6 px-4", className)}
      {...props}
    />
  )
)
MobileSection.displayName = "MobileSection"

const MobileStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'vertical' | 'horizontal';
  }
>(({ className, spacing = 'md', direction = 'vertical', ...props }, ref) => {
  const spacingClasses = {
    xs: direction === 'vertical' ? 'space-y-1' : 'space-x-1',
    sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2', 
    md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
    xl: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
  };
  
  const directionClasses = direction === 'horizontal' ? 'flex items-center' : 'flex flex-col';
  
  return (
    <div
      ref={ref}
      className={cn(directionClasses, spacingClasses[spacing], className)}
      {...props}
    />
  )
})
MobileStack.displayName = "MobileStack"

export { MobileContainer, MobileSection, MobileStack }
