
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { DeepCleaningPopup } from './DeepCleaningPopup';
import { PropertySizeInput } from './home-details/PropertySizeInput';
import { RoomSelectors } from './home-details/RoomSelectors';
import { CleaningPaceToggle } from './home-details/CleaningPaceToggle';
import { EstimationDisplay } from './home-details/EstimationDisplay';

interface HomeDetailsSectionProps {
  form: UseFormReturn<BookingFormData>;
  onSuggestedTimeSelect?: (hours: number) => void;
}

function estimateDuration(size: number, bedrooms: number, bathrooms: number, pace: 'standard' | 'quick' = 'standard'): number {
  let duration = 2; // Base

  if (size > 60) duration += Math.ceil((size - 60) / 20) * 0.5;
  if (bedrooms > 1) duration += (bedrooms - 1) * 0.3;
  if (bathrooms > 1) duration += (bathrooms - 1) * 0.5;
  let finalDuration = Math.min(duration, 8);

  // Apply quick pace reduction (20% off, but not below 2 hours)
  if (pace === 'quick') {
    finalDuration = Math.max(2, finalDuration * 0.8);
  }
  return Math.round(finalDuration * 2) / 2; // Round to nearest 0.5
}

export const HomeDetailsSection = ({
  form,
  onSuggestedTimeSelect
}: HomeDetailsSectionProps) => {
  const [showDeepCleaningPopup, setShowDeepCleaningPopup] = useState(false);
  
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;
  const cleaningPace = form.watch('cleaningPace') || 'standard';

  // Set default values on mount
  useEffect(() => {
    if (!form.watch('propertySize')) {
      form.setValue('propertySize', 70);
    }
    if (!form.watch('cleaningPace')) {
      form.setValue('cleaningPace', 'standard');
    }
  }, [form]);

  const allFieldsFilled = propertySize > 0 && bedrooms > 0 && bathrooms > 0;

  // Calculate duration with standard pace for popup trigger
  const standardDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms, 'standard') : 0;
  const suggestedDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms, cleaningPace as 'standard' | 'quick') : 0;

  // Check if deep cleaning should be suggested (based on standard duration before quick adjustment)
  const shouldSuggestDeepCleaning = standardDuration >= 6 || bathrooms >= 3;
  
  useEffect(() => {
    if (allFieldsFilled && shouldSuggestDeepCleaning) {
      setShowDeepCleaningPopup(true);
    }
  }, [allFieldsFilled, shouldSuggestDeepCleaning]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Home Size */}
        <PropertySizeInput form={form} />

        {/* Bedrooms & Bathrooms */}
        <RoomSelectors form={form} />

        {/* Preferred Cleaning Pace - Toggle Switch */}
        <CleaningPaceToggle form={form} />
      </div>

      {/* Estimation Display */}
      <EstimationDisplay
        form={form}
        allFieldsFilled={allFieldsFilled}
        suggestedDuration={suggestedDuration}
        propertySize={propertySize}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        cleaningPace={cleaningPace}
        onSuggestedTimeSelect={onSuggestedTimeSelect}
      />

      {/* Deep Cleaning Popup */}
      <DeepCleaningPopup 
        isOpen={showDeepCleaningPopup} 
        onClose={() => setShowDeepCleaningPopup(false)} 
        onSwitchToDeepCleaning={() => {
          // This would redirect to deep cleaning booking
          window.location.href = '/deep-cleaning';
        }} 
        onContinueStandard={() => setShowDeepCleaningPopup(false)} 
      />
    </div>
  );
};
