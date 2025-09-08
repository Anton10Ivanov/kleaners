
import React, { useEffect, useState } from "react";
import { cn } from '@/lib/utils";
import { CheckCircle } from "lucide-react";

type StepStatus = "complete" | "incomplete" | "current" | "waiting";

interface StepProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  status?: StepStatus;
}

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

export const Step = ({ title, icon, className, status }: StepProps) => {
  // This component doesn't render anything on its own
  // It's used to define the structure of the steps
  return null;
};

export const Steps = ({ currentStep, children, className }: StepsProps) => {
  // Convert children to array and ensure they are Step components
  const stepsArray = React.Children.toArray(children);
  
  // Count the total number of steps
  const totalSteps = stepsArray.length;
  
  // State to track previous step for animation purposes
  const [prevStep, setPrevStep] = useState(currentStep);
  const [direction, setDirection] = useState<'forward' | 'backward' | null>(null);
  
  // Update direction when currentStep changes
  useEffect(() => {
    if (currentStep !== prevStep) {
      setDirection(currentStep > prevStep ? 'forward' : 'backward');
      setPrevStep(currentStep);
    }
  }, [currentStep, prevStep]);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {stepsArray.map((step, index) => {
          const stepProps = (step as React.ReactElement).props;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const status = stepProps.status || (isCompleted ? "complete" : isCurrent ? "current" : "waiting");
          
          return (
            <div 
              key={index} 
              className={cn(
                "flex flex-col items-center relative",
                // Add transition classes for smooth animations during step changes
                direction === 'forward' && index === currentStep ? "animate-fadeIn" : "",
                direction === 'backward' && index === currentStep ? "animate-slideInLeft" : ""
              )}
              style={{ width: `${100 / totalSteps}%` }}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full w-8 h-8 z-10 transition-all duration-300",
                  status === "complete" ? "bg-green-600 text-white" :
                  status === "current" ? "bg-primary text-primary-foreground ring-2 ring-primary/30" : 
                  status === "incomplete" && isCurrent ? "bg-amber-100 border border-amber-300 text-amber-600" :
                  "bg-muted border border-muted-foreground/20"
                )}
              >
                {status === "complete" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : stepProps.icon || (index + 1)}
              </div>
              
              {/* Step Title */}
              <div className="mt-2 text-xs text-center">
                <span 
                  className={cn(
                    "font-medium",
                    status === "complete" ? "text-green-600" :
                    status === "current" ? "text-primary" : 
                    status === "incomplete" && isCurrent ? "text-amber-600" :
                    "text-muted-foreground/60"
                  )}
                >
                  {stepProps.title}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div 
                  className="absolute top-4 w-full left-1/2 h-0.5"
                >
                  <div 
                    className={cn(
                      "h-full w-full transition-all duration-300",
                      {
                        "bg-green-600": status === "complete",
                        "bg-success": isCurrent,
                        "bg-muted-foreground/20": !isCompleted && !isCurrent
                      }
                    )}
                    style={{
                      // Fix connector line position and transitions
                      transform: "translateX(0%)"
                    }}
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
