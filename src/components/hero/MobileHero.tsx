
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
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
      className="w-full max-w-md mx-auto flex flex-col items-center gap-4 py-4 text-center"
    >
      {/* Hero Text with improved typography */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }} 
        className="text-3xl md:text-4xl font-black leading-tight text-gray-900 mb-3 font-['Inter']"
      >
        Book your cleaning service{" "}
        <span className="text-primary font-extrabold">online</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600 mb-4 max-w-md mx-auto font-medium"
      >
        Professional house cleaning with transparent pricing and guaranteed satisfaction.
      </motion.p>

      {/* Benefits List with improved spacing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto"
      >
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-2 text-left"
          >
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-semibold">{benefit}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Enhanced form section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.4 }} 
        className="w-full relative"
      >
        {/* Enhanced background with warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30 rounded-2xl"></div>
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100/50"></div>

        {/* Form container with improved styling */}
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-8">
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {/* Location with enhanced typography */}
            <motion.div 
              className="space-y-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="mobile-postal-code" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Your Location
              </Label>
              <Input
                id="mobile-postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                required
              />
            </motion.div>

            {/* Service Type with enhanced typography */}
            <motion.div 
              className="space-y-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="mobile-service-type" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="mobile-service-type"
                  className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                >
                  <SelectValue placeholder="Select cleaning service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                  <SelectItem value={ServiceType.Home}>
                    <div>
                      <div className="font-semibold">Home Cleaning</div>
                      <div className="text-sm text-gray-500">Weekly, bi-weekly or monthly</div>
                    </div>
                  </SelectItem>
                  <SelectItem value={ServiceType.DeepCleaning}>
                    <div>
                      <div className="font-semibold">Deep Cleaning</div>
                      <div className="text-sm text-gray-500">Thorough one-time cleaning</div>
                    </div>
                  </SelectItem>
                  <SelectItem value={ServiceType.MoveInOut}>
                    <div>
                      <div className="font-semibold">Move In/Out</div>
                      <div className="text-sm text-gray-500">Moving preparation cleaning</div>
                    </div>
                  </SelectItem>
                  <SelectItem value={ServiceType.Office}>
                    <div>
                      <div className="font-semibold">Office Cleaning</div>
                      <div className="text-sm text-gray-500">Office and commercial spaces</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            {/* Enhanced CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
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
    </motion.div>
  );
});

MobileHero.displayName = "MobileHero";
