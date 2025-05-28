
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
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
          <span className="text-primary">online</span>
        </motion.h1>

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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Location */}
            <div className="space-y-3">
              <Label htmlFor="postal-code" className="text-sm font-semibold text-gray-800">
                Location
              </Label>
              <Input
                id="postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
                required
              />
            </div>

            {/* Property Size */}
            <div className="space-y-3">
              <Label htmlFor="property-size" className="text-sm font-semibold text-gray-800">
                Property Size
              </Label>
              <Select>
                <SelectTrigger 
                  id="property-size"
                  className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
                >
                  <SelectValue placeholder="Select size (m²)" />
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
            <div className="space-y-3">
              <Label htmlFor="cleaning-date" className="text-sm font-semibold text-gray-800">
                Preferred Date
              </Label>
              <Input
                id="cleaning-date"
                type="date"
                className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Service Type */}
            <div className="space-y-3">
              <Label htmlFor="service-type" className="text-sm font-semibold text-gray-800">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="service-type"
                  className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
                >
                  <SelectValue placeholder="Select service" />
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
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Let's Go <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
