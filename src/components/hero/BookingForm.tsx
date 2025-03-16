
import { memo, useContext } from "react";
import { motion } from "framer-motion";
import { HeroContext } from "./HeroContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SocialProof } from "./SocialProof";

interface BookingFormProps {
  layout: "desktop" | "mobile";
}

export const BookingForm = memo(({ layout }: BookingFormProps) => {
  const {
    selectedService,
    postalCode,
    handleServiceChange,
    handlePostalCodeChange,
    handleNextStep
  } = useContext(HeroContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  const containerClassName = layout === "desktop"
    ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg";

  return (
    <motion.div
      className={containerClassName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Type
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            required
          >
            <option value="" disabled>Select a service</option>
            <option value="regular">Regular Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="move">Move In/Out</option>
            <option value="business">Business Cleaning</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City or Postal Code
          </label>
          <input
            type="text"
            id="postal-code"
            placeholder="e.g., Berlin or 10115"
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white dark:text-white shadow-[0_8px_15px_rgba(126,188,230,0.2)] hover:shadow-[0_8px_15px_rgba(126,188,230,0.4)] rounded-lg py-2.5 transition-all duration-200 flex items-center justify-center"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
      
      {/* Social proof is now positioned below the form */}
      <div className="mt-4 flex justify-center">
        <SocialProof />
      </div>
    </motion.div>
  );
});

BookingForm.displayName = "BookingForm";
