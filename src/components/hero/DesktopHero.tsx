
import { motion } from "framer-motion";
import { FeatureList } from "./FeatureList";
import { BookingForm } from "./BookingForm";

interface DesktopHeroProps {
  selectedService: string;
  handleServiceChange: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNext: () => void;
}

export const DesktopHero = ({
  selectedService,
  handleServiceChange,
  postalCode,
  setPostalCode,
  handleNext
}: DesktopHeroProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 md:py-8">
      <div className="flex flex-col space-y-8 w-full md:w-1/2 order-2 md:order-1 px-0 mx-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-4xl sm:text-5xl leading-tight mb-4 text-left font-extrabold text-zinc-950 lg:text-5xl"
        >
          We provide transparent prices.
        </motion.h1>
        
        <div className="w-full">
          <FeatureList />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="w-full"
        >
          <BookingForm 
            selectedService={selectedService}
            handleServiceChange={handleServiceChange}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNext={handleNext}
            layout="desktop"
          />
        </motion.div>
      </div>
      
      <div className="w- md:w-1/2 order-1 md:order-2 mb-8 md:mb-0 flex justify-right md:justify-end">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="relative w-full md:w-auto"
        >
          <img 
            src="/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png" 
            alt="Professional Cleaning Service" 
            className="w-full h-auto object-contain md:max-w-[500px] mx-auto" 
          />
        </motion.div>
      </div>
    </div>
  );
};
