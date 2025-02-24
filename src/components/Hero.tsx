
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 bg-gradient-to-b from-[#FEF7CD] to-white dark:to-transparent">
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Expert Cleaning Services at Your Doorstep
            </h1>
            <div className="space-y-6">
              <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                Book your professional cleaning service in 2 minutes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>100% Satisfaction Guarantee</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Trusted & Background-Checked Cleaners</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Flexible Scheduling Options</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full">
            <div className="bg-white dark:bg-surface p-8 md:p-10 shadow-xl rounded-2xl max-w-xl mx-auto border border-gray-100 dark:border-gray-800">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Start Your Booking</h2>
                <div className="relative">
                  <Select value={selectedService} onValueChange={handleServiceChange}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800 font-medium h-12">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50">
                      <SelectItem value="regular">Regular Cleaning</SelectItem>
                      <SelectItem value="moveInOut">Move In/Out Cleaning</SelectItem>
                      <SelectItem value="business">Business Cleaning</SelectItem>
                      <SelectItem value="construction">Post-Construction Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    type="text" 
                    placeholder="Enter postal code" 
                    value={postalCode} 
                    onChange={e => setPostalCode(e.target.value)} 
                    className="flex-1 bg-white dark:bg-gray-800 font-medium h-12" 
                  />
                  <Button 
                    onClick={handleNext} 
                    className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto shadow-lg hover:shadow-xl transition-all font-semibold h-12 px-8"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
