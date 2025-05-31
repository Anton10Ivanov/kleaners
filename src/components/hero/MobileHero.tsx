
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, Building, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [propertySize, setPropertySize] = useState(70);

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

  const incrementSize = () => {
    setPropertySize(prev => Math.min(prev + 5, 200));
  };

  const decrementSize = () => {
    setPropertySize(prev => Math.max(prev - 5, 20));
  };

  return (
    <TooltipProvider>
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
          className="text-base text-gray-600 mb-3 max-w-md mx-auto font-medium"
        >
          Professional house cleaning with transparent pricing and guaranteed satisfaction.
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
        
        {/* Enhanced form section with mobile optimization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          className="w-full relative"
        >
          {/* Enhanced background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30 rounded-xl"></div>
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100/50"></div>

          {/* Form container with mobile-optimized styling */}
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 md:p-8">
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {/* Location with mobile optimization */}
              <motion.div 
                className="space-y-2"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="mobile-postal-code" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Your Location
                </Label>
                <Input
                  id="mobile-postal-code"
                  type="text"
                  placeholder="Enter your city or postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="h-12 md:h-16 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium hover:shadow-md focus:shadow-lg"
                  required
                />
              </motion.div>

              {/* Service Type with tooltips */}
              <motion.div 
                className="space-y-2"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="mobile-service-type" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Service Type
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    id="mobile-service-type"
                    className="h-12 md:h-16 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium hover:shadow-md focus:shadow-lg"
                  >
                    <SelectValue placeholder="Select cleaning service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50">
                    <SelectItem value={ServiceType.Home} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-800">Home Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Weekly, bi-weekly or monthly cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.DeepCleaning} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-green-600" />
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-800">Deep Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Thorough one-time cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.MoveInOut} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-600" />
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-800">Move In/Out</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Moving preparation cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.Office} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-orange-600" />
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-800">Office Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Office and commercial spaces</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Property Size Field */}
              <motion.div 
                className="space-y-2"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="mobile-property-size" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Property Size (m²)
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={decrementSize}
                    className="h-12 w-12 rounded-lg border-2 border-gray-200 hover:border-primary"
                  >
                    -
                  </Button>
                  <Input
                    id="mobile-property-size"
                    type="number"
                    value={propertySize}
                    onChange={(e) => setPropertySize(Number(e.target.value))}
                    className="h-12 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-center text-base font-medium flex-1"
                    min="20"
                    max="200"
                    step="5"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={incrementSize}
                    className="h-12 w-12 rounded-lg border-2 border-gray-200 hover:border-primary"
                  >
                    +
                  </Button>
                </div>
              </motion.div>
              
              {/* Enhanced CTA Button with mobile optimization */}
              <motion.div
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 md:h-16 bg-primary hover:bg-primary/90 text-white font-black text-lg md:text-xl rounded-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 mt-6 border-2 border-primary/20"
                >
                  Let's Go <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>

              <p className="text-xs text-gray-500 text-center mt-4 font-medium">
                Free quote • No commitment • Instant booking
              </p>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
});

MobileHero.displayName = "MobileHero";
