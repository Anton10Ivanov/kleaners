'use client'

import React from 'react';
import { cn } from '@/lib/utils";

interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'section' | 'compact';
}

/**
 * Unified container component that eliminates spacing conflicts
 * Mobile-first responsive design with consistent padding
 */
export const UnifiedContainer = React.forwardRef<HTMLDivElement, UnifiedContainerProps>(
  ({ children, className, variant = 'default', ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'hero':
          return 'section-spacing-md md:section-spacing-lg lg:section-spacing-xl';
        case 'section':
          return 'section-spacing-sm md:section-spacing-md lg:section-spacing-lg';
        case 'compact':
          return 'section-spacing-xs md:section-spacing-sm';
        default:
          return 'section-spacing-sm md:section-spacing-md';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

UnifiedContainer.displayName = "UnifiedContainer";