
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { DeepCleaningPopup } from './DeepCleaningPopup';
import { PropertySizeInput } from './home-details/PropertySizeInput';
import { RoomSelectors } from './home-details/RoomSelectors';
import { CleaningPaceToggle } from './home-details/CleaningPaceToggle';
import { SuggestedDurationDialog } from './duration/SuggestedDurationDialog';
import { DurationControls } from './duration/DurationControls';

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
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showDurationControls, setShowDurationControls] = useState(false);
  const [durationChoiceMade, setDurationChoiceMade] = useState(false);
  
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms');
  const bathrooms = form.watch('bathrooms');
  const cleaningPace = form.watch('cleaningPace') || 'standard';

  // Set default values on mount (only property size and cleaning pace)
  useEffect(() => {
    if (!form.watch('propertySize')) {
      form.setValue('propertySize', 70);
    }
    if (!form.watch('cleaningPace')) {
      form.setValue('cleaningPace', 'standard');
    }
  }, [form]);

  // Check if all required fields are filled (bedrooms and bathrooms must be explicitly selected)
  const allFieldsFilled = propertySize > 0 && 
                          bedrooms !== undefined && bedrooms !== null && 
                          bathrooms !== undefined && bathrooms !== null;

  // Calculate duration with standard pace for popup trigger
  const standardDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms!, bathrooms!, 'standard') : 0;
  const suggestedDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms!, bathrooms!, cleaningPace as 'standard' | 'quick') : 0;

  // Check if deep cleaning should be suggested (based on standard duration before quick adjustment)
  const shouldSuggestDeepCleaning = standardDuration >= 6 || (bathrooms !== undefined && bathrooms >= 3);
  
  // Update form hours when pace changes and duration is already calculated
  useEffect(() => {
    if (allFieldsFilled && durationChoiceMade) {
      const newDuration = estimateDuration(propertySize, bedrooms!, bathrooms!, cleaningPace as 'standard' | 'quick');
      form.setValue('hours', newDuration);
    }
  }, [cleaningPace, allFieldsFilled, durationChoiceMade, propertySize, bedrooms, bathrooms, form]);
  
  useEffect(() => {
    const frequency = form.watch('frequency');
    
    // Show deep cleaning popup for one-time home cleaning when conditions are met
    const shouldShowDeepCleaningPopup = allFieldsFilled && 
                                       shouldSuggestDeepCleaning && 
                                       !durationChoiceMade &&
                                       frequency === 'one-time'; // Show specifically for one-time cleaning
    
    if (shouldShowDeepCleaningPopup) {
      setShowDeepCleaningPopup(true);
    } else if (allFieldsFilled && !durationChoiceMade) {
      // Show duration dialog when all fields are filled and no deep cleaning popup
      setShowDurationDialog(true);
    }
  }, [allFieldsFilled, shouldSuggestDeepCleaning, durationChoiceMade, form, propertySize, bathrooms]);

  const handleDurationChoice = (useSuggested: boolean) => {
    setShowDurationDialog(false);
    setDurationChoiceMade(true);
    
    if (useSuggested) {
      form.setValue('hours', suggestedDuration);
      if (onSuggestedTimeSelect) {
        onSuggestedTimeSelect(suggestedDuration);
      }
    }
    
    setShowDurationControls(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Home Size */}
        <PropertySizeInput form={form} />

        {/* Bedrooms & Bathrooms */}
        <RoomSelectors form={form} />

        {/* Duration Controls - show after choice is made */}
        <DurationControls form={form} visible={showDurationControls} />

        {/* Preferred Cleaning Pace - Toggle Switch */}
        <CleaningPaceToggle form={form} />
      </div>

      {/* Suggested Duration Dialog */}
      <SuggestedDurationDialog
        isOpen={showDurationDialog}
        onChoice={handleDurationChoice}
        suggestedDuration={suggestedDuration}
        propertySize={propertySize}
        bedrooms={bedrooms || 0}
        bathrooms={bathrooms || 0}
        cleaningPace={cleaningPace}
      />

      {/* Deep Cleaning Popup */}
      <DeepCleaningPopup 
        isOpen={showDeepCleaningPopup} 
        onClose={() => setShowDeepCleaningPopup(false)} 
        onSwitchToDeepCleaning={() => {
          window.location.href = '/deep-cleaning';
        }} 
        onContinueStandard={() => {
          setShowDeepCleaningPopup(false);
          setShowDurationDialog(true);
        }} 
      />
    </div>
  );
};
