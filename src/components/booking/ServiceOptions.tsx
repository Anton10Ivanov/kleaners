
// import { motion } from 'framer-motion'; // Removed for performance
import { Button } from '@/components/ui/button';
import { Frequency } from '@/schemas/booking';

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
      savings: 23
    },
    { 
      value: Frequency.BiWeekly, 
      label: 'Bi-weekly', 
      description: '2 visits/month',
      savings: 14
    },
    { 
      value: Frequency.OneTime, 
      label: 'One-time', 
      description: 'Single visit',
      savings: 0
    }
  ];

  const calculateSavings = (optionSavings: number) => {
    if (optionSavings === 0) return null;
    return `Save ${optionSavings}%`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <div key={option.value}>
            <Button
              variant={frequency === option.value ? "default" : "outline"}
              onClick={() => setFrequency(option.value)}
              className={`
                relative w-full h-auto flex flex-col items-center justify-center p-4 text-center
                transition-all duration-200 border-2
                ${frequency === option.value 
                  ? 'border-primary bg-primary text-white shadow-lg' 
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                }
              `}
            >
              <div className="space-y-2">
                <div className="font-semibold text-base">{option.label}</div>
                <div className={`text-sm ${
                  frequency === option.value ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {option.description}
                </div>
                {calculateSavings(option.savings) && (
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    frequency === option.value 
                      ? 'bg-green-400 text-green-900' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {calculateSavings(option.savings)}
                  </div>
                )}
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceOptions;
