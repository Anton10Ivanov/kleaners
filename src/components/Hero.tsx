
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: "regular" | "moveInOut" | "business" | "construction") => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

const Hero = ({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: HeroProps) => {
  const navigate = useNavigate();
  
  const handleServiceChange = (value: string) => {
    setSelectedService(value as "regular" | "moveInOut" | "business" | "construction");
  };
  
  const handleNext = () => {
    if (!selectedService) {
      toast.error("Please select a service type");
      return;
    }
    if (!postalCode) {
      toast.error("Please enter your postal code");
      return;
    }
    handleNextStep();
  };
  
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 bg-gradient-to-b from-[#FEF7CD] to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              <span className="text-gradient-primary block">Expert Cleaning</span> Services
            </h1>
            <div className="space-y-6">
              <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                Book your professional cleaning service in 2 minutes:
              </p>
              <ul className="space-y-4">
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span>100% Satisfaction Guarantee</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Trusted & Background-Checked Cleaners</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Flexible Scheduling Options</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 shadow-2xl rounded-2xl max-w-xl mx-auto border border-gray-100 dark:border-gray-700 transition-all hover:shadow-primary/10 duration-300">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get Started</h2>
                <div className="relative">
                  <Select value={selectedService} onValueChange={handleServiceChange}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800 font-medium h-14 rounded-xl ring-offset-0 focus:ring-primary">
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
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    type="text" 
                    placeholder="Enter postal code" 
                    value={postalCode} 
                    onChange={e => setPostalCode(e.target.value)} 
                    className="flex-1 bg-white dark:bg-gray-800 font-medium h-14 rounded-xl border border-gray-200 dark:border-gray-700 ring-offset-0 focus:ring-primary" 
                  />
                  <Button 
                    onClick={handleNext} 
                    className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto shadow-lg hover:shadow-xl transition-all font-semibold h-14 px-8 rounded-xl"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
