import React from 'react';
import { cn } from '@/lib/utils';

interface ModernContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  breakout?: boolean;
  centered?: boolean;
}

/**
 * Modern container component with responsive design
 */
export const ModernContainer = React.forwardRef<HTMLDivElement, ModernContainerProps>(
  ({ children, className, breakout = false, centered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          breakout ? 'max-w-none' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          centered && 'flex flex-col items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModernContainer.displayName = "ModernContainer";