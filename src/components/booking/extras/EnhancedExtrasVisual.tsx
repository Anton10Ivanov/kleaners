
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface EnhancedExtrasVisualProps {
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

export const EnhancedExtrasVisual = ({ form }: EnhancedExtrasVisualProps) => {
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Additional Services
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Optional extras to enhance your cleaning service
      </p>

      <div className="grid gap-3">
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
            >
              <Card 
                className={`
                  p-4 cursor-pointer transition-all duration-200 border-2
                  ${isSelected 
                    ? 'border-primary bg-primary/20 shadow-lg ring-4 ring-primary/30 dark:bg-primary/30' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-gray-600'
                  }
                `}
                onClick={() => toggleExtra(extra.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`
                      text-2xl p-2 rounded-lg transition-colors
                      ${isSelected 
                        ? 'bg-primary/30 ring-2 ring-primary/50' 
                        : 'bg-gray-100 dark:bg-gray-800'
                      }
                    `}>
                      {extra.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        text-sm font-semibold transition-colors
                        ${isSelected 
                          ? 'text-primary font-bold' 
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {extra.title}
                      </h4>
                      <p className={`
                        text-xs transition-colors
                        ${isSelected
                          ? 'text-primary/80 dark:text-primary/90'
                          : 'text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        {extra.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`
                          text-xs transition-colors
                          ${isSelected
                            ? 'text-primary/80 font-medium'
                            : 'text-gray-500'
                          }
                        `}>
                          {extra.duration} min • +{cost.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected 
                      ? 'bg-primary border-primary shadow-lg ring-2 ring-primary/30' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }
                  `}>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-white font-bold" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </Card>
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
