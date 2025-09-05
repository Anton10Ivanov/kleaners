
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
        <div className={cn("space-y-2", className)}>
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
        <div className={cn("border border-gray-200 dark:border-gray-700 rounded-xl p-6", className)}>
          <div className="space-y-4">
            <div className={cn(baseClasses, "h-6 w-3/4")} />
            <div className="space-y-2">
              <div className={cn(baseClasses, "h-4 w-full")} />
              <div className={cn(baseClasses, "h-4 w-2/3")} />
            </div>
            <div className={cn(baseClasses, "h-10 w-24")} />
          </div>
        </div>
      );
    
    case 'form':
      return (
        <div className={cn("space-y-4", className)}>
          <div className="space-y-2">
            <div className={cn(baseClasses, "h-4 w-24")} />
            <div className={cn(baseClasses, "h-12 w-full")} />
          </div>
          <div className="space-y-2">
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
