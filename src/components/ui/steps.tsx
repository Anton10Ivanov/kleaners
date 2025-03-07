
import React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

export const Step = ({ title, icon, className }: StepProps) => {
  // This component doesn't render anything on its own
  // It's used to define the structure of the steps
  return null;
};

export const Steps = ({ currentStep, children, className }: StepsProps) => {
  // Convert children to array and ensure they are Step components
  const stepsArray = React.Children.toArray(children);
  
  // Count the total number of steps
  const totalSteps = stepsArray.length;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {stepsArray.map((step, index) => {
          const stepProps = (step as React.ReactElement).props;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center relative"
              style={{ width: `${100 / totalSteps}%` }}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full w-8 h-8 z-10 transition-colors",
                  isCompleted ? "bg-primary text-primary-foreground" :
                  isCurrent ? "bg-primary/90 text-primary-foreground" : 
                  "bg-muted border border-muted-foreground/20"
                )}
              >
                {stepProps.icon || (isCompleted ? index + 1 : index + 1)}
              </div>
              
              {/* Step Title */}
              <div className="mt-2 text-xs text-center">
                <span 
                  className={cn(
                    "font-medium",
                    isCurrent ? "text-primary" : 
                    isCompleted ? "text-muted-foreground" : 
                    "text-muted-foreground/60"
                  )}
                >
                  {stepProps.title}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div 
                  className="absolute top-4 left-0 right-0 h-0.5 -translate-y-1/2"
                  style={{ width: "100%", left: "50%" }}
                >
                  <div 
                    className={cn(
                      "h-full",
                      isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                    )}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
