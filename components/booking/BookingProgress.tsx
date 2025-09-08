
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const BookingProgress: React.FC<BookingProgressProps> = ({
  currentStep,
  totalSteps,
  steps
}) => {
  return (
    <div className="w-full mb-6 md:mb-8">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <React.Fragment key={stepNumber}>
                {/* Step circle */}
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200",
                    {
                      "bg-primary text-white": isCompleted,
                      "bg-primary text-white ring-4 ring-primary/20": isCurrent,
                      "bg-gray-200 text-gray-600": !isCompleted && !isCurrent
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all duration-200",
                      {
                        "bg-primary": isCompleted,
                        "bg-gray-200": !isCompleted
                      }
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Step labels */}
      <div className="flex justify-between text-xs md:text-sm text-gray-600">
        {steps.map((step, index) => (
          <span
            key={index}
            className={cn(
              "text-center transition-colors duration-200",
              {
                "text-primary font-medium": index + 1 <= currentStep,
                "text-gray-500": index + 1 > currentStep
              }
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};
