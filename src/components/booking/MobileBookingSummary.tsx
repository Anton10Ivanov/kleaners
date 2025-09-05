
import { useState } from 'react';
import { Check, Clock, ChevronDown, ChevronUp, MapPin, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface MobileBookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
  selectedExtras: string[];
  form?: UseFormReturn<BookingFormData>;
}

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 27;
    case 'bi-weekly':
      return 30;
    default: // one-time
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

const MobileBookingSummary = ({ 
  selectedService, 
  frequency, 
  hours, 
  currentPrice, 
  selectedExtras,
  form 
}: MobileBookingSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const extrasCost = calculateExtrasCost(selectedExtras, frequency);
  const totalCost = (currentPrice * hours) + extrasCost;

  // Get form data if available
  const formData = form?.getValues();
  const hasAddress = formData?.address && formData?.city;
  const hasPersonalInfo = formData?.firstName && formData?.lastName && formData?.email;

  const translateServiceName = (service: string) => {
    switch (service) {
      case 'home':
      case 'regular': 
        return 'Regular Cleaning';
      case 'moveInOut': 
        return 'Move In/Out Cleaning';
      case 'business': 
        return 'Business Cleaning';
      case 'deep-cleaning':
        return 'Deep Cleaning';
      case 'post-construction': 
        return 'Post-Construction Cleaning';
      default: 
        return service;
    }
  };

  const hasRelevantData = selectedService || (frequency && hours > 0) || selectedExtras.length > 0;
  
  if (!hasRelevantData) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      {/* Collapsed Header - Show summary without pricing */}
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-center h-auto rounded-none border-none dark:text-white"
      >
        <div className="flex items-center justify-center gap-3 flex-1">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Summary</span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </Button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100 dark:border-gray-700"
          >
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {/* Service Selection */}
              {selectedService && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium truncate">{translateServiceName(selectedService)}</span>
                </div>
              )}
              
              {/* Frequency and Hours */}
              {frequency && hours > 0 && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">
                      {frequency === 'weekly' ? 'Weekly' : 
                       frequency === 'bi-weekly' ? 'Every 2 Weeks' : 'One Time'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{hours} Cleaning Hours</span>
                  </div>
                </>
              )}
              
              {/* Selected Extras */}
              {selectedExtras.length > 0 && selectedExtras.map(extra => {
                let extraLabel = '';

                switch (extra) {
                  case 'cabinets':
                    extraLabel = 'Inside Cabinets (30 min)';
                    break;
                  case 'fridge':
                    extraLabel = 'Inside Fridge (30 min)';
                    break;
                  case 'oven':
                    extraLabel = 'Inside Oven (60 min)';
                    break;
                  case 'ironing':
                    const ironingTime = localStorage.getItem('ironingTime') ? 
                      parseInt(localStorage.getItem('ironingTime') || '30') : 
                      30;
                    extraLabel = `Ironing (${ironingTime} min)`;
                    break;
                  default:
                    extraLabel = extra;
                }

                return (
                  <div key={extra} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium truncate">{extraLabel}</span>
                  </div>
                );
              })}

              {/* Address Info */}
              {hasAddress && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium truncate">
                    {formData.address}, {formData.city} {formData.postalCode}
                  </span>
                </div>
              )}

              {/* Personal Info */}
              {hasPersonalInfo && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 p-2 rounded-md bg-green-50 dark:bg-green-900/20">
                  <User className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-medium truncate">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileBookingSummary;
