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
  return <div className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center py-12 bg-white transition-colors duration-300">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>

      <div className="absolute inset-0 overflow-hidden bg-white">
        {/* Ensuring pure white background */}
      </div>
      
      <div className="relative z-10 max-w-12xl w-full mx-auto px-240">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-0 my-[20px] bg-theme-green">
          {/* Left content with heading and form */}
          <div className="flex flex-col space-y-8 w-full md:w-1/2 order-2 md:order-1 px-0 mx-0">
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white text-left w-full">
              <span className="block, my-[26px] px-[62px] mx-[20px] text-4xl font-medium text-zinc-950">We provide transparent prices.</span> Services
            </motion.h1>
            
            {/* Three-column list */}
            <div className="w-full">
              <ul className="grid grid-cols-1 gap-4 w-full mx-[24px]">
                <motion.li initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.3,
                delay: 0.1
              }} className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-zinc-800">All relevant to the industry insurances</span>
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
              }} className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-zinc-800">24/6 Support</span>
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
              }} className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-zinc-800">Betriebshaftpflichtversicherung bis zu 5 Mio.€</span>
                </motion.li>
              </ul>
            </div>
            
            {/* Booking form */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="w-full">
              <div className="backdrop-blur-xl p-6 md:p-8 border border-white/20 dark:border-gray-700 transition-all hover:shadow-[0_10px_40px_-15px_rgba(126,188,230,0.2)] duration-300 bg-white px-[5px] mx-[23px] py-[3px] my-[23px] rounded-xl">
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 text-left"></h2>
                <div className="flex flex-col sm:flex-row gap-4 items-center rounded-none">
                  {/* Service type - 50% */}
                  <div className="w-full sm:w-1/2">
                    <Select value={selectedService} onValueChange={handleServiceChange}>
                      <SelectTrigger className="w-full bg-white/90 dark:bg-gray-800/90 font-medium h-14 rounded-xl ring-offset-0 focus:ring-primary border border-white/30 dark:border-gray-700 shadow-sm">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50 rounded-xl border border-gray-100 dark:border-gray-700">
                        <SelectItem value="regular" className="py-3">Regular Cleaning (RC)</SelectItem>
                        <SelectItem value="moveInOut" className="py-3">Move In/Out Cleaning (MC)</SelectItem>
                        <SelectItem value="business" className="py-3">Business Cleaning (BC)</SelectItem>
                        <SelectItem value="construction" className="py-3">Post-Construction Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Postal code - 25% */}
                  <div className="w-full sm:w-1/4">
                    <Input type="text" placeholder="Your postal code/city" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="bg-white/90 dark:bg-gray-800/90 font-medium h-14 rounded-xl border border-white/30 dark:border-gray-700 ring-offset-0 focus:ring-primary shadow-sm" />
                  </div>
                  
                  {/* Next button - 25% - Match postal code width */}
                  <div className="w-full sm:w-1/4">
                    <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 w-full shadow-[0_8px_30px_rgba(126,188,230,0.3)] hover:shadow-[0_8px_30px_rgba(126,188,230,0.5)] transition-all font-semibold h-14 px-8 rounded-xl text-zinc-950">
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right side image - Modified to remove framing */}
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="relative">
              <img src="/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png" alt="Professional Cleaning Service" className="w-full h-auto object-contain md:object-cover max-w-lg mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;