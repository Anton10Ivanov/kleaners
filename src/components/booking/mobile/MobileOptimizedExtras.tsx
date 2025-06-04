
import { motion } from 'framer-motion';
import { Plus, Minus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { useState } from 'react';

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
  const [showAll, setShowAll] = useState(false);
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

  const displayedServices = showAll ? extraServices : extraServices.slice(0, 2);

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          Additional Services
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Optional extras to enhance your cleaning
        </p>
      </div>

      <div className="space-y-2">
        {displayedServices.map((extra) => {
          const isSelected = selectedExtras.includes(extra.id);
          const cost = calculateExtraCost(extra.duration);

          return (
            <motion.div
              key={extra.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className={`
                  p-3 cursor-pointer transition-all duration-200 border-2
                  ${isSelected 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  }
                `}
                onClick={() => toggleExtra(extra.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-lg">{extra.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {extra.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {extra.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {extra.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">
                        +{cost.toFixed(2)} €
                      </div>
                    </div>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300 dark:border-gray-600'
                      }
                    `}>
                      {isSelected ? (
                        <Plus className="h-3 w-3 text-white" />
                      ) : (
                        <Plus className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {extraServices.length > 2 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full text-primary hover:text-primary/80"
        >
          {showAll ? 'Show Less' : `See ${extraServices.length - 2} More`}
        </Button>
      )}

      {selectedExtras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
        >
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            {selectedExtras.length} extra service{selectedExtras.length !== 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MobileOptimizedExtras;
