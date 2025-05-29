
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <div className="w-full space-y-4">
      {/* Hero Text Section with reduced spacing */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center max-w-6xl mx-auto mb-6"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="text-4xl lg:text-6xl font-black leading-tight mb-4 text-gray-900 font-['Inter']"
        >
          Book your cleaning service{" "}
          <span className="text-primary font-extrabold">online</span>
        </motion.h1>

        {/* Trust Badges */}
        <TrustBadges />
      </motion.div>

      {/* Trust Stats positioned above form and aligned right */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }} 
        className="flex justify-end mb-3"
      >
        <div className="flex items-center justify-end gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-semibold">4.9/5</span>
            <span>Average Rating</span>
          </div>
          <div className="h-3 w-px bg-gray-300"></div>
          <div>
            <span className="font-semibold">2,500+</span>
            <span> Happy Customers</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced form section with optimized spacing */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.5 }} 
        className="w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-4 backdrop-blur-sm">
          <motion.form 
            onSubmit={handleSubmit} 
            className="grid grid-cols-1 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {/* Location with enhanced typography */}
            <motion.div 
              className="space-y-2"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="postal-code" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Location
              </Label>
              <Input
                id="postal-code"
                type="text"
                placeholder="Enter your city or postal code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium hover:shadow-md focus:shadow-lg"
                required
              />
            </motion.div>

            {/* Service Type with enhanced typography */}
            <motion.div 
              className="space-y-2"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="service-type" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger 
                  id="service-type"
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium hover:shadow-md focus:shadow-lg"
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

            {/* Property Size with enhanced typography */}
            <motion.div 
              className="space-y-2"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="property-size" className="text-base font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Property Size
              </Label>
              <Select>
                <SelectTrigger 
                  id="property-size"
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium hover:shadow-md focus:shadow-lg"
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
            
            {/* Enhanced CTA Button with bold styling */}
            <div className="flex items-end">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20"
                >
                  Let's Go <ArrowRight className="h-5 w-5" />
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
