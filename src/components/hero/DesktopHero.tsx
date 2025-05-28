
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const benefits = ["Liability insurance included", "Simple online booking", "Professional cleaners", "Satisfaction guaranteed"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <div className="w-full space-y-4">
      {/* Hero Text Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center max-w-5xl mx-auto mb-6"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900"
        >
          Book your cleaning service{" "}
          <span className="text-primary">online</span>
        </motion.h1>

        {/* Benefits List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          className="grid grid-cols-2 gap-3 mb-6 max-w-2xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 justify-center"
            >
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Full-width form section with background */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.5 }} 
        className="w-full relative"
      >
        {/* Background with subtle pattern and color */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-3xl opacity-60"></div>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl"></div>
        
        {/* Floating animation element */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 right-8 text-primary/30 hidden lg:block"
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>

        {/* Form container */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Location */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="postal-code" className="text-base font-bold text-gray-900 tracking-wide">
                Location
              </Label>
              <Input
                id="postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                required
              />
            </motion.div>

            {/* Property Size */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="property-size" className="text-base font-bold text-gray-900 tracking-wide">
                Property Size
              </Label>
              <Select>
                <SelectTrigger 
                  id="property-size"
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                >
                  <SelectValue placeholder="Select size (m²)" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                  <SelectItem value="30-50">30-50 m²</SelectItem>
                  <SelectItem value="51-80">51-80 m²</SelectItem>
                  <SelectItem value="81-120">81-120 m²</SelectItem>
                  <SelectItem value="121-160">121-160 m²</SelectItem>
                  <SelectItem value="161-200">161-200 m²</SelectItem>
                  <SelectItem value="201-250">201-250 m²</SelectItem>
                  <SelectItem value="251-300">251-300 m²</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Date */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="cleaning-date" className="text-base font-bold text-gray-900 tracking-wide">
                Preferred Date
              </Label>
              <Input
                id="cleaning-date"
                type="date"
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                min={new Date().toISOString().split('T')[0]}
              />
            </motion.div>

            {/* Service Type */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="service-type" className="text-base font-bold text-gray-900 tracking-wide">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="service-type"
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 hover:border-gray-300 text-base font-medium"
                >
                  <SelectValue placeholder="Select service" />
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
            <div className="flex items-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Let's Go <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
