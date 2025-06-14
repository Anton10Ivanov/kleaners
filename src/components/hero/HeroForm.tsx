
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
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} 
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} 
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "easeOut"
        }} 
        className="w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mt-8"
      >
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6" 
          initial={{
            opacity: 0
          }} 
          animate={{
            opacity: 1
          }} 
          transition={{
            duration: 0.6,
            delay: 0.7
          }}
        >
          {/* Enhanced form header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-gray-600">Quick • Easy • Free • No Commitment</p>
          </div>

          {/* Location Input with enhanced styling */}
          <div className="space-y-2">
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
              <Input 
                type="text" 
                placeholder="Enter your location" 
                value={postalCode} 
                onChange={e => setPostalCode(e.target.value)} 
                className="h-16 pl-12 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md" 
                required 
              />
            </div>
          </div>

          {/* Service Type with enhanced styling */}
          <div className="space-y-2">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-16 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Choose cleaning service" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-2xl z-50">
                <SelectItem value={ServiceType.Home} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Enhanced CTA Button with better animations */}
          <motion.div 
            whileHover={{
              scale: 1.02,
              y: -2
            }} 
            whileTap={{
              scale: 0.98
            }} 
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <Button 
              type="submit" 
              className="w-full h-16 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Get Instant Quote 
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
      initial={{
        opacity: 0,
        y: 30
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.8,
        delay: 0.7,
        ease: "easeOut"
      }} 
      className="w-full max-w-lg mt-0 backdrop-blur-sm shadow-2xl border border-white/20 p-10 px-[19px] py-[13px] bg-transparent rounded-none"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-8" 
        initial={{
          opacity: 0
        }} 
        animate={{
          opacity: 1
        }} 
        transition={{
          duration: 0.6,
          delay: 0.9
        }}
      >
        {/* Location Input with enhanced styling */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white-700 mb-2">
            Your Postal code
          </label>
          <div className="relative group w-[70%]">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
            <Input 
              type="text" 
              placeholder="Enter your location" 
              value={postalCode} 
              onChange={e => setPostalCode(e.target.value)} 
              required 
              className="h-16 pl-12 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md px-[44px] w-full" 
            />
          </div>
        </div>

        {/* Service Type with enhanced styling */}
        <div className="space-y-3">
          <div className="w-[70%]">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="h-16 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md w-full">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Choose cleaning service" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-2xl z-50">
                <SelectItem value={ServiceType.Home} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Home Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.DeepCleaning} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Deep Cleaning</span>
                </SelectItem>
                <SelectItem value={ServiceType.MoveInOut} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Move In/Out</span>
                </SelectItem>
                <SelectItem value={ServiceType.Office} className="text-base font-medium py-3">
                  <span className="font-semibold text-gray-800">Office Cleaning</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Enhanced CTA Button with better animations */}
        <motion.div 
          whileHover={{
            scale: 1.02,
            y: -2
          }} 
          whileTap={{
            scale: 0.98
          }} 
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }} 
          className="w-[70%]"
        >
          <Button 
            type="submit" 
            className="w-full h-16 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 group"
          >
            Get Instant Quote 
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
});

HeroForm.displayName = "HeroForm";
