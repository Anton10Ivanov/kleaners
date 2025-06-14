
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
        className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
      >
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* Location Input */}
          <div className="space-y-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter your location"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="h-14 pl-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-base font-medium"
                required
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-base font-medium">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Choose cleaning service" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                <SelectItem value={ServiceType.Home}>
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning}>
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut}>
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office}>
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Get Instant Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <p className="text-sm text-gray-500 text-center font-medium">
            No commitment • Free quotes • Instant booking
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
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {/* Form Header */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Get Your Quote</h3>
            <p className="text-sm text-gray-600">Quick • Easy • Free</p>
          </div>

          {/* Location Input */}
          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Enter your location" 
                value={postalCode} 
                onChange={e => setPostalCode(e.target.value)} 
                className="h-14 pl-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-base font-medium" 
                required 
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-3">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-base font-medium">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Choose cleaning service" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                <SelectItem value={ServiceType.Home}>
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning}>
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut}>
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office}>
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1" 
            >
              Get Instant Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <p className="text-sm text-gray-500 text-center font-medium">
            No commitment • Free quotes • Instant booking
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
});

HeroForm.displayName = "HeroForm";
