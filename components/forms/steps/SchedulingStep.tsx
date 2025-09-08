'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StandardizedFormField, FormSection } from '../StandardizedFormField';
import { StandardizedFormLayout, FormFieldGroup } from '../StandardizedFormLayout';
import { FormCalendar } from '@/components/calendar/FormCalendar';

interface SchedulingStepProps {
  form: UseFormReturn<any>;
  cleaners: any[];
  bookingRules: any;
}

export const SchedulingStep: React.FC<SchedulingStepProps> = ({
  form,
  cleaners,
  bookingRules
}) => {
  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <FormFieldGroup title="Select Date" description="Choose your preferred cleaning date">
        <FormCalendar
          form={form}
          cleaners={cleaners}
          bookingRules={bookingRules}
        />
      </FormFieldGroup>

      {/* Time Selection */}
      <FormFieldGroup title="Select Time" description="Choose your preferred time slot">
        <StandardizedFormField
          form={form}
          name="selectedTime"
          type="select"
          label="Time Slot"
          options={[
            { value: 'morning', label: 'Morning (8:00 - 12:00)' },
            { value: 'afternoon', label: 'Afternoon (12:00 - 16:00)' },
            { value: 'evening', label: 'Evening (16:00 - 20:00)' }
          ]}
          required
        />
      </FormFieldGroup>

      {/* Cleaner Preference */}
      <FormFieldGroup title="Cleaner Preference" description="Optional: Specify any cleaner preferences">
        <StandardizedFormField
          form={form}
          name="cleanerPreference"
          type="select"
          label="Preferred Cleaner"
          options={[
            { value: 'any', label: 'Any available cleaner' },
            ...cleaners.map(cleaner => ({
              value: cleaner.id,
              label: cleaner.name
            }))
          ]}
        />
      </FormFieldGroup>
    </div>
  );
};
