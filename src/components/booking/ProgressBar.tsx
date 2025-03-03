
import { useMediaQuery } from '@/hooks/use-media-query';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-6 max-w-xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm font-medium`}>
            1
          </div>
          <span className="text-[10px] mt-1 text-gray-500">Service</span>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm font-medium`}>
            2
          </div>
          <span className="text-[10px] mt-1 text-gray-500">Schedule</span>
        </div>
        <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm font-medium`}>
            3
          </div>
          <span className="text-[10px] mt-1 text-gray-500">Checkout</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-12 max-w-xl mx-auto">
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          1
        </div>
        <span className="text-xs text-gray-500">Service Details</span>
      </div>
      <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          2
        </div>
        <span className="text-xs text-gray-500">Schedule</span>
      </div>
      <div className="h-[1px] flex-1 mx-2 bg-gray-200" />
      <div className="flex flex-col items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center text-sm`}>
          3
        </div>
        <span className="text-xs text-gray-500">Checkout</span>
      </div>
    </div>
  );
};

export default ProgressBar;
