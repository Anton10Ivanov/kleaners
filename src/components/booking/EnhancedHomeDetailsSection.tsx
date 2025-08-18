import { UseFormReturn } from 'react-hook-form';
import { HomeBookingForm } from '@/schemas/bookingSchemas';
import { Home } from 'lucide-react';
import { ServiceType } from '@/schemas/booking';
import { ConditionalFields, HoursSelectionField } from '@/components/booking/shared/SharedFields';
import { RealTimePricing } from '@/components/booking/RealTimePricing';
import { 
  WebFriendlyPropertySizeField,
  WebFriendlyBedroomsField,
  WebFriendlyBathroomsField,
  WebFriendlyFrequencyField,
  WebFriendlyCleaningPaceField
} from '@/components/booking/shared/WebFriendlyFields';
import FlatExtrasSelector from '@/components/booking/FlatExtrasSelector';

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
          <WebFriendlyPropertySizeField form={form} />
        </div>

        {/* Bedrooms */}
        <div>
          <WebFriendlyBedroomsField form={form} />
        </div>

        {/* Bathrooms */}
        <div>
          <WebFriendlyBathroomsField form={form} />
        </div>

        {/* Service Options */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            <WebFriendlyFrequencyField form={form} />
            <WebFriendlyCleaningPaceField form={form} />
          </div>
        </div>

        {/* Estimated Hours */}
        <div className="md:col-span-2">
          <HoursSelectionField form={form} onSuggestedTimeSelect={onSuggestedTimeSelect} />
        </div>
      </div>

      {/* Flattened Extras Section */}
      <div className="mt-6">
        <FlatExtrasSelector
          serviceType={ServiceType.Home}
          selectedExtras={(form.watch('extras') || []) as any}
          onExtrasChange={(extras) => form.setValue('extras', extras as any)}
        />
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