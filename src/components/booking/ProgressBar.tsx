
import { useEffect, useState } from 'react';

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
        <div className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            1
          </div>
          <span className="text-xs text-gray-500">Your postal code</span>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            2
          </div>
          <span className="text-xs text-gray-500">Details</span>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            3
          </div>
          <span className="text-xs text-gray-500">Check out</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-12 max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          1
        </div>
        <span className="text-xs text-gray-500">Your postal code</span>
      </div>
      <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          2
        </div>
        <span className="text-xs text-gray-500">Details</span>
      </div>
      <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          3
        </div>
        <span className="text-xs text-gray-500">Check out</span>
      </div>
    </div>
  );
};

export default ProgressBar;
