
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
    <section className="relative w-full py-16 bg-gray-50">
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
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your instant quote</h2>
            <p className="text-gray-600">Fill out the form below to receive your personalized cleaning quote</p>
          </div>
          
          <BookingForm 
            layout="full-width"
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNextStep={handleNextStep}
          />
        </motion.div>
      </div>
    </section>
  );
});

BookingSection.displayName = "BookingSection";
