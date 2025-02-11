
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

const Hero = ({ selectedService, setSelectedService, postalCode, setPostalCode, handleNextStep }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
          alt="Clean home interior"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-6xl font-bold leading-tight">
              Professional Cleaning Services for Your Home
            </h1>
          </div>

          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">Book Your Cleaning Service</h3>
            <div className="space-y-6">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Cleaning</SelectItem>
                  <SelectItem value="deep">Deep Cleaning</SelectItem>
                  <SelectItem value="moving">Move In/Out Cleaning</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter postal code or city"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleNextStep}
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={!selectedService || !postalCode || (selectedService !== 'regular' && selectedService !== 'deep')}
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
