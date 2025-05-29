
import { Info, Check, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [isMobile, setIsMobile] = useState(false);
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

  const translateServiceName = (service: string) => {
    switch (service) {
      case 'regular': return 'Regular Cleaning';
      case 'moveInOut': return 'Move In/Out Cleaning';
      case 'business': return 'Business Cleaning';
      case 'construction': return 'Post-Construction Cleaning';
      default: return service;
    }
  };

  // Only show relevant items based on what's selected
  const hasRelevantData = selectedService || (frequency && hours > 0) || selectedExtras.length > 0;
  
  if (!hasRelevantData) {
    return null;
  }

  return (
    <div className={`${isMobile ? 'fixed bottom-0 left-0 w-full z-50' : 'sticky top-20'}`}>
      <motion.div 
        initial={{ y: isMobile ? 20 : 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 shadow-md border border-gray-100 dark:border-gray-700 md:rounded-lg"
      >
        {/* Always show the breakdown */}
        <div className="space-y-2 mb-3">
          {selectedService && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-white/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="font-medium truncate">{translateServiceName(selectedService)}</span>
            </div>
          )}
          {frequency && hours > 0 && (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-white/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
                <span className="ml-auto font-semibold tabular-nums">{currentPrice.toFixed(2)} €/h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-white/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{hours} Cleaning Hours</span>
                <span className="ml-auto font-semibold tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
              </div>
            </>
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
              <div key={extra} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-white/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium truncate">{extraLabel}</span>
                <span className="ml-auto font-semibold tabular-nums">{extraCost.toFixed(2)} €</span>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-3" />

        {/* Total section - always visible */}
        <div className="bg-primary/10 dark:bg-primary/20 rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Total</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side={isMobile ? "top" : "left"} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
                    <p className="font-medium">Price per cleaning session</p>
                    {frequency && hours > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{currentPrice}€ per hour × {hours} hours</p>
                    )}
                    {extrasCost > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">+ {extrasCost.toFixed(2)}€ additional services</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-xl font-bold text-primary tabular-nums">
              {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSummary;
