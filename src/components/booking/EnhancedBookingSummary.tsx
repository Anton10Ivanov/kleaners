import { UseFormReturn } from 'react-hook-form';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin, Repeat, X } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedBookingSummaryProps {
  form: UseFormReturn<BookingFormData>;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

const EnhancedBookingSummary = ({ form, onSubmit, isSubmitting }: EnhancedBookingSummaryProps) => {
  const formData = form.watch();
  const { 
    frequency = Frequency.Weekly, 
    hours = 2, 
    date, 
    preferredTime, 
    extras = [],
    propertySize,
    bedrooms,
    bathrooms,
    promoCode
  } = formData;

  const getHourlyRate = (freq: string) => {
    switch (freq) {
      case Frequency.Weekly: return 27;
      case Frequency.BiWeekly: return 30;
      default: return 35;
    }
  };

  const hourlyRate = getHourlyRate(frequency);
  const basePrice = hours * hourlyRate;
  
  // Calculate extras cost (simplified)
  const extrasPrice = extras.length * 15; // Simplified calculation
  const totalPrice = basePrice + extrasPrice;

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case Frequency.Weekly: return 'Weekly';
      case Frequency.BiWeekly: return 'Every 2 weeks';
      case Frequency.Monthly: return 'Monthly';
      default: return 'One-time';
    }
  };

  const removeExtra = (extraToRemove: string) => {
    const updatedExtras = extras.filter(extra => extra !== extraToRemove);
    form.setValue('extras', updatedExtras);
  };

  const handlePromoCodeApply = () => {
    if (promoCode) {
      toast.success("Promo code applied!");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg">Booking Summary</h3>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Service Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Repeat className="h-4 w-4" />
            <span>{getFrequencyLabel(frequency)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{hours} hours</span>
          </div>

          {propertySize && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{propertySize}m², {bedrooms || 0} bed{bedrooms !== 1 ? 's' : ''}, {bathrooms || 0} bath{bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Date & Time */}
        {date && (
          <div className="border-t pt-3">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4" />
              <span>{format(date, 'MMM d, yyyy')}</span>
            </div>
            {preferredTime && (
              <div className="ml-6 text-gray-500">
                {preferredTime}
              </div>
            )}
          </div>
        )}

        {/* Additional Services (Extras only) */}
        {extras.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Additional Services</h4>
            <ul className="space-y-2">
              {extras.map((extra, index) => (
                <li key={index} className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span className="capitalize">{extra}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExtra(extra)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Promo Code */}
        <div className="border-t pt-3">
          <h4 className="font-medium mb-2">Promo Code</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode || ''}
              onChange={(e) => form.setValue('promoCode', e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handlePromoCodeApply}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between">
            <span>Cleaning ({hours}h × €{hourlyRate})</span>
            <span>€{basePrice}</span>
          </div>
          
          {extrasPrice > 0 && (
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Additional services</span>
              <span>€{extrasPrice}</span>
            </div>
          )}
          
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-primary">€{totalPrice}</span>
          </div>
          <p className="text-xs text-gray-500">Per cleaning session</p>
        </div>

        {onSubmit && (
          <div className="pt-4 mt-2 border-t">
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Processing Booking..." : "Complete Booking"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingSummary;
