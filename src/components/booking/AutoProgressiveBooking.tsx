import { memo, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface AutoProgressiveBookingProps {
  form: UseFormReturn<BookingFormData>;
  currentStep: number;
  handleNext: () => void;
  children: React.ReactNode;
}

export const AutoProgressiveBooking = memo(({
  form,
  currentStep,
  handleNext,
  children
}: AutoProgressiveBookingProps) => {
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  // Watch for form completion triggers
  const propertySize = form.watch('propertySize');
  const bedrooms = form.watch('bedrooms');
  const bathrooms = form.watch('bathrooms');
  const frequency = form.watch('frequency');
  const hours = form.watch('hours');

  // Auto-advance logic for Step 2 (Property Details)
  useEffect(() => {
    if (currentStep === 2) {
      const isPropertyComplete = propertySize && propertySize > 0 && 
                                bedrooms !== undefined && bedrooms >= 0 && 
                                bathrooms && bathrooms > 0;
      const isBookingComplete = frequency && hours && hours > 0;
      
      if (isPropertyComplete && isBookingComplete) {
        // Clear existing timer
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
        }

        // Set new timer for auto-advance
        const timer = setTimeout(() => {
          toast.success("Great! Moving to next step...");
          handleNext();
        }, 1200); // 1.2 second delay for better UX

        setAutoAdvanceTimer(timer);
        setCompletedSections(prev => ({ ...prev, step2: true }));
      } else {
        setCompletedSections(prev => ({ ...prev, step2: false }));
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
          setAutoAdvanceTimer(null);
        }
      }
    }

    // Cleanup timer on unmount or step change
    return () => {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [currentStep, propertySize, bedrooms, bathrooms, frequency, hours, handleNext, autoAdvanceTimer]);

  return (
    <div className="space-y-6">
      {children}
      
      {/* Auto-advance indicator */}
      {completedSections.step2 && currentStep === 2 && (
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

AutoProgressiveBooking.displayName = "AutoProgressiveBooking";