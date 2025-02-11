
import { Check, Clock } from 'lucide-react';

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
}

const BookingSummary = ({ selectedService, frequency, hours, currentPrice }: BookingSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
      <h3 className="text-xl font-semibold mb-6">Summary</h3>
      <div className="space-y-4">
        {selectedService && (
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-gray-400" />
            <span>{selectedService === 'regular' ? 'Regular Cleaning' : selectedService === 'deep' ? 'Deep Cleaning' : 'Move In/Out Cleaning'}</span>
          </div>
        )}
        {frequency && (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>{frequency === 'weekly' ? 'Weekly' : frequency === 'biweekly' ? 'Every 2 Weeks' : 'One Time'}</span>
            <span className="ml-auto">{currentPrice.toFixed(2)} €/h</span>
          </div>
        )}
        {hours > 0 && (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>{hours} Cleaning Hours</span>
          </div>
        )}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between font-semibold">
            <span>TOTAL</span>
            <span>{(currentPrice * hours).toFixed(2)} €</span>
          </div>
          <div className="text-sm text-gray-500">per cleaning</div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
