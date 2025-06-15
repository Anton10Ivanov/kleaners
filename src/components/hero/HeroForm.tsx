
import { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ServiceType } from "@/schemas/booking";
import { getBookingRoute } from "@/utils/serviceRouteMapping";
import { ServiceTypeGrid } from "./ServiceTypeGrid";
import { PostalCodeInput } from "./PostalCodeInput";
import { SubmitButton } from "./SubmitButton";
interface HeroFormProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
  isMobile: boolean;
}
export const HeroForm = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep,
  isMobile
}: HeroFormProps) => {
  const navigate = useNavigate();
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
  if (isMobile) {
    return <motion.div initial={{
      opacity: 0,
      scale: 0.95,
      y: 20
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.5,
      ease: "easeOut"
    }} className="w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mt-8">
        <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.7
      }}>
          {/* Enhanced form header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-gray-600">Quick • Easy • Free • No Commitment</p>
          </div>

          {/* Location Input */}
          <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} isMobile={true} />

          {/* Service Type Grid */}
          <ServiceTypeGrid selectedService={selectedService} setSelectedService={setSelectedService} isMobile={true} />
          
          {/* Enhanced CTA Button */}
          <SubmitButton isMobile={true} />
        </motion.form>
      </motion.div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8,
    delay: 0.7,
    ease: "easeOut"
  }} className="absolute top-[15%] left-8 transform w-96 max-w-sm backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 z-10 py-0 px-[28px] bg-transparent">
      <motion.form onSubmit={handleSubmit} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.6,
      delay: 0.9
    }} className="space-y-4">
        {/* Location Input */}
        <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} isMobile={false} />

        {/* Service Type Grid */}
        <ServiceTypeGrid selectedService={selectedService} setSelectedService={setSelectedService} isMobile={false} />
        
        {/* CTA Button */}
        <SubmitButton isMobile={false} />
      </motion.form>
    </motion.div>;
});
HeroForm.displayName = "HeroForm";
