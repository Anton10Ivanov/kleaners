import { UseFormReturn } from 'react-hook-form';
import { HomeBookingForm } from '@/schemas/bookingSchemas';
import { Home } from 'lucide-react';
import { ServiceType } from '@/schemas/booking';
import { ConditionalFields, CompactCleaningAssessmentField } from '@/components/booking/shared/SharedFields';

import { 
  WebFriendlyPropertySizeField,
  WebFriendlyBedroomsField,
  WebFriendlyBathroomsField,
  WebFriendlyFrequencyField,
  WebFriendlyCleaningPaceField
} from '@/components/booking/shared/WebFriendlyFields';


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
          <WebFriendlyFrequencyField form={form} />
        </div>

        {/* Compact Cleaning Assessment */}
        <div className="md:col-span-2">
          <CompactCleaningAssessmentField form={form} />
        </div>
      </div>

      {/* Shared Fields */}
      <div className="mt-6">
        <ConditionalFields form={form} serviceType={ServiceType.Home} />
      </div>
    </div>
  );
};