
import { memo } from "react";
import { motion } from "framer-motion";
import { BookingForm } from "./BookingForm";

interface BookingSectionProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const BookingSection = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: BookingSectionProps) => {
  return (
    <motion.section 
      className="relative w-full py-8 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/lovable-uploads/opciya1 (1) 2.png')",
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-white/60"></div>
      </div>
      
      {/* Full-width form - no container restrictions */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-12">
        <BookingForm 
          layout="full-width"
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          handleNextStep={handleNextStep}
        />
      </div>
    </motion.section>
  );
});

BookingSection.displayName = "BookingSection";
