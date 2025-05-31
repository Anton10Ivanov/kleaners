
import { useState } from 'react';
import { Info, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MobileBookingSummaryProps {
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
        totalCost += (0.5 * hourlyRate);
        break;
      case 'oven':
        totalCost += hourlyRate;
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

const MobileBookingSummary = ({ selectedService, frequency, hours, currentPrice, selectedExtras }: MobileBookingSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const extrasCost = calculateExtrasCost(selectedExtras, frequency);
  const totalCost = (currentPrice * hours) + extrasCost;

  const translateServiceName = (service: string) => {
    switch (service) {
      case 'regular': return 'Regular Cleaning';
      case 'moveInOut': return 'Move In/Out Cleaning';
      case 'business': return 'Business Cleaning';
      case 'construction': return 'Post-Construction Cleaning';
      default: return service;
    }
  };

  const hasRelevantData = selectedService || (frequency && hours > 0) || selectedExtras.length > 0;
  
  if (!hasRelevantData) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg">
      {/* Collapsed Header */}
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between h-auto rounded-none border-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">Total:</span>
          <span className="text-lg font-bold text-primary tabular-nums">
            {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        )}
      </Button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {selectedService && (
                <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-md bg-gray-50">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium truncate">{translateServiceName(selectedService)}</span>
                </div>
              )}
              
              {frequency && hours > 0 && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-md bg-gray-50">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
                    <span className="ml-auto font-semibold tabular-nums">{currentPrice.toFixed(2)} €/h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-md bg-gray-50">
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
                  <div key={extra} className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded-md bg-gray-50">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium truncate">{extraLabel}</span>
                    <span className="ml-auto font-semibold tabular-nums">{extraCost.toFixed(2)} €</span>
                  </div>
                );
              })}

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-base font-bold text-primary tabular-nums">
                    {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Price per cleaning session</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileBookingSummary;
