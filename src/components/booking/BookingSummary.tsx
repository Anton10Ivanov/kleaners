
import { Info, ChevronUp, Check, Clock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
}

const BookingSummary = ({ selectedService, frequency, hours, currentPrice }: BookingSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <CollapsibleTrigger className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center group hover:border-gray-300 transition-colors">
          <ChevronUp className={`h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>

        <div className="bg-white p-4 shadow-lg border-t md:border md:rounded-xl md:border-gray-100">
          <CollapsibleContent className="space-y-4 mb-4">
            {selectedService && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Check className="w-4 h-4 text-gray-400" />
                <span>{selectedService === 'regular' ? 'Regular Cleaning' : selectedService === 'deep' ? 'Deep Cleaning' : 'Move In/Out Cleaning'}</span>
              </div>
            )}
            {frequency && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
                <span className="ml-auto">{currentPrice.toFixed(2)} €/h</span>
              </div>
            )}
            {hours > 0 && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{hours} Cleaning Hours</span>
              </div>
            )}
          </CollapsibleContent>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Total</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{(currentPrice * hours).toFixed(2)} €</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Price per cleaning session</p>
                    <p className="text-sm text-gray-400">{currentPrice}€ per hour × {hours} hours</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </Collapsible>
  );
};

export default BookingSummary;
