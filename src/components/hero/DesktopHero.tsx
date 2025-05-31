import { memo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceType } from "@/types/enums";
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
  const benefits = ["Liability insurance", "Simple booking", "Professional cleaners", "Satisfaction guaranteed"];
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
  return <div className="flex flex-col items-center text-center space-y-12">
      {/* Hero Content */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} className="space-y-8 max-w-4xl mx-auto">
        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-5xl xl:text-6xl font-black leading-tight text-gray-900 font-['Inter']">
          Book your cleaning service{" "}
          <span className="text-primary font-extrabold">online</span>
        </motion.h1>
        
        

        {/* Benefits Grid */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.1
        }} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">{benefit}</span>
            </motion.div>)}
        </motion.div>
      </motion.div>

      {/* Horizontal Booking Form */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.6
    }} className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-6 lg:p-8">
          <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.4,
          delay: 0.8
        }}>
            {/* Location */}
            <div className="space-y-3">
              <Label htmlFor="desktop-postal-code" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Your Location
              </Label>
              <Input id="desktop-postal-code" type="text" placeholder="Enter your city or postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="h-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium" required />
            </div>

            {/* Service Type */}
            <div className="space-y-3">
              <Label htmlFor="desktop-service-type" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Service Type
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger id="desktop-service-type" className="h-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 hover:border-gray-300 text-base font-medium">
                  <SelectValue placeholder="Select cleaning service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                  <SelectItem value={ServiceType.Home} className="cursor-pointer">
                    <span className="font-semibold text-gray-800">Home Cleaning</span>
                  </SelectItem>
                  <SelectItem value={ServiceType.DeepCleaning} className="cursor-pointer">
                    <span className="font-semibold text-gray-800">Deep Cleaning</span>
                  </SelectItem>
                  <SelectItem value={ServiceType.MoveInOut} className="cursor-pointer">
                    <span className="font-semibold text-gray-800">Move In/Out</span>
                  </SelectItem>
                  <SelectItem value={ServiceType.Office} className="cursor-pointer">
                    <span className="font-semibold text-gray-800">Office Cleaning</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Size Field - No arrows */}
            <div className="space-y-3">
              <Label htmlFor="desktop-property-size" className="text-lg font-bold text-gray-900 tracking-wide font-['Open_Sans']">
                Property Size (m²)
              </Label>
              <Input id="desktop-property-size" type="number" value={propertySize} onChange={e => setPropertySize(Number(e.target.value))} className="h-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-center text-base font-medium" min="20" max="200" step="5" />
            </div>
            
            {/* CTA Button with green border */}
            <motion.div whileHover={{
            scale: 1.02,
            y: -2
          }} whileTap={{
            scale: 0.98
          }}>
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 border border-green-500" style={{
              textShadow: '0 0 1px rgba(34, 197, 94, 0.8)',
              boxShadow: '0 0 0 1px rgba(34, 197, 94, 0.3), 0 8px 15px rgba(126,188,230,0.2)'
            }}>
                Let's Go <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.form>

          <p className="text-sm text-gray-500 text-center mt-6 font-medium">
            Free quote • No commitment • Instant booking
          </p>
        </div>
      </motion.div>
    </div>;
});
DesktopHero.displayName = "DesktopHero";