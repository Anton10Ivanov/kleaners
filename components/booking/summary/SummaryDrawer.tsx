
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Clock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface SummaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<BookingFormData>;
  currentStep: number;
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
        totalCost += (0.5 * hourlyRate);
        break;
    }
  });

  return totalCost;
};

export const SummaryDrawer = ({ isOpen, onClose, form, currentStep }: SummaryDrawerProps) => {
  const formData = form.getValues();
  const selectedService = formData.service;
  const frequency = formData.frequency;
  const hours = formData.hours || 0;
  const selectedExtras = formData.extras || [];
  const propertySize = formData.propertySize || 0;
  const bedrooms = formData.bedrooms || 0;
  const bathrooms = formData.bathrooms || 0;
  const currentPrice = getHourlyRate(frequency || '');
  
  const extrasCost = calculateExtrasCost(selectedExtras, frequency || '');
  const totalCost = (currentPrice * hours) + extrasCost;

  const getExtraLabel = (extra: string) => {
    switch (extra) {
      case 'cabinets': return 'Inside Cabinets (30 min)';
      case 'fridge': return 'Inside Fridge (30 min)';
      case 'oven': return 'Inside Oven (60 min)';
      case 'ironing': return 'Ironing Service (30 min)';
      default: return extra;
    }
  };

  const getExtraCost = (extra: string) => {
    const hourlyRate = getHourlyRate(frequency || '');
    switch (extra) {
      case 'cabinets':
      case 'fridge':
      case 'ironing':
        return 0.5 * hourlyRate;
      case 'oven':
        return hourlyRate;
      default: return 0;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="card-spacing-md form-spacing-loose">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Booking Summary
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 card-spacing-none"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Service */}
              {selectedService && (
                <div className="flex items-center gap-3 card-spacing-xs rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Home className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      {selectedService === 'home' ? 'Regular Home Cleaning' : 'Business Cleaning'}
                    </p>
                    {propertySize > 0 && (
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {propertySize} m² • {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`} • {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Frequency & Duration */}
              {frequency && hours > 0 && (
                <div className="form-spacing-normal">
                  <div className="flex items-center justify-between card-spacing-xs rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium">
                        {frequency === 'weekly' ? 'Weekly' : 
                         frequency === 'bi-weekly' ? 'Every 2 Weeks' : 'One Time'}
                      </span>
                    </div>
                    <span className="font-semibold tabular-nums">{currentPrice.toFixed(2)} €/h</span>
                  </div>
                  
                  <div className="flex items-center justify-between card-spacing-xs rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium">{hours} Cleaning Hours</span>
                    </div>
                    <span className="font-semibold tabular-nums">{(currentPrice * hours).toFixed(2)} €</span>
                  </div>
                </div>
              )}

              {/* Extras */}
              {selectedExtras.length > 0 && (
                <div className="form-spacing-normal">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Additional Services</h3>
                  {selectedExtras.map(extra => {
                    const extraCost = getExtraCost(extra);
                    return (
                      <div key={extra} className="flex items-center justify-between card-spacing-xs rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="font-medium">{getExtraLabel(extra)}</span>
                        </div>
                        <span className="font-semibold tabular-nums">{extraCost.toFixed(2)} €</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between card-spacing-sm rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-primary tabular-nums">
                    {frequency && hours > 0 ? `${totalCost.toFixed(2)} €` : 'Select options'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Price per cleaning session</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
