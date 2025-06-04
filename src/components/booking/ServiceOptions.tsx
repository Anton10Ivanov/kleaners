
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Frequency } from '@/schemas/booking';
import { CheckCircle2 } from 'lucide-react';

interface ServiceOptionsProps {
  frequency: Frequency | undefined;
  setFrequency: (frequency: Frequency) => void;
  isRegularCleaning?: boolean;
}

const ServiceOptions = ({ frequency, setFrequency, isRegularCleaning = false }: ServiceOptionsProps) => {
  const options = [
    { 
      value: Frequency.Weekly, 
      label: 'Weekly', 
      description: '4 visits/month',
      savings: '20% off',
      popular: true
    },
    { 
      value: Frequency.BiWeekly, 
      label: 'Bi-weekly', 
      description: '2 visits/month',
      savings: '15% off',
      popular: false
    },
    { 
      value: Frequency.OneTime, 
      label: 'One-time', 
      description: 'Single visit',
      savings: null,
      popular: false
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={frequency === option.value ? "default" : "outline"}
              onClick={() => setFrequency(option.value)}
              className={`
                relative w-full h-20 flex flex-col items-center justify-center p-4 text-center
                transition-all duration-200 border-2
                ${frequency === option.value 
                  ? 'border-primary bg-primary text-white shadow-lg' 
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                }
                ${option.popular ? 'ring-2 ring-primary/20' : ''}
              `}
            >
              {option.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{option.label}</span>
                {frequency === option.value && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </div>
              
              <span className={`text-xs ${
                frequency === option.value ? 'text-white/80' : 'text-gray-500'
              }`}>
                {option.description}
              </span>
              
              {option.savings && (
                <span className={`text-xs font-medium mt-1 ${
                  frequency === option.value ? 'text-green-200' : 'text-green-600'
                }`}>
                  {option.savings}
                </span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceOptions;
