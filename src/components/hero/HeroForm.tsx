
import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ServiceType } from "@/schemas/booking";
import { getBookingRoute } from "@/utils/serviceRouteMapping";
import { ServiceTypeGrid } from "./ServiceTypeGrid";
import { PostalCodeInput } from "./PostalCodeInput";
import { SubmitButton } from "./SubmitButton";
import { cn } from "@/lib/utils";

interface HeroFormProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const HeroForm = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: HeroFormProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If a service is selected, navigate to specific booking route
    if (selectedService && postalCode) {
      const route = getBookingRoute(selectedService as ServiceType);
      navigate(route, {
        state: {
          selectedService,
          postalCode
        }
      });
    } else {
      // Fallback to original step-based flow
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
        delay: isMobile ? 0.5 : 0.7,
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
          delay: isMobile ? 0.7 : 0.9
        }}
      >
        {/* Enhanced form header - Mobile only */}
        {isMobile && (
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-muted-foreground">Quick • Easy • Free • No Commitment</p>
          </div>
        )}

        {/* Location Input */}
        <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />

        {/* Service Type Grid */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2 text-center",
            isMobile ? "text-muted-foreground" : "text-primary-foreground"
          )}>
            Service Type
          </label>
          <ServiceTypeGrid selectedService={selectedService} setSelectedService={setSelectedService} />
        </div>
        
        {/* CTA Button */}
        <SubmitButton />
      </motion.form>
    </motion.div>
  );
});
HeroForm.displayName = "HeroForm";
