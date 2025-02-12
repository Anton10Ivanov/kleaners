
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-8 max-w-sm mx-auto px-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            2
          </div>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            3
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-[15px] left-0 right-0 h-[1px] bg-gray-200 -z-10" />
        <div className="flex flex-col items-start gap-2 bg-white dark:bg-dark-background">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
            {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <span className={`text-sm ${currentStep >= 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>Your postal code</span>
        </div>
        <div className="flex flex-col items-center gap-2 bg-white dark:bg-dark-background px-2">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
            2
          </div>
          <span className={`text-sm ${currentStep >= 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>Details</span>
        </div>
        <div className="flex flex-col items-end gap-2 bg-white dark:bg-dark-background">
          <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
            3
          </div>
          <span className={`text-sm ${currentStep === 3 ? 'text-primary font-medium' : 'text-gray-500'}`}>Check out</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
