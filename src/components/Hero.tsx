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
  return <div className="relative min-h-[90vh] flex items-center justify-center py-12 bg-gradient-to-b from-[#FEF7CD] to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col space-y-8 items-center">
          {/* Full-width h1 heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white text-center w-full">
            <span className="text-gradient-primary block">Expert Cleaning</span> Services
          </motion.h1>
          
          {/* Three-column list */}
          <div className="w-full">
            
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <motion.li initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: 0.1
            }} className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                <span>100% Satisfaction Guarantee</span>
              </motion.li>
              <motion.li initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: 0.2
            }} className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                <span>Trusted & Background-Checked Cleaners</span>
              </motion.li>
              <motion.li initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: 0.3
            }} className="flex items-center justify-center md:justify-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                <span>Flexible Scheduling Options</span>
              </motion.li>
            </ul>
          </div>
          
          {/* Full-width booking form with specified proportions */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="w-full max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-all hover:shadow-primary/10 duration-300">
              <h2 className="mb-6 text-2xl text-orange-600 font-extralight text-center">Book a professional cleaning service easily</h2>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Service type - 50% */}
                <div className="w-full sm:w-1/2">
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
                
                {/* Postal code - 20% */}
                <div className="w-full sm:w-1/5">
                  <Input type="text" placeholder="Enter postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="bg-white dark:bg-gray-800 font-medium h-14 rounded-xl border border-gray-200 dark:border-gray-700 ring-offset-0 focus:ring-primary" />
                </div>
                
                {/* Next button - 30% */}
                <div className="w-full sm:w-3/10">
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white w-full shadow-lg hover:shadow-xl transition-all font-semibold h-14 px-8 rounded-xl">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Hero;