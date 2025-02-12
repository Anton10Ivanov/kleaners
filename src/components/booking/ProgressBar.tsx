
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
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            1
          </div>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-gray-200">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep - 1) * 50}%` }} />
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            2
          </div>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-gray-200">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.max(0, (currentStep - 2) * 50)}%` }} />
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
            3
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          <span className="text-sm">1</span>
        </div>
        <div className="ml-3 font-medium">Your postal code</div>
      </div>
      <div className="h-1 w-24 bg-gray-200">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep - 1) * 50}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          <span className="text-sm">2</span>
        </div>
        <div className="ml-3 font-medium">Details</div>
      </div>
      <div className="h-1 w-24 bg-gray-200">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.max(0, (currentStep - 2) * 50)}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          <span className="text-sm">3</span>
        </div>
        <div className="ml-3 font-medium">Check out</div>
      </div>
    </div>
  );
};

export default ProgressBar;
