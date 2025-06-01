
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceType } from "@/types/enums";

interface MobileHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const MobileHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: MobileHeroProps) => {

  const benefits = [
    "Liability insurance",
    "Simple booking",
    "Professional cleaners",
    "Satisfaction guaranteed"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto flex flex-col items-center gap-3 py-3 text-center"
    >
      {/* Hero Text with improved mobile typography */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }} 
        className="text-2xl md:text-4xl font-black leading-tight text-gray-900 mb-2 font-['Inter']"
      >
        Book your cleaning service{" "}
        <span className="text-primary font-extrabold">online</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="text-sm text-gray-600 font-medium mb-2"
      >
        Get instant price quote in 3 easy steps
      </motion.p>

      {/* Benefits List with improved mobile spacing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 gap-2 mb-4 max-w-sm mx-auto"
      >
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-2 text-left"
          >
            <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
            <span className="text-xs text-gray-700 font-semibold">{benefit}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Form container with mobile-optimized styling */}
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
          {/* Location with mobile optimization */}
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
          
          {/* Enhanced CTA Button with mobile optimization */}
          <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
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

      {/* Step Indicators for Mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center items-center gap-2 mt-4"
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
          <span className="text-xs text-gray-600 font-medium">Info</span>
        </div>
        <ArrowRight className="h-3 w-3 text-gray-400" />
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
          <span className="text-xs text-gray-600 font-medium">Details</span>
        </div>
        <ArrowRight className="h-3 w-3 text-gray-400" />
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
          <span className="text-xs text-gray-600 font-medium">Price</span>
        </div>
      </motion.div>
    </motion.div>
  );
});

MobileHero.displayName = "MobileHero";
