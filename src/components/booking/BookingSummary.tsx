import { Info, ChevronUp, Check, Clock, RotateCw, Calendar } from 'lucide-react';
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
      className={`${isMobile ? 'fixed bottom-0 left-0 w-full' : 'sticky top-24'}`}
    >
      <div className="relative" ref={contentRef}>
        {isMobile && (
          <CollapsibleTrigger className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-white dark:bg-dark-background rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center group hover:border-gray-300 transition-colors z-10">
            <ChevronUp className={`h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        )}

        <div className="bg-white dark:bg-dark-background p-6 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Summary</h3>
          
          <CollapsibleContent className="space-y-4">
            {frequency && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCw className="w-4 h-4 text-gray-400" />
                <span className="flex-grow">{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
                <span>{currentPrice.toFixed(2)}€/h</span>
              </div>
            )}
            {selectedService && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Check className="w-4 h-4 text-gray-400" />
                <span>Home cleaning</span>
              </div>
            )}
            {hours > 0 && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{hours} hours of cleaning</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Wednesday 19 February at 10:00</span>
            </div>
          </CollapsibleContent>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">TOTAL</span>
              <span className="text-xs text-gray-500">(per cleaning)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">€ {totalCost.toFixed(2)}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-primary hover:text-primary/90 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Price per cleaning session</p>
                    <p className="text-sm text-gray-400">{currentPrice}€ per hour × {hours} hours</p>
                    {extrasCost > 0 && (
                      <p className="text-sm text-gray-400">+ {extrasCost.toFixed(2)}€ additional services</p>
                    )}
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
