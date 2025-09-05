
import { Check, Clock, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileBookingProgressProps {
  currentStep: number;
  hasServiceSelection: boolean;
  hasTimeSelection: boolean;
  hasPersonalInfo: boolean;
  hasAddress: boolean;
}

const MobileBookingProgress = ({
  currentStep,
  hasServiceSelection,
  hasTimeSelection,
  hasPersonalInfo,
  hasAddress
}: MobileBookingProgressProps) => {
  const steps = [
    {
      number: 1,
      title: "Service",
      icon: Clock,
      completed: hasServiceSelection,
      active: currentStep === 1
    },
    {
      number: 2,
      title: "Details",
      icon: Clock,
      completed: hasTimeSelection,
      active: currentStep === 2
    },
    {
      number: 3,
      title: "Info",
      icon: User,
      completed: hasPersonalInfo && hasAddress,
      active: currentStep === 3
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <motion.div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                step.completed
                  ? 'bg-primary border-primary text-white'
                  : step.active
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-gray-300 text-gray-400'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-semibold">{step.number}</span>
              )}
            </motion.div>
            <span className={`ml-2 text-xs font-medium ${
              step.active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-6 h-0.5 mx-3 ${
                steps[index + 1].completed || steps[index + 1].active
                  ? 'bg-primary'
                  : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileBookingProgress;
