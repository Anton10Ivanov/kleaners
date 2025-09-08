import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StandardizedFormField, FormSection } from '../StandardizedFormField';
import { StandardizedFormLayout, FormFieldGroup } from '../StandardizedFormLayout';
import { ServiceConfig } from '../config/ServiceConfig';

interface ServiceConfigurationStepProps {
  form: UseFormReturn<any>;
  config: ServiceConfig;
  serviceTypeOptions: Array<{ value: string; label: string }>;
}

export const ServiceConfigurationStep: React.FC<ServiceConfigurationStepProps> = ({
  form,
  config,
  serviceTypeOptions
}) => {
  return (
    <div className="space-y-6">
      {/* Service Type */}
      <FormFieldGroup title="Service Type" description="Choose the type of cleaning service you need">
        <StandardizedFormField
          form={form}
          name="serviceType"
          type="select"
          label="Service Type"
          options={serviceTypeOptions}
          required
        />
      </FormFieldGroup>

      {/* Service Configuration */}
      <FormFieldGroup title="Service Configuration" columns={2}>
        <StandardizedFormField
          form={form}
          name="hours"
          type="number"
          label="Duration (hours)"
          placeholder="Enter hours"
          validation={{ min: 1, max: config.maxHours }}
          required
        />
        <StandardizedFormField
          form={form}
          name="frequency"
          type="select"
          label="Frequency"
          options={[
            { value: 'one-time', label: 'One-time' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'biweekly', label: 'Bi-weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]}
          required
        />
      </FormFieldGroup>

      {/* Property Details */}
      <FormFieldGroup title="Property Details" columns={2}>
        <StandardizedFormField
          form={form}
          name="propertySize"
          type="number"
          label="Property Size (sqm)"
          placeholder="Enter square meters"
          validation={{ min: 1 }}
          required
        />
        <StandardizedFormField
          form={form}
          name="propertyType"
          type="select"
          label="Property Type"
          options={[
            { value: 'apartment', label: 'Apartment' },
            { value: 'house', label: 'House' },
            { value: 'condo', label: 'Condo' },
            { value: 'other', label: 'Other' }
          ]}
          required
        />
      </FormFieldGroup>
    </div>
  );
};
