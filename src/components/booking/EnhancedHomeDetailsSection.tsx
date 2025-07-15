import { UseFormReturn } from 'react-hook-form';
import { HomeBookingForm } from '@/schemas/bookingSchemas';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Home, User, Droplets, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExtrasSelector from '@/components/booking/ExtrasSelector';
import { ServiceType } from '@/schemas/booking';
import { ConditionalFields, PropertySizeField, BedroomsField, BathroomsField, HoursSelectionField, ExtrasField } from '@/components/booking/shared/SharedFields';
import { RealTimePricing } from '@/components/booking/RealTimePricing';

interface EnhancedHomeDetailsSectionProps {
  form: UseFormReturn<HomeBookingForm>;
  onSuggestedTimeSelect?: (hours: number) => void;
}

export const EnhancedHomeDetailsSection = ({ form, onSuggestedTimeSelect }: EnhancedHomeDetailsSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Home className="h-5 w-5" />
        Home Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Size */}
        <div>
          <PropertySizeField form={form} />
        </div>

        {/* Bedrooms */}
        <div>
          <BedroomsField form={form} />
        </div>

        {/* Bathrooms */}
        <div>
          <BathroomsField form={form} />
        </div>

        {/* Service Options */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
            <h4 className="text-md font-semibold mb-3">Service Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  {...form.register('frequency')}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <option value="one-time">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cleaning Pace</label>
                <select
                  {...form.register('cleaningPace')}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <option value="standard">Standard</option>
                  <option value="quick">Quick</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Hours */}
        <div className="md:col-span-2">
          <HoursSelectionField form={form} onSuggestedTimeSelect={onSuggestedTimeSelect} />
        </div>
      </div>

      {/* Enhanced Extras Section */}
      <div className="mt-6">
        <ExtrasField form={form} serviceType={ServiceType.Home} />
      </div>

      {/* Shared Fields */}
      <div className="mt-6">
        <ConditionalFields form={form} serviceType={ServiceType.Home} />
      </div>

      {/* Real-time Pricing */}
      <div className="mt-6">
        <RealTimePricing form={form} serviceType="home" />
      </div>
    </div>
  );
};