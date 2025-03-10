
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeatureBadges } from "./FeatureBadges";
import { BookingForm } from "./BookingForm";

interface MobileHeroProps {
  selectedService: string;
  handleServiceChange: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNext: () => void;
}

export const MobileHero = ({
  selectedService,
  handleServiceChange,
  postalCode,
  setPostalCode,
  handleNext
}: MobileHeroProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 py-6 relative">
      {/* Background image with refined gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: "url('/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png')",
            backgroundSize: "contain",
            backgroundPosition: "center 25%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full text-center mb-1"
      >
        {/* Customer social proof with more subtle styling */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex -space-x-2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="Customer" />
            <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="Customer" />
            <img src="https://randomuser.me/api/portraits/women/24.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="Customer" />
          </div>
          <span className="text-xs text-gray-500">Trusted by 2,300+ customers</span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="text-3xl md:text-4xl font-bold leading-tight text-zinc-800 mb-3"
        >
          Book your cleaning in 2 minutes
        </motion.h1>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
          Professional local cleaners with transparent, fair pricing
        </p>
      </motion.div>
      
      <div className="w-full mb-2 relative z-10">
        <FeatureBadges />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="w-full relative z-10 px-1"
      >
        <div className="backdrop-blur-xl p-5 border border-white/30 shadow-lg transition-all duration-300 bg-white/90 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Service Type</label>
              <Select value={selectedService} onValueChange={handleServiceChange} defaultValue="regular">
                <SelectTrigger className="w-full bg-white dark:bg-gray-800/90 font-medium h-12 rounded-xl ring-offset-0 focus:ring-primary border-gray-200 dark:border-gray-700 shadow-sm">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <SelectItem value="regular" className="py-3">Regular Cleaning</SelectItem>
                  <SelectItem value="moveInOut" className="py-3">Move In/Out Cleaning</SelectItem>
                  <SelectItem value="business" className="py-3">Business Cleaning</SelectItem>
                  <SelectItem value="construction" className="py-3">Post-Construction Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Your Location</label>
              <Input 
                type="text" 
                placeholder="City or Area code" 
                value={postalCode} 
                onChange={e => setPostalCode(e.target.value)} 
                className="bg-white dark:bg-white-800/90 font-regular h-12 border-gray-200 dark:border-blue-300 ring-offset-0 focus:ring-primary shadow-sm rounded-xl" 
              />
            </div>
            
            <Button 
              onClick={handleNext} 
              className="bg-primary hover:bg-primary/90 w-full shadow-[0_8px_30px_rgba(126,188,230,0.3)] hover:shadow-[0_8px_30px_rgba(126,188,230,0.5)] transition-all font-semibold h-12 rounded-xl text-white text-center mt-2"
            >
              Get Your Price <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
