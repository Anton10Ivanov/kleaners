
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'form' | 'avatar' | 'button' | 'image';
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  lines = 1,
  className
}) => {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md";

  switch (variant) {
    case 'text':
      return (
        <div className={cn("form-spacing-tight", className)}>
          {Array.from({ length: lines }).map((_, index) => (
            <div 
              key={index}
              className={cn(
                baseClasses,
                "h-4",
                index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
              )}
            />
          ))}
        </div>
      );
    
    case 'card':
      return (
        <div className={cn("border border-gray-200 dark:border-gray-700 rounded-xl card-spacing-md", className)}>
          <div className="form-spacing-relaxed">
            <div className={cn(baseClasses, "h-6 w-3/4")} />
            <div className="form-spacing-tight">
              <div className={cn(baseClasses, "h-4 w-full")} />
              <div className={cn(baseClasses, "h-4 w-2/3")} />
            </div>
            <div className={cn(baseClasses, "h-10 w-24")} />
          </div>
        </div>
      );
    
    case 'form':
      return (
        <div className={cn("form-spacing-relaxed", className)}>
          <div className="form-spacing-tight">
            <div className={cn(baseClasses, "h-4 w-24")} />
            <div className={cn(baseClasses, "h-12 w-full")} />
          </div>
          <div className="form-spacing-tight">
            <div className={cn(baseClasses, "h-4 w-32")} />
            <div className={cn(baseClasses, "h-12 w-full")} />
          </div>
          <div className={cn(baseClasses, "h-12 w-32")} />
        </div>
      );
    
    case 'avatar':
      return <div className={cn(baseClasses, "h-10 w-10 rounded-full", className)} />;
    
    case 'button':
      return <div className={cn(baseClasses, "h-10 w-24", className)} />;
    
    case 'image':
      return <div className={cn(baseClasses, "h-48 w-full", className)} />;
    
    default:
      return <div className={cn(baseClasses, "h-4 w-full", className)} />;
  }
};
