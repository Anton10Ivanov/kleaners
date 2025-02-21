
import { Info, ChevronUp, Check, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
  selectedExtras: string[];
}

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 27;
    case 'biweekly':
      return 30;
    default: // onetime
      return 35;
  }
};

const calculateExtrasCost = (selectedExtras: string[], frequency: string) => {
  const hourlyRate = getHourlyRate(frequency);
  let totalCost = 0;

  selectedExtras.forEach(extra => {
    switch (extra) {
      case 'cabinets':
      case 'fridge':
        totalCost += (0.5 * hourlyRate); // 30 min
        break;
      case 'oven':
        totalCost += hourlyRate; // 60 min
        break;
      case 'ironing':
        // For ironing, we calculate based on the dialog selection
        // Default to minimum time (30 min) if no specific time was selected
        const ironingTime = localStorage.getItem('ironingTime') ? 
          parseInt(localStorage.getItem('ironingTime') || '30') : 
          30;
        totalCost += (ironingTime / 60) * hourlyRate;
        break;
    }
  });

  return totalCost;
};

const BookingSummary = ({ selectedService, frequency, hours, currentPrice, selectedExtras }: BookingSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const extrasCost = calculateExtrasCost(selectedExtras, frequency);
  const totalCost = (currentPrice * hours) + extrasCost;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile]);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={`${isMobile ? 'fixed bottom-0 left-0 w-full z-50' : 'sticky top-20'}`}
    >
      <div className="relative" ref={contentRef}>
        {isMobile && (
          <CollapsibleTrigger className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center group hover:border-gray-300 transition-colors z-10">
            <ChevronUp className={`h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 p-4 shadow-md border border-gray-100 dark:border-gray-800 md:rounded-lg">
          <CollapsibleContent className="space-y-3">
            {selectedService && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2.5 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium truncate">{selectedService === 'regular' ? 'Regular Cleaning' : selectedService === 'deep' ? 'Deep Cleaning' : 'Move In/Out Cleaning'}</span>
              </div>
            )}
            {frequency && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2.5 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
                <span className="ml-auto font-semibold tabular-nums">{currentPrice.toFixed(2)} €/h</span>
              </div>
            )}
            {hours > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2.5 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{hours} Cleaning Hours</span>
                <span className="ml-auto font-semibold tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
              </div>
            )}
            {selectedExtras.length > 0 && selectedExtras.map(extra => {
              const hourlyRate = getHourlyRate(frequency);
              let extraCost = 0;
              let extraLabel = '';

              switch (extra) {
                case 'cabinets':
                  extraCost = 0.5 * hourlyRate;
                  extraLabel = 'Inside Cabinets (30 min)';
                  break;
                case 'fridge':
                  extraCost = 0.5 * hourlyRate;
                  extraLabel = 'Inside Fridge (30 min)';
                  break;
                case 'oven':
                  extraCost = hourlyRate;
                  extraLabel = 'Inside Oven (60 min)';
                  break;
                case 'ironing':
                  const ironingTime = localStorage.getItem('ironingTime') ? 
                    parseInt(localStorage.getItem('ironingTime') || '30') : 
                    30;
                  extraCost = (ironingTime / 60) * hourlyRate;
                  extraLabel = `Ironing (${ironingTime} min)`;
                  break;
                default:
                  extraLabel = extra;
              }

              return (
                <div key={extra} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2.5 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium truncate">{extraLabel}</span>
                  <span className="ml-auto font-semibold tabular-nums">{extraCost.toFixed(2)} €</span>
                </div>
              );
            })}
          </CollapsibleContent>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-3" />

          <div className="bg-primary/5 dark:bg-primary/10 rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Total</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                      <p className="font-medium">Price per cleaning session</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{currentPrice}€ per hour × {hours} hours</p>
                      {extrasCost > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">+ {extrasCost.toFixed(2)}€ additional services</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xl font-bold text-primary tabular-nums">{totalCost.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </Collapsible>
  );
};

export default BookingSummary;

