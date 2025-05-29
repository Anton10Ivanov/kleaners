
import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, CreditCard, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustBadges } from "./TrustBadges";
import { HeroTestimonials } from "./HeroTestimonials";

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
    { icon: Shield, text: "Liability insurance up to 5M€ included" },
    { icon: CreditCard, text: "Payment after work completion" },
    { icon: UserCheck, text: "Customer protection program" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <div className="w-full space-y-6">
      {/* Hero Text Section with reduced spacing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center max-w-6xl mx-auto mb-8"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-gray-900 font-['Inter']"
        >
          Book your cleaning service{" "}
          <span className="text-primary font-extrabold">online</span>
        </motion.h1>

        {/* Benefits List aligned with "Book" text and increased font size */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          className="flex flex-col gap-2 mb-8 max-w-6xl text-left"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 justify-start text-left"
            >
              <benefit.icon className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-gray-600 font-medium text-[15px]">{benefit.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <TrustBadges />
      </motion.div>

      {/* Enhanced form section with better visual connection */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.5 }} 
        className="w-full relative"
      >
        {/* Full-width background section */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50/50 to-white rounded-3xl shadow-2xl"></div>
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-100/50"></div>
        
        {/* Form container with prominent styling */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-10 max-w-6xl mx-auto backdrop-blur-sm">
          <motion.form 
            onSubmit={handleSubmit} 
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {/* Location with enhanced typography */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="postal-code" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Location
              </Label>
              <Input
                id="postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                required
              />
            </motion.div>

            {/* Property Size with enhanced typography */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="property-size" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Property Size
              </Label>
              <Select>
                <SelectTrigger 
                  id="property-size"
                  className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
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

            {/* Date with enhanced typography */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="cleaning-date" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Preferred Date
              </Label>
              <Input
                id="cleaning-date"
                type="date"
                className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
                min={new Date().toISOString().split('T')[0]}
              />
            </motion.div>

            {/* Service Type with enhanced typography */}
            <motion.div 
              className="space-y-4"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="service-type" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="service-type"
                  className="h-16 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-lg font-medium hover:shadow-md focus:shadow-lg"
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
            
            {/* Enhanced CTA Button with bold styling */}
            <div className="flex items-end">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-xl rounded-xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20"
                >
                  Let's Go <ArrowRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Testimonials Carousel placed below the booking form */}
      <HeroTestimonials />
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
