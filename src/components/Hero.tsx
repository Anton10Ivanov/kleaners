
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: "regular" | "moveinout" | "moving") => void;
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
  const handleServiceChange = (value: string) => {
    setSelectedService(value as "regular" | "moveinout" | "moving");
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
    if (selectedService === 'moving') {
      toast.error("This service is currently not available");
      return;
    }
    handleNextStep();
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-20 bg-gradient-to-b from-[#FEF7CD] to-transparent">
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Professional Cleaning Services for Your Home
            </h1>
            <p className="text-lg text-secondary-text max-w-xl">
              Experience the highest standard of cleaning services tailored to your needs. Book your cleaning service today and enjoy a spotless home tomorrow.
            </p>
          </div>
          
          <div className="w-full">
            <div className="bg-white dark:bg-surface p-8 md:p-10 shadow-lg rounded-2xl max-w-xl mx-auto">
              <div className="space-y-6">
                <div className="relative">
                  <Select value={selectedService} onValueChange={handleServiceChange}>
                    <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50">
                      <SelectItem value="regular">Regular Cleaning</SelectItem>
                      <SelectItem value="moveinout">Move In/Out Cleaning</SelectItem>
                      <SelectItem value="moving">Coming Soon: Business Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    type="text" 
                    placeholder="Enter postal code or city" 
                    value={postalCode} 
                    onChange={e => setPostalCode(e.target.value)} 
                    className="flex-1 bg-white dark:bg-gray-800" 
                  />
                  <Button 
                    onClick={handleNext} 
                    className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
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
