
import { memo } from "react";
import { motion } from "framer-motion";
import { useHero } from "./HeroContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Home } from "lucide-react";
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Where Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-orange-600" />
            <label className="text-sm font-semibold text-gray-900">
              Where should it be cleaned?
            </label>
          </div>
          <Input
            type="text"
            placeholder="Enter your city or postal code"
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
            required
          />
        </div>

        {/* What Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-orange-600" />
            <label className="text-sm font-semibold text-gray-900">
              What should be cleaned?
            </label>
          </div>
          <Select
            value={selectedService}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors">
              <SelectValue placeholder="Select cleaning service" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <SelectItem value="regular" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Regular Cleaning</div>
                  <div className="text-sm text-gray-500">Weekly, bi-weekly or monthly</div>
                </div>
              </SelectItem>
              <SelectItem value="deep" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Deep Cleaning</div>
                  <div className="text-sm text-gray-500">Thorough one-time cleaning</div>
                </div>
              </SelectItem>
              <SelectItem value="move" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Move In/Out</div>
                  <div className="text-sm text-gray-500">Moving preparation cleaning</div>
                </div>
              </SelectItem>
              <SelectItem value="business" className="cursor-pointer hover:bg-gray-50 px-4 py-3">
                <div>
                  <div className="font-medium">Business Cleaning</div>
                  <div className="text-sm text-gray-500">Office and commercial spaces</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* CTA Button */}
        <Button 
          type="submit" 
          className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Let's Go <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Free quote • No commitment • Instant booking
        </p>
      </form>
    </motion.div>
  );
});

BookingForm.displayName = "BookingForm";
