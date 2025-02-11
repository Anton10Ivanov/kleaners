
import { Button } from "@/components/ui/button";

interface ServiceOptionsProps {
  frequency: string;
  setFrequency: (value: string) => void;
}

const ServiceOptions = ({ frequency, setFrequency }: ServiceOptionsProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold mb-6">How often should we clean?</h3>
      <div className="grid grid-cols-3 gap-6">
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'onetime' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('onetime')}
        >
          <h4 className="font-semibold mb-2">One Time</h4>
          <p className="text-gray-600">34.00 €/hour</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all relative ${frequency === 'weekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('weekly')}
        >
          {frequency === 'weekly' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
          )}
          <h4 className="font-semibold mb-2">Weekly</h4>
          <p className="text-gray-600">29.00 €/hour</p>
          <p className="text-sm text-gray-500 mt-2">You get the same cleaning professional</p>
        </div>
        <div 
          className={`p-6 rounded-lg border cursor-pointer transition-all ${frequency === 'biweekly' ? 'border-primary' : 'border-gray-200'}`}
          onClick={() => setFrequency('biweekly')}
        >
          <h4 className="font-semibold mb-2">Every 2 Weeks</h4>
          <p className="text-gray-600">32.00 €/hour</p>
          <p className="text-sm text-gray-500 mt-2">You get the same cleaning professional</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOptions;
