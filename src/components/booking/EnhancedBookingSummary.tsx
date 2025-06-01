
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { Calendar, Clock, MapPin, Euro, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface EnhancedBookingSummaryProps {
  form: UseFormReturn<BookingFormData>;
  onEditStep?: (step: number) => void;
}

const EnhancedBookingSummary = ({ form, onEditStep }: EnhancedBookingSummaryProps) => {
  const formData = form.getValues();
  const {
    service,
    frequency,
    hours,
    date,
    preferredTime,
    extras = [],
    windowConfig,
    ironingConfig,
    bedrooms,
    bathrooms,
    postalCode
  } = formData;

  // Calculate prices
  const getHourlyRate = () => {
    switch (frequency) {
      case Frequency.Weekly: return 27;
      case Frequency.BiWeekly: return 30;
      default: return 35;
    }
  };

  const hourlyRate = getHourlyRate();
  const basePrice = (hours || 2) * hourlyRate;

  const calculateExtrasTotal = () => {
    let total = 0;
    extras.forEach(extraId => {
      switch (extraId) {
        case 'windows':
          const windowPrice = (windowConfig?.count || 1) * 5;
          total += windowConfig?.framesIncluding ? windowPrice * 2 : windowPrice;
          break;
        case 'ironing':
          total += ((ironingConfig?.time || 30) / 60) * hourlyRate;
          break;
        case 'carpet':
          total += 15;
          break;
        case 'mattress':
          total += 25;
          break;
        case 'repair':
          total += 30;
          break;
        case 'cabinets':
          total += (30 / 60) * hourlyRate;
          break;
        case 'fridge':
          total += (30 / 60) * hourlyRate;
          break;
        case 'oven':
          total += (60 / 60) * hourlyRate;
          break;
      }
    });
    return total;
  };

  const extrasTotal = calculateExtrasTotal();
  const totalPrice = basePrice + extrasTotal;

  const getServiceDisplayName = () => {
    switch (service) {
      case 'home': return 'Home Cleaning';
      case 'deep-cleaning': return 'Deep Cleaning';
      case 'move-in-out': return 'Move In/Out';
      case 'office': return 'Office Cleaning';
      default: return 'Cleaning Service';
    }
  };

  const getFrequencyDisplayName = () => {
    switch (frequency) {
      case Frequency.Weekly: return 'Weekly';
      case Frequency.BiWeekly: return 'Bi-weekly';
      case Frequency.Monthly: return 'Monthly';
      case Frequency.OneTime: return 'One-time';
      default: return 'Custom';
    }
  };

  const getExtraDisplayName = (extraId: string) => {
    const names: Record<string, string> = {
      windows: 'Window Cleaning',
      ironing: 'Ironing Service',
      carpet: 'Carpet Washing',
      mattress: 'Mattress Washing',
      repair: 'Small Repairs',
      cabinets: 'Inside Cabinets',
      fridge: 'Inside Fridge',
      oven: 'Inside Oven'
    };
    return names[extraId] || extraId;
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Euro className="h-6 w-6 text-primary" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Total Price Display */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20"
        >
          <div className="text-3xl font-bold text-primary">€{totalPrice.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Total Amount</div>
        </motion.div>

        {/* Service Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Service Details</h3>
            {onEditStep && (
              <Button variant="ghost" size="sm" onClick={() => onEditStep(2)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Type</span>
              <Badge variant="secondary">{getServiceDisplayName()}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Frequency</span>
              <span className="font-medium">{getFrequencyDisplayName()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{hours} hours</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Property Size</span>
              <span className="font-medium">{bedrooms}BR • {bathrooms}BA</span>
            </div>
            
            {postalCode && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </span>
                <span className="font-medium">{postalCode}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Schedule */}
        {date && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Schedule</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Date & Time
              </span>
              <div className="text-right">
                <div className="font-medium">{format(date, 'MMMM d, yyyy')}</div>
                {preferredTime && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {preferredTime.split('-')[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Pricing Breakdown</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base cleaning ({hours}h × €{hourlyRate}/h)</span>
              <span>€{basePrice.toFixed(2)}</span>
            </div>
            
            {extras.length > 0 && (
              <>
                <div className="text-sm font-medium text-gray-700 mt-3 mb-1">Additional Services:</div>
                {extras.map(extraId => {
                  let price = 0;
                  let details = '';
                  
                  switch (extraId) {
                    case 'windows':
                      const windowPrice = (windowConfig?.count || 1) * 5;
                      price = windowConfig?.framesIncluding ? windowPrice * 2 : windowPrice;
                      details = `${windowConfig?.count || 1} windows${windowConfig?.framesIncluding ? ' + frames' : ''}`;
                      break;
                    case 'ironing':
                      price = ((ironingConfig?.time || 30) / 60) * hourlyRate;
                      details = `${ironingConfig?.time || 30} minutes`;
                      break;
                    case 'carpet':
                      price = 15;
                      break;
                    case 'mattress':
                      price = 25;
                      break;
                    case 'repair':
                      price = 30;
                      break;
                    case 'cabinets':
                      price = (30 / 60) * hourlyRate;
                      details = '30 minutes';
                      break;
                    case 'fridge':
                      price = (30 / 60) * hourlyRate;
                      details = '30 minutes';
                      break;
                    case 'oven':
                      price = (60 / 60) * hourlyRate;
                      details = '60 minutes';
                      break;
                  }
                  
                  return (
                    <div key={extraId} className="flex justify-between text-sm pl-4">
                      <span>
                        {getExtraDisplayName(extraId)}
                        {details && <span className="text-gray-500 ml-1">({details})</span>}
                      </span>
                      <span>€{price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingSummary;
