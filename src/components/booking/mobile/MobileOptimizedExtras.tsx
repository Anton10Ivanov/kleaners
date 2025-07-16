
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface MobileOptimizedExtrasProps {
  form: UseFormReturn<BookingFormData>;
}

const extraServices = [
  {
    id: 'cabinets',
    title: 'Inside Cabinets',
    description: 'Deep clean inside kitchen cabinets',
    duration: 30,
    icon: '🗄️'
  },
  {
    id: 'fridge',
    title: 'Inside Fridge',
    description: 'Clean and organize refrigerator',
    duration: 30,
    icon: '❄️'
  },
  {
    id: 'oven',
    title: 'Inside Oven',
    description: 'Deep clean oven interior',
    duration: 60,
    icon: '🔥'
  },
  {
    id: 'ironing',
    title: 'Ironing Service',
    description: 'Iron your clothes and linens',
    duration: 30,
    icon: '👔'
  }
];

const MobileOptimizedExtras = ({ form }: MobileOptimizedExtrasProps) => {
  const selectedExtras = form.watch('extras') || [];
  const frequency = form.watch('frequency') || '';

  const getHourlyRate = () => {
    switch (frequency) {
      case 'weekly': return 27;
      case 'bi-weekly': return 30;
      default: return 35;
    }
  };

  const toggleExtra = (extraId: string) => {
    const current = selectedExtras || [];
    const updated = current.includes(extraId)
      ? current.filter(id => id !== extraId)
      : [...current, extraId];
    form.setValue('extras', updated);
  };

  const calculateExtraCost = (duration: number) => {
    return (duration / 60) * getHourlyRate();
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {extraServices.map((extra) => {
          const isSelected = selectedExtras.includes(extra.id);
          const cost = calculateExtraCost(extra.duration);

          return (
            <motion.div
              key={extra.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-3 cursor-pointer transition-all duration-200 border rounded-lg
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-gray-600'
                }
              `}
              onClick={() => toggleExtra(extra.id)}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{extra.icon}</span>
                <div className="flex-1">
                  <h4 className={`
                    font-medium text-sm
                    ${isSelected 
                      ? 'text-primary' 
                      : 'text-gray-900 dark:text-white'
                    }
                  `}>
                    {extra.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {extra.description}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {extra.duration} min • +{cost.toFixed(2)} €
                  </span>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0
                  ${isSelected 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-300 dark:border-gray-600'
                  }
                `}>
                  {isSelected ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : (
                    <Plus className="h-3 w-3 text-gray-400" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedExtras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              {selectedExtras.length} extra service{selectedExtras.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MobileOptimizedExtras;
