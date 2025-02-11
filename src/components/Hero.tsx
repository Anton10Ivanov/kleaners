
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: "regular" | "deep" | "moving") => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

const Hero = ({ selectedService, setSelectedService, postalCode, setPostalCode, handleNextStep }: HeroProps) => {
  const handleServiceChange = (value: string) => {
    setSelectedService(value as "regular" | "deep" | "moving");
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
      toast.error("Move In/Out cleaning is currently not available");
      return;
    }
    handleNextStep();
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-32 bg-gradient-to-b from-primary/10 to-transparent">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid place-items-center">
          <div className="w-full max-w-2xl bg-white dark:bg-surface p-8 md:p-12 rounded-xl shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-center">
              Professional Cleaning Services for Your Home
            </h1>
            <div className="space-y-6">
              <Select value={selectedService} onValueChange={handleServiceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Cleaning</SelectItem>
                  <SelectItem value="deep">Deep Cleaning</SelectItem>
                  <SelectItem value="moving">Move In/Out Cleaning</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter postal code or city"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
