
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BookingStepIndicatorProps {
  currentStep: number;
  steps: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

export const BookingStepIndicator: React.FC<BookingStepIndicatorProps> = ({
  currentStep,
  steps
}) => {
  return (
    <div className="w-full mb-6 md:mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                {/* Step circle with animation */}
                <motion.div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-sm font-medium transition-all duration-300",
                    {
                      "bg-primary text-white shadow-lg": isCompleted,
                      "bg-primary text-white ring-4 ring-primary/20 shadow-lg": isCurrent,
                      "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400": isUpcoming
                    }
                  )}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted ? '#0ea5e9' : isCurrent ? '#0ea5e9' : '#e5e7eb'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  ) : (
                    <span className="text-sm md:text-base">{step.id}</span>
                  )}
                </motion.div>
                
                {/* Step title and description */}
                <div className="mt-2 text-center max-w-[80px] md:max-w-[120px]">
                  <p className={cn(
                    "text-xs md:text-sm font-medium transition-colors duration-200",
                    {
                      "text-primary": isCompleted || isCurrent,
                      "text-gray-500 dark:text-gray-400": isUpcoming
                    }
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connecting arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  className={cn(
                    "flex items-center mx-2 md:mx-4 transition-colors duration-300",
                    {
                      "text-primary": isCompleted,
                      "text-gray-300 dark:text-gray-600": !isCompleted
                    }
                  )}
                  initial={false}
                  animate={{
                    color: isCompleted ? '#0ea5e9' : '#d1d5db'
                  }}
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
