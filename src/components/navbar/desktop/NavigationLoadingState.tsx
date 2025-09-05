
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface NavigationLoadingStateProps {
  className?: string;
  itemCount?: number;
}

export const NavigationLoadingState: React.FC<NavigationLoadingStateProps> = ({
  className,
  itemCount = 3
}) => {
  return (
    <div className={cn("hidden md:flex items-center space-x-6", className)}>
      {/* Services megamenu loading */}
      <Skeleton className="h-10 w-20" />
      
      {/* Navigation items loading */}
      <div className="flex items-center space-x-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-16" />
        ))}
      </div>
    </div>
  );
};

export const MegaMenuLoadingState: React.FC = () => {
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 p-6 w-[900px] lg:w-[1200px]">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-lg border border-border/50">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, serviceIndex) => (
                  <Skeleton key={serviceIndex} className="h-8 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
