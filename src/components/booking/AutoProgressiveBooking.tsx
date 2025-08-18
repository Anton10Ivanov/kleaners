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

  // Watch for form completion triggers - removed individual watches since we now use form.watch()
  // This allows us to handle all service types dynamically

  useEffect(() => {
    const subscription = form.watch((value: any) => {
      if (currentStep === 2) {
        const service = value.service || value.serviceType;
        let isStepComplete = false;
        
        // Check completion based on service type
        switch (service) {
          case 'home':
            isStepComplete = !!(value.propertySize && 
                              value.bedrooms !== undefined && 
                              value.bathrooms !== undefined && 
                              value.frequency && 
                              value.hours);
            break;
            
          case 'move-in-out':
            isStepComplete = !!(value.squareMeters && 
                              value.bedrooms !== undefined && 
                              value.bathrooms !== undefined && 
                              value.cleaningGoal);
            break;
            
          case 'deep-cleaning':
            isStepComplete = !!(value.squareMeters && 
                              value.bedrooms !== undefined && 
                              value.bathrooms !== undefined && 
                              value.targetAreas?.length);
            break;
            
          case 'post-construction':
            isStepComplete = !!(value.squareMeters && 
                              value.constructionType && 
                              value.dustLevel);
            break;
            
          case 'office':
            isStepComplete = !!(value.squareMeters && 
                              value.numEmployees);
            break;
            
          default:
            // Fallback to original home logic
            isStepComplete = !!(value.propertySize && 
                              value.bedrooms !== undefined && 
                              value.bathrooms !== undefined && 
                              value.frequency && 
                              value.hours);
        }

        if (isStepComplete && !completedSections.step2) {
          setCompletedSections(prev => ({ ...prev, step2: true }));
          
          // Clear any existing timer
          if (autoAdvanceTimer) {
            clearTimeout(autoAdvanceTimer);
          }

          // Set new timer for auto-advance
          const timer = setTimeout(() => {
            toast.success("Details completed! Moving to next step...", {
              duration: 2000,
            });
            handleNext();
          }, 1500); // 1.5 second delay
          
          setAutoAdvanceTimer(timer);
        } else if (!isStepComplete && completedSections.step2) {
          setCompletedSections(prev => ({ ...prev, step2: false }));
          if (autoAdvanceTimer) {
            clearTimeout(autoAdvanceTimer);
            setAutoAdvanceTimer(null);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [form.watch, currentStep, completedSections.step2, autoAdvanceTimer, handleNext]);

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