
import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHero } from "./HeroContext";
import { ServiceType } from "@/schemas/booking";

interface BookingFormProps {
  layout: "mobile" | "desktop";
}

export const BookingForm = memo(({
  layout
}: BookingFormProps) => {
  const {
    selectedService,
    postalCode,
    updateSelectedService,
    updatePostalCode,
    handleNextStep
  } = useHero();

  if (layout === "mobile") {
    return (
      <div className="backdrop-blur-xl p-5 border border-white/20 transition-all hover:shadow-[0_10px_40px_-15px_rgba(126,188,230,0.2)] duration-300 bg-white rounded-xl">
        <div className="flex flex-col gap-4">
          <Select value={selectedService} onValueChange={updateSelectedService} defaultValue={ServiceType.Regular}>
            <SelectTrigger className="w-full bg-white/90 dark:bg-gray-800/90 font-medium h-12 rounded-xl ring-offset-0 focus:ring-primary border-white/30 dark:border-gray-700 shadow-sm border-[#08B]">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50 rounded-xl border border-gray-100 dark:border-gray-700">
              <SelectItem value={ServiceType.Regular} className="py-3">Regular Cleaning</SelectItem>
              <SelectItem value={ServiceType.MoveInOut} className="py-3">Move In/Out Cleaning</SelectItem>
              <SelectItem value={ServiceType.Business} className="py-3">Business Cleaning</SelectItem>
              <SelectItem value={ServiceType.Construction} className="py-3">Post-Construction Cleaning</SelectItem>
            </SelectContent>
          </Select>
          
          <Input 
            type="text" 
            placeholder="City or Area code" 
            value={postalCode} 
            onChange={e => updatePostalCode(e.target.value)} 
            className="bg-white/90 dark:bg-white-800/90 font-regular h-12 border-white/30 dark:border-blue-300 ring-offset-0 focus:ring-primary shadow-sm rounded-xl border-[#08B]" 
          />
          
          <Button 
            onClick={handleNextStep} 
            className="bg-primary hover:bg-primary/90 w-full shadow-[0_8px_30px_rgba(126,188,230,0.3)] hover:shadow-[0_8px_30px_rgba(126,188,230,0.5)] transition-all font-bold h-12 rounded-xl text-zinc-950 text-center"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="backdrop-blur-xl p-6 border-2 border-[#08B]/30 transition-all hover:shadow-[0_15px_50px_-12px_rgba(126,188,230,0.3)] duration-300 bg-white/95 rounded-2xl">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Select Service</label>
          <Select value={selectedService} onValueChange={updateSelectedService} defaultValue={ServiceType.Regular}>
            <SelectTrigger className="w-full bg-white/90 dark:bg-gray-800/90 font-medium h-14 rounded-xl ring-offset-0 focus:ring-primary border border-white/30 dark:border-gray-700 shadow-sm border-[#08B]">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 w-full min-w-[240px] z-50 rounded-xl border border-gray-100 dark:border-gray-700">
              <SelectItem value={ServiceType.Regular} className="py-3">Regular Cleaning</SelectItem>
              <SelectItem value={ServiceType.MoveInOut} className="py-3">Move In/Out Cleaning</SelectItem>
              <SelectItem value={ServiceType.Business} className="py-3">Business Cleaning</SelectItem>
              <SelectItem value={ServiceType.Construction} className="py-3">Post-Construction Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-1/4">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Location</label>
          <Input 
            type="text" 
            placeholder="City or Area code" 
            value={postalCode} 
            onChange={e => updatePostalCode(e.target.value)} 
            className="bg-white/90 dark:bg-white-800/90 font-regular h-14 border-white/30 dark:border-blue-300 ring-offset-0 focus:ring-primary shadow-sm rounded-xl border-[#08B]" 
          />
        </div>
        
        <div className="w-full sm:w-1/4 mt-auto">
          <Button 
            onClick={handleNextStep} 
            className="bg-primary hover:bg-primary/90 w-full shadow-[0_8px_30px_rgba(126,188,230,0.3)] hover:shadow-[0_8px_30px_rgba(126,188,230,0.5)] transition-all font-bold h-14 px-8 rounded-xl text-center border-2 border-[#08B] text-black"
          >
            Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
});

BookingForm.displayName = "BookingForm";
