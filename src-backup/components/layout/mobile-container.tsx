import React from 'react';
import { cn } from '@/lib/utils';

const MobileContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mobile-container w-full max-w-md mx-auto px-4", className)}
      {...props}
    />
  )
)
MobileContainer.displayName = "MobileContainer"

const MobileSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("mobile-section section-spacing-sm px-4", className)}
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
    xs: direction === 'vertical' ? 'component-spacing-xs' : 'space-x-1',
    sm: direction === 'vertical' ? 'form-spacing-tight' : 'space-x-2', 
    md: direction === 'vertical' ? 'form-spacing-relaxed' : 'space-x-4',
    lg: direction === 'vertical' ? 'form-spacing-loose' : 'space-x-6',
    xl: direction === 'vertical' ? 'component-spacing-xl' : 'space-x-8',
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

export { MobileContainer, MobileSection, MobileStack };
