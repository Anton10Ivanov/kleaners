'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StandardizedFormField, FormSection } from '../StandardizedFormField';
import { StandardizedFormLayout, FormFieldGroup } from '../StandardizedFormLayout';

interface ContactDetailsStepProps {
  form: UseFormReturn<any>;
}

export const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <FormFieldGroup title="Personal Information" description="Your contact details">
        <div className="grid grid-cols-2 gap-4">
          <StandardizedFormField
            form={form}
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            required
          />
          <StandardizedFormField
            form={form}
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <StandardizedFormField
            form={form}
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          <StandardizedFormField
            form={form}
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </FormFieldGroup>

      {/* Address Information */}
      <FormFieldGroup title="Address Information" description="Where should we clean?">
        <StandardizedFormField
          form={form}
          name="address"
          type="text"
          label="Street Address"
          placeholder="Enter your street address"
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <StandardizedFormField
            form={form}
            name="city"
            type="text"
            label="City"
            placeholder="Enter your city"
            required
          />
          <StandardizedFormField
            form={form}
            name="postalCode"
            type="text"
            label="Postal Code"
            placeholder="Enter postal code"
            required
          />
        </div>
      </FormFieldGroup>

      {/* Access Information */}
      <FormFieldGroup title="Access Information" description="How should we access your property?">
        <StandardizedFormField
          form={form}
          name="accessMethod"
          type="select"
          label="Access Method"
          options={[
            { value: 'key', label: 'I will provide a key' },
            { value: 'keypad', label: 'Keypad code' },
            { value: 'doorman', label: 'Doorman will let us in' },
            { value: 'meet', label: 'I will meet the cleaner' },
            { value: 'other', label: 'Other (specify in notes)' }
          ]}
          required
        />
        
        <StandardizedFormField
          form={form}
          name="accessInstructions"
          type="textarea"
          label="Access Instructions"
          placeholder="Any specific instructions for accessing your property..."
          rows={3}
        />
      </FormFieldGroup>
    </div>
  );
};
