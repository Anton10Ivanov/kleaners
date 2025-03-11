
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Service } from "@/schemas/booking";
import { toast } from "sonner";

interface SimpleHeroProps {
  selectedService: string;
  setSelectedService: (value: Service) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const SimpleHero = ({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: SimpleHeroProps) => {
  console.log("SimpleHero rendering with:", { selectedService, postalCode });

  const handleValidatedNextStep = () => {
    if (!selectedService) {
      toast.error("Please select a service type");
      return;
    }
    if (!postalCode) {
      toast.error("Please enter your city or area code");
      return;
    }
    console.log("SimpleHero: Proceeding to next step with", { selectedService, postalCode });
    handleNextStep();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md space-y-6 bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center">Book your cleaning in 2 minutes</h1>
        <p className="text-gray-500 text-center">Professional local cleaners with transparent, fair pricing</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Service</label>
            <Select 
              value={selectedService} 
              onValueChange={(value) => {
                console.log("Setting service to:", value);
                setSelectedService(value as Service);
              }}
              defaultValue={Service.Regular}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Service.Regular}>Regular Cleaning</SelectItem>
                <SelectItem value={Service.MoveInOut}>Move In/Out Cleaning</SelectItem>
                <SelectItem value={Service.Business}>Business Cleaning</SelectItem>
                <SelectItem value={Service.Construction}>Post-Construction Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input 
              placeholder="City or Area code" 
              value={postalCode}
              onChange={(e) => {
                console.log("Setting postal code to:", e.target.value);
                setPostalCode(e.target.value);
              }}
            />
          </div>
          
          <Button 
            onClick={handleValidatedNextStep}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleHero;
