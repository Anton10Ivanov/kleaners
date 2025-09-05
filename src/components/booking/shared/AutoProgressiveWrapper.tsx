import { memo, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface AutoProgressiveWrapperProps {
  form: UseFormReturn<any>;
  currentStep: number;
  onNext: () => void;
  children: React.ReactNode;
  completionCheck: (values: any) => boolean;
  autoAdvanceDelay?: number;
}

export const AutoProgressiveWrapper = memo(({
  form,
  currentStep,
  onNext,
  children,
  completionCheck,
  autoAdvanceDelay = 1500
}: AutoProgressiveWrapperProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const isStepComplete = completionCheck(values);
      
      if (isStepComplete && !isCompleted) {
        setIsCompleted(true);
        
        // Clear any existing timer
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
        }

        // Set new timer for auto-advance
        const timer = setTimeout(() => {
          toast.success("Details completed! Moving to next step...", {
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
  }, [form.watch, completionCheck, isCompleted, autoAdvanceTimer, onNext, autoAdvanceDelay]);

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
          <span>Form completed! Advancing automatically...</span>
        </motion.div>
      )}
    </div>
  );
});

AutoProgressiveWrapper.displayName = "AutoProgressiveWrapper";