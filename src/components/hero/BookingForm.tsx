
import { memo } from "react";
import { motion } from "framer-motion";
import { useHero } from "./HeroContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  } = useHero();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  const containerClassName = layout === "desktop"
    ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
    : "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg";

  return (
    <motion.div
      className={containerClassName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-subtext dark:text-gray-300 mb-1">
            Service Type
          </label>
          <Select
            value={selectedService}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 h-11 rounded-lg text-gray-900 dark:text-white">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <SelectItem value="regular" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Regular Cleaning</SelectItem>
              <SelectItem value="deep" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Deep Cleaning</SelectItem>
              <SelectItem value="move" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Move In/Out</SelectItem>
              <SelectItem value="business" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Business Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="postal-code" className="block text-sm font-medium text-subtext dark:text-gray-300 mb-1">
            City or Postal Code
          </label>
          <Input
            type="text"
            id="postal-code"
            placeholder="e.g., Berlin or 10115"
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 h-11 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-theme-cta hover:bg-theme-cta/90 dark:bg-theme-cta dark:hover:bg-theme-cta/80 text-white font-medium py-2.5 h-12 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
});

BookingForm.displayName = "BookingForm";
