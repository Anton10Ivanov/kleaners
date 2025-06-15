import { UseFormReturn } from 'react-hook-form';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, LucideIcon, MapPin, Repeat, X } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedBookingSummaryProps {
  form: UseFormReturn<BookingFormData>;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onBack?: () => void;
  backButtonText?: string;
  showBackButton?: boolean;
}

const InfoLine = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
    <Icon className="h-4 w-4 flex-shrink-0" />
    <span className="min-w-0">{children}</span>
  </div>
);

const EnhancedBookingSummary = ({ 
  form, 
  onSubmit, 
  isSubmitting, 
  onBack, 
  backButtonText = 'Back', 
  showBackButton = false 
}: EnhancedBookingSummaryProps) => {
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
    <Card className="w-full min-w-0">
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg">Booking Summary</h3>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Service Details */}
        <div className="space-y-2">
          <InfoLine icon={Repeat}>{getFrequencyLabel(frequency)}</InfoLine>
          <InfoLine icon={Clock}>{hours} hours</InfoLine>
          {propertySize && (
            <InfoLine icon={MapPin}>
              {propertySize}m², {bedrooms || 0} bed{bedrooms !== 1 ? 's' : ''}, {bathrooms || 0} bath{bathrooms !== 1 ? 's' : ''}
            </InfoLine>
          )}
        </div>

        {/* Date & Time */}
        {date && (
          <div className="border-t pt-3">
            <InfoLine icon={CalendarIcon}>{format(date, 'MMM d, yyyy')}</InfoLine>
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
          {extrasPrice > 0 && (
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Additional services</span>
              <span>€{extrasPrice}</span>
            </div>
          )}
          
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total</span>
            <span className="text-primary">€{totalPrice}</span>
          </div>
          <p className="text-xs text-gray-500">Per cleaning session</p>
        </div>

        {onSubmit && (
          <div className="pt-4 mt-2 border-t">
            <div className="flex flex-col sm:flex-row gap-2">
              {showBackButton && onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="w-full"
                >
                  {backButtonText}
                </Button>
              )}
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingSummary;
