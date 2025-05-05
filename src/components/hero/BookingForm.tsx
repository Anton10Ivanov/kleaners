
import { memo } from "react";
import { motion } from "framer-motion";
import { useHero } from "./HeroContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

  const isDesktop = layout === "desktop";
  
  // Use consistent container styling with appropriate spacing based on layout
  const containerClassName = isDesktop
    ? "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg max-w-3xl mx-auto"
    : "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg";

  return (
    <motion.div
      className={containerClassName}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={`grid ${isDesktop ? 'grid-cols-12 gap-5' : 'grid-cols-1 gap-4'}`}>
          {/* Service Type - Takes 5/12 of space on desktop */}
          <div className={`${isDesktop ? 'col-span-5' : 'col-span-full'}`}>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Type
            </label>
            <Select
              value={selectedService}
              onValueChange={handleServiceChange}
            >
              <SelectTrigger 
                id="service"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 h-12 rounded-lg text-gray-900 dark:text-white"
              >
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
          
          {/* Postal Code - Takes 4/12 of space on desktop */}
          <div className={`${isDesktop ? 'col-span-4' : 'col-span-full'}`}>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City or Postal Code
            </label>
            <Input
              type="text"
              id="postal-code"
              placeholder="e.g., Berlin or 10115"
              value={postalCode}
              onChange={(e) => handlePostalCodeChange(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 h-12 text-gray-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>
          
          {/* Button - Takes 3/12 of space on desktop, same height as inputs */}
          <div className={`${isDesktop ? 'col-span-3 flex items-end' : 'col-span-full mt-1'}`}>
            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-600 hover:bg-orange-500 text-white px-5 py-0 rounded-xl flex items-center justify-center shadow-[0_8px_15px_rgba(251,146,60,0.2)] hover:shadow-[0_8px_15px_rgba(251,146,60,0.4)] transform hover:-translate-y-0.5 transition-all"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
});

BookingForm.displayName = "BookingForm";
