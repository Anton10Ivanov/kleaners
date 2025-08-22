import { memo, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface StrictAutoProgressiveWrapperProps {
  form: UseFormReturn<any>;
  currentStep: number;
  onNext: () => void;
  children: React.ReactNode;
  requiredFields: string[];
  autoAdvanceDelay?: number;
}

export const StrictAutoProgressiveWrapper = memo(({
  form,
  currentStep,
  onNext,
  children,
  requiredFields,
  autoAdvanceDelay = 2000
}: StrictAutoProgressiveWrapperProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = form.watch((values) => {
      // Check if ALL required fields are filled
      const isStepComplete = requiredFields.every(field => {
        const value = values[field];
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== null && value !== undefined && value !== '';
      });
      
      if (isStepComplete && !isCompleted) {
        setIsCompleted(true);
        
        // Clear any existing timer
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
        }

        // Set new timer for auto-advance
        const timer = setTimeout(() => {
          toast.success("All details completed! Moving to next step...", {
            duration: 2000,
          });
          onNext();
        }, autoAdvanceDelay);
        
        setAutoAdvanceTimer(timer);
      } else if (!isStepComplete && isCompleted) {
        setIsCompleted(false);
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
          setAutoAdvanceTimer(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [form.watch, requiredFields, isCompleted, autoAdvanceTimer, onNext, autoAdvanceDelay]);

  return (
    <div className="space-y-6">
      {children}
      
      {/* Auto-advance indicator */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-secondary font-medium text-sm bg-secondary/10 border border-secondary/20 rounded-lg p-3"
        >
          <CheckCircle className="h-4 w-4" />
          <span>All required fields completed! Advancing automatically...</span>
        </motion.div>
      )}
    </div>
  );
});

StrictAutoProgressiveWrapper.displayName = "StrictAutoProgressiveWrapper";