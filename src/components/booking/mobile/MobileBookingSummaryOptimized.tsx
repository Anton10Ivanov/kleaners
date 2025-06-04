
import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, MapPin, User, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface MobileBookingSummaryOptimizedProps {
  form: UseFormReturn<BookingFormData>;
  currentStep: number;
  showDetailed?: boolean;
}

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly': return 27;
    case 'bi-weekly': return 30;
    default: return 35;
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
          parseInt(localStorage.getItem('ironingTime') || '30') : 30;
        totalCost += (ironingTime / 60) * hourlyRate;
        break;
    }
  });

  return totalCost;
};

const MobileBookingSummaryOptimized = ({ 
  form, 
  currentStep,
  showDetailed = false 
}: MobileBookingSummaryOptimizedProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formData = form.getValues();
  const selectedService = formData.service;
  const frequency = formData.frequency;
  const hours = formData.hours || 0;
  const selectedExtras = formData.extras || [];
  const currentPrice = getHourlyRate(frequency || '');
  
  const extrasCost = calculateExtrasCost(selectedExtras, frequency || '');
  const totalCost = (currentPrice * hours) + extrasCost;

  const hasRelevantData = selectedService || (frequency && hours > 0) || selectedExtras.length > 0;
  
  if (!hasRelevantData) return null;

  // Show detailed summary on final step
  if (currentStep === 3 && showDetailed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border p-6 space-y-4"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Booking Summary</h3>
        
        <div className="space-y-3">
          {selectedService && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                {selectedService === 'home' ? 'Regular Cleaning' : 'Business Cleaning'}
              </span>
            </div>
          )}
          
          {frequency && hours > 0 && (
            <>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">
                    {frequency === 'weekly' ? 'Weekly' : 
                     frequency === 'bi-weekly' ? 'Every 2 Weeks' : 'One Time'}
                  </span>
                </div>
                <span className="font-semibold tabular-nums">{currentPrice.toFixed(2)} €/h</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">{hours} Cleaning Hours</span>
                </div>
                <span className="font-semibold tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
              </div>
            </>
          )}
          
          {selectedExtras.length > 0 && selectedExtras.map(extra => {
            const hourlyRate = getHourlyRate(frequency || '');
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
                  parseInt(localStorage.getItem('ironingTime') || '30') : 30;
                extraCost = (ironingTime / 60) * hourlyRate;
                extraLabel = `Ironing (${ironingTime} min)`;
                break;
              default:
                extraLabel = extra;
            }

            return (
              <div key={extra} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">{extraLabel}</span>
                </div>
                <span className="font-semibold tabular-nums">{extraCost.toFixed(2)} €</span>
              </div>
            );
          })}

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-bold text-primary tabular-nums">
                {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Price per cleaning session</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact floating summary for other steps
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-center h-auto rounded-none border-none"
      >
        <div className="flex items-center justify-center gap-3 flex-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">Total:</span>
          <span className="text-base font-bold text-primary tabular-nums">
            {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
          </span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-100 dark:border-gray-700"
          >
            <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
              {selectedService && (
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-3 h-3 text-primary shrink-0" />
                  <span>{selectedService === 'home' ? 'Regular Cleaning' : 'Business Cleaning'}</span>
                </div>
              )}
              
              {frequency && hours > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span>{frequency === 'weekly' ? 'Weekly' : frequency === 'bi-weekly' ? 'Every 2 Weeks' : 'One Time'} • {hours}h</span>
                  <span className="font-semibold tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
                </div>
              )}
              
              {selectedExtras.length > 0 && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  + {selectedExtras.length} extra service{selectedExtras.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileBookingSummaryOptimized;
