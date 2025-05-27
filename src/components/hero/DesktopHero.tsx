
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Home, Ruler, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  const benefits = [
    "Liability insurance included",
    "Simple online booking",
    "Professional cleaners",
    "Satisfaction guaranteed"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <div className="w-full space-y-6">
      {/* Hero Text Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center max-w-5xl mx-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900"
        >
          Book your cleaning service{" "}
          <span className="text-orange-600">online</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto"
        >
          Professional house cleaning with transparent pricing and guaranteed satisfaction. Book in just 2 minutes.
        </motion.p>

        {/* Benefits List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-4 max-w-2xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{benefit}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Integrated Booking Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
          {/* Postal Code */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-600 z-10" />
            <Input
              type="text"
              placeholder="Enter your city or postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="pl-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400"
              required
            />
          </div>

          {/* Property Size */}
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-600 z-10" />
            <Select>
              <SelectTrigger className="pl-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400">
                <SelectValue placeholder="Property size (m²)" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <SelectItem value="30-50">30-50 m²</SelectItem>
                <SelectItem value="51-80">51-80 m²</SelectItem>
                <SelectItem value="81-120">81-120 m²</SelectItem>
                <SelectItem value="121-160">121-160 m²</SelectItem>
                <SelectItem value="161-200">161-200 m²</SelectItem>
                <SelectItem value="201-250">201-250 m²</SelectItem>
                <SelectItem value="251-300">251-300 m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-600 z-10" />
            <Input
              type="date"
              placeholder="Select date"
              className="pl-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Service Type */}
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-600 z-10" />
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="pl-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors hover:border-gray-400">
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
            className="px-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Let's Go <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
