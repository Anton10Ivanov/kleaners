import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceType } from "@/schemas/booking";
import { getBookingRoute } from "@/utils/serviceRouteMapping";

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
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.4 }} 
        className="w-full bg-white rounded-xl shadow-lg border border-gray-200/50 p-4"
      >
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="mobile-postal-code" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
              Your Location
            </Label>
            <Input
              id="mobile-postal-code"
              type="text"
              placeholder="Enter your city or postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="h-12 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium"
              required
            />
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="mobile-service-type" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
              Service Type
            </Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger 
                id="mobile-service-type"
                className="h-12 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium"
              >
                <SelectValue placeholder="Select cleaning service" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50">
                <SelectItem value={ServiceType.Home} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 mt-6"
            >
              Get Instant Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <p className="text-xs text-gray-500 text-center mt-4 font-medium">
            Direct price estimation on final step • No commitment
          </p>
        </motion.form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-lg"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/20 p-8 backdrop-blur-sm">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {/* Location */}
          <div className="space-y-3">
            <Label htmlFor="desktop-postal-code" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
              Your Location
            </Label>
            <Input 
              id="desktop-postal-code" 
              type="text" 
              placeholder="Enter your city or postal code" 
              value={postalCode} 
              onChange={e => setPostalCode(e.target.value)} 
              className="h-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium" 
              required 
            />
          </div>

          {/* Service Type */}
          <div className="space-y-3">
            <Label htmlFor="desktop-service-type" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
              Service Type
            </Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger 
                id="desktop-service-type" 
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium"
              >
                <SelectValue placeholder="Select cleaning service" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                <SelectItem value={ServiceType.Home} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office} className="cursor-pointer">
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 border border-green-500" 
              style={{
                textShadow: '0 0 1px rgba(34, 197, 94, 0.8)',
                boxShadow: '0 0 0 1px rgba(34, 197, 94, 0.3), 0 8px 15px rgba(126,188,230,0.2)'
              }}
            >
              Get Instant Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <p className="text-sm text-gray-500 text-center font-medium">
            Direct price estimation on final step • No commitment
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
});

HeroForm.displayName = "HeroForm";
