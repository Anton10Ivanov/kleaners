
import { memo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ServiceType } from "@/schemas/booking";

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours?: number;
  currentPrice: number;
  selectedExtras: string[];
}

const BookingSummary = memo(({
  selectedService,
  frequency,
  hours = 2,
  currentPrice,
  selectedExtras
}: BookingSummaryProps) => {
  // Calculate the total cost
  const basePrice = currentPrice * hours;
  const extrasPrice = selectedExtras.length * 15; // Assuming each extra is $15
  const totalPrice = basePrice + extrasPrice;

  // Format service name for display
  const formatServiceName = (service: string) => {
    switch(service) {
      case ServiceType.Regular:
        return "Regular Cleaning";
      case ServiceType.Deep:
        return "Deep Cleaning";
      case ServiceType.MoveInOut:
        return "Move In/Out Cleaning";
      case ServiceType.Business:
        return "Business Cleaning";
      default:
        return service;
    }
  };

  return (
    <Card className="rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-subtext dark:text-gray-400 text-sm">Service:</span>
            <span className="font-medium text-right">{formatServiceName(selectedService)}</span>
          </div>
          
          {frequency && (
            <div className="flex justify-between">
              <span className="text-subtext dark:text-gray-400 text-sm">Frequency:</span>
              <span className="font-medium text-right">{frequency}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-subtext dark:text-gray-400 text-sm">Hours:</span>
            <span className="font-medium text-right">{hours} hours</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-subtext dark:text-gray-400 text-sm">Rate:</span>
            <span className="font-medium text-right">${currentPrice}/hour</span>
          </div>
          
          {selectedExtras.length > 0 && (
            <div className="flex justify-between">
              <span className="text-subtext dark:text-gray-400 text-sm">Extras:</span>
              <span className="font-medium text-right">${extrasPrice}</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-3 border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold">${totalPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <div className="w-full space-y-3">
          <Button 
            className="w-full bg-theme-cta hover:bg-theme-cta/90 text-white"
            type="submit"
          >
            Book Now
          </Button>
          
          <div className="text-xs text-subtext dark:text-gray-400 flex items-start">
            <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
            <span>Price includes all taxes and fees. No hidden charges.</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
});

BookingSummary.displayName = "BookingSummary";

export default BookingSummary;
