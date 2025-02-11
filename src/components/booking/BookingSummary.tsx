
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookingSummaryProps {
  selectedService: string;
  frequency: string;
  hours: number;
  currentPrice: number;
}

const BookingSummary = ({ currentPrice, hours }: BookingSummaryProps) => {
  return (
    <div className="bg-white p-4 shadow-lg border-t md:border md:rounded-xl md:border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Total</h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">{(currentPrice * hours).toFixed(2)} €</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Price per cleaning session</p>
                <p className="text-sm text-gray-400">{currentPrice}€ per hour × {hours} hours</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
