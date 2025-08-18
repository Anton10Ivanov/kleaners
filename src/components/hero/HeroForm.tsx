
import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PostalCodeInput } from "./PostalCodeInput";
import { SubmitButton } from "./SubmitButton";
import { ServiceTypeGrid } from "./ServiceTypeGrid";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeroFormProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  handleNextStep: () => void;
}

export const HeroForm = memo(({
  postalCode,
  setPostalCode,
  selectedService,
  setSelectedService,
  handleNextStep
}: HeroFormProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Auto-advance when both postal code and service are selected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (postalCode && postalCode.length >= 4 && selectedService) {
        handleNextStep();
      }
    }, 800); // Small delay for better UX
    
    return () => clearTimeout(timer);
  }, [postalCode, selectedService, handleNextStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode && selectedService) {
      handleNextStep();
    }
  };

  return (
    <motion.div 
      initial={{
        opacity: 0,
        scale: isMobile ? 0.95 : 1,
        y: isMobile ? 20 : 30
      }} 
      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} 
      transition={{
        duration: 0.8,
        delay: isMobile ? 0.1 : 0.7,
        ease: "easeOut"
      }}
      className={cn(
        "backdrop-blur-sm rounded-3xl shadow-2xl border transition-all duration-300",
        isMobile 
          ? "w-full bg-card/95 border-border p-8 mt-8" 
          : "absolute top-[15%] left-8 transform w-96 max-w-sm border-white/20 p-8 z-10 py-0 px-[28px] bg-transparent"
      )}
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{
          duration: 0.6,
          delay: isMobile ? 0.2 : 0.9
        }}
      >
        {/* Enhanced form header - Mobile only */}
        {isMobile && (
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-muted-foreground">Quick • Easy • Free • No Commitment</p>
          </div>
        )}

        {/* Step 1: Location Input */}
        <div className="space-y-4">
          <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />
          
          {/* Step 2: Service Type Selection - Shows after postal code */}
          {postalCode && postalCode.length >= 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-secondary/20">
                <CardContent className="pt-4">
                  <h4 className="text-sm font-medium text-secondary mb-3">Select Service Type</h4>
                  <ServiceTypeGrid 
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Auto-advancing status indicator */}
        {postalCode && postalCode.length >= 4 && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-secondary font-medium"
          >
            ✓ Preparing your personalized quote...
          </motion.div>
        )}
        
        {/* CTA Button - Only show if manual submit needed */}
        {(!postalCode || postalCode.length < 4 || !selectedService) && <SubmitButton />}
      </motion.form>
    </motion.div>
  );
});
HeroForm.displayName = "HeroForm";
