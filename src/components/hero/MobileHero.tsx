
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
      className="w-full max-w-md mx-auto flex flex-col items-center gap-4 py-2 text-center"
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
        className="text-lg text-gray-600 mb-2 max-w-md mx-auto"
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
          <div key={index} className="flex items-center gap-2 text-left">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">{benefit}</span>
          </div>
        ))}
      </motion.div>
      
      {/* Booking Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.4 }} 
        className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="mobile-postal-code" className="text-sm font-medium text-gray-700">
              Your Location
            </Label>
            <Input
              id="mobile-postal-code"
              type="text"
              placeholder="Enter your city or postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors hover:border-gray-400"
              required
            />
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="mobile-service-type" className="text-sm font-medium text-gray-700">
              Service Type
            </Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger 
                id="mobile-service-type"
                className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors hover:border-gray-400"
              >
                <SelectValue placeholder="Select cleaning service" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <SelectItem value="regular">
                  <div>
                    <div className="font-medium">Regular Cleaning</div>
                    <div className="text-sm text-gray-500">Weekly, bi-weekly or monthly</div>
                  </div>
                </SelectItem>
                <SelectItem value="deep">
                  <div>
                    <div className="font-medium">Deep Cleaning</div>
                    <div className="text-sm text-gray-500">Thorough one-time cleaning</div>
                  </div>
                </SelectItem>
                <SelectItem value="move">
                  <div>
                    <div className="font-medium">Move In/Out</div>
                    <div className="text-sm text-gray-500">Moving preparation cleaning</div>
                  </div>
                </SelectItem>
                <SelectItem value="business">
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
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Let's Go <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Free quote • No commitment • Instant booking
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
});

MobileHero.displayName = "MobileHero";
