
interface TimeCalculatorProps {
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
}

const TimeCalculator = ({ bedrooms, setBedrooms, bathrooms, setBathrooms }: TimeCalculatorProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Calculate cleaning time</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 border rounded hover:bg-gray-50"
              onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
            >
              -
            </button>
            <span className="w-8 text-center">{bedrooms}</span>
            <button 
              className="p-2 border rounded hover:bg-gray-50"
              onClick={() => setBedrooms(bedrooms + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bathrooms</label>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 border rounded hover:bg-gray-50"
              onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
            >
              -
            </button>
            <span className="w-8 text-center">{bathrooms}</span>
            <button 
              className="p-2 border rounded hover:bg-gray-50"
              onClick={() => setBathrooms(bathrooms + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCalculator;
