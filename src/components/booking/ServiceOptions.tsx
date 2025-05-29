
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Frequency } from '@/schemas/booking';

interface ServiceOptionsProps {
  frequency: Frequency | undefined;
  setFrequency: (frequency: Frequency) => void;
  isRegularCleaning?: boolean;
}

const ServiceOptions = ({ frequency, setFrequency, isRegularCleaning = false }: ServiceOptionsProps) => {
  const options = [
    { value: Frequency.Weekly, label: 'Weekly', description: '4 visits/month' },
    { value: Frequency.BiWeekly, label: 'Bi-weekly', description: '2 visits/month' },
    { value: Frequency.OneTime, label: 'One-time', description: 'Single visit' },
    ...(isRegularCleaning ? [] : [{ value: Frequency.Custom, label: 'Custom', description: 'Set your own schedule' }])
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        Cleaning Interval
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={frequency === option.value ? "default" : "outline"}
            onClick={() => setFrequency(option.value)}
            className="flex flex-col items-center py-2 h-auto text-left"
          >
            <span className="font-semibold text-xs">{option.label}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceOptions;
