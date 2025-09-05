import { memo } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export const EnhancedProgressIndicator = memo(({
  currentStep,
  totalSteps,
  stepLabels = ['Service Details', 'Schedule & Contact', 'Confirmation'],
  className
}: EnhancedProgressIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center space-x-4 py-6", className)}>
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
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border-2",
                  isCompleted 
                    ? "bg-secondary text-secondary-foreground border-secondary" 
                    : isCurrent 
                    ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30" 
                    : "bg-background text-muted-foreground border-muted"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </div>
              
              {/* Step label */}
              {stepLabel && (
                <span 
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-24 leading-tight",
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
                  "w-12 h-0.5 mx-4 transition-all duration-300",
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

EnhancedProgressIndicator.displayName = "EnhancedProgressIndicator";