
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
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
      className="w-full max-w-md mx-auto flex flex-col items-center gap-3 py-2 text-center"
    >
      {/* Hero Text */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }} 
        className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 mb-2"
      >
        Book your cleaning service{" "}
        <span className="text-primary">online</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600 mb-3 max-w-md mx-auto"
      >
        Professional house cleaning with transparent pricing and guaranteed satisfaction.
      </motion.p>

      {/* Benefits List */}
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
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">{benefit}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Full-width form section with background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.4 }} 
        className="w-full relative"
      >
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl opacity-60"></div>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl"></div>
        
        {/* Floating animation element */}
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3 right-4 text-primary/20"
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        {/* Form container */}
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <motion.div 
              className="space-y-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="mobile-postal-code" className="text-base font-bold text-gray-900 tracking-wide">
                Your Location
              </Label>
              <Input
                id="mobile-postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                required
              />
            </motion.div>

            {/* Service Type */}
            <motion.div 
              className="space-y-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="mobile-service-type" className="text-base font-bold text-gray-900 tracking-wide">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="mobile-service-type"
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                >
                  <SelectValue placeholder="Select cleaning service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                  <SelectItem value="regular">
                    <div>
                      <div className="font-semibold">Regular Cleaning</div>
                      <div className="text-sm text-gray-500">Weekly, bi-weekly or monthly</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="deep">
                    <div>
                      <div className="font-semibold">Deep Cleaning</div>
                      <div className="text-sm text-gray-500">Thorough one-time cleaning</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="move">
                    <div>
                      <div className="font-semibold">Move In/Out</div>
                      <div className="text-sm text-gray-500">Moving preparation cleaning</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="business">
                    <div>
                      <div className="font-semibold">Business Cleaning</div>
                      <div className="text-sm text-gray-500">Office and commercial spaces</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 mt-6"
              >
                Let's Go <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Free quote • No commitment • Instant booking
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

MobileHero.displayName = "MobileHero";
