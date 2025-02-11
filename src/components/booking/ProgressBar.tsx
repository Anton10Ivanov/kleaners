
interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          1
        </div>
        <div className="ml-2">Service Details</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${(currentStep - 1) * 50}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          2
        </div>
        <div className="ml-2">Cleaning Details</div>
      </div>
      <div className="h-1 w-24 bg-gray-200 mx-4">
        <div className="h-full bg-primary" style={{ width: `${Math.max(0, (currentStep - 2) * 50)}%` }} />
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'} flex items-center justify-center`}>
          3
        </div>
        <div className="ml-2">Schedule</div>
      </div>
    </div>
  );
};

export default ProgressBar;
