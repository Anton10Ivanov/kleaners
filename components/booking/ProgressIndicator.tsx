import { memo } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export const ProgressIndicator = memo(({
  currentStep,
  totalSteps,
  stepLabels = ['Service Details', 'Schedule & Extras', 'Contact & Payment'],
  className
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center space-x-2 section-spacing-xs", className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const stepLabel = stepLabels[index];
        
        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                  isCompleted 
                    ? "bg-secondary text-secondary-foreground" 
                    : isCurrent 
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-semibold">{stepNumber}</span>
                )}
              </div>
              
              {/* Step label */}
              {stepLabel && (
                <span 
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-20",
                    isCompleted || isCurrent 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  {stepLabel}
                </span>
              )}
            </div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div 
                className={cn(
                  "w-8 h-0.5 mx-2 transition-all duration-300",
                  isCompleted 
                    ? "bg-secondary" 
                    : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

ProgressIndicator.displayName = "ProgressIndicator";