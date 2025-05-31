
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

interface DesktopHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const DesktopHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: DesktopHeroProps) => {
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
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="text-5xl xl:text-6xl font-black leading-tight text-gray-900 font-['Inter']"
          >
            Book your cleaning service{" "}
            <span className="text-primary font-extrabold">online</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-lg font-medium"
          >
            Professional house cleaning with transparent pricing and guaranteed satisfaction.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 max-w-lg"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Booking Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }} 
          className="relative"
        >
          {/* Enhanced background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30 rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-100/50"></div>

          {/* Form container */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 lg:p-12">
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {/* Location */}
              <motion.div 
                className="space-y-3"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="desktop-postal-code" className="text-xl font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Your Location
                </Label>
                <Input
                  id="desktop-postal-code"
                  type="text"
                  placeholder="Enter your city or postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                  required
                />
              </motion.div>

              {/* Service Type with tooltips */}
              <motion.div 
                className="space-y-3"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="desktop-service-type" className="text-xl font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Service Type
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger 
                    id="desktop-service-type"
                    className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                  >
                    <SelectValue placeholder="Select cleaning service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                    <SelectItem value={ServiceType.Home} className="cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-blue-600" />
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">Home Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Weekly, bi-weekly or monthly cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.DeepCleaning} className="cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-green-600" />
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">Deep Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Thorough one-time cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.MoveInOut} className="cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-purple-600" />
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">Move In/Out</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Moving preparation cleaning</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceType.Office} className="cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-orange-600" />
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">Office Cleaning</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
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
                className="space-y-3"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="desktop-property-size" className="text-xl font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                  Property Size (m²)
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={decrementSize}
                    className="h-16 w-16 rounded-xl border-2 border-gray-200 hover:border-primary text-lg"
                  >
                    -
                  </Button>
                  <Input
                    id="desktop-property-size"
                    type="number"
                    value={propertySize}
                    onChange={(e) => setPropertySize(Number(e.target.value))}
                    className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-center text-lg font-medium flex-1"
                    min="20"
                    max="200"
                    step="5"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={incrementSize}
                    className="h-16 w-16 rounded-xl border-2 border-gray-200 hover:border-primary text-lg"
                  >
                    +
                  </Button>
                </div>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-xl rounded-xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 mt-8 border-2 border-primary/20"
                >
                  Let's Go <ArrowRight className="h-6 w-6" />
                </Button>
              </motion.div>

              <p className="text-sm text-gray-500 text-center mt-6 font-medium">
                Free quote • No commitment • Instant booking
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
});

DesktopHero.displayName = "DesktopHero";
