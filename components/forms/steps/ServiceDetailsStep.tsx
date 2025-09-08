'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StandardizedFormField, FormSection } from '../StandardizedFormField';
import { StandardizedFormLayout, FormFieldGroup } from '../StandardizedFormLayout';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Service-specific components
import EnhancedDeepCleaningFields from '../../booking/deep-cleaning/EnhancedDeepCleaningFields';
import MoveInOutFields from '../../booking/move-in-out/MoveInOutFields';
import PostConstructionFields from '../../booking/post-construction/PostConstructionFields';
import HomeDetailsSection from '../../booking/home/HomeDetailsSection';

interface ServiceDetailsStepProps {
  form: UseFormReturn<any>;
  serviceType: string;
  selectedExtras: string[];
  onExtrasChange: (extras: string[]) => void;
}

const EXTRAS_OPTIONS = [
  { id: 'windows', label: 'Window Cleaning', price: 25 },
  { id: 'appliances', label: 'Appliance Cleaning', price: 30 },
  { id: 'cabinets', label: 'Cabinet Cleaning', price: 20 },
  { id: 'lighting', label: 'Light Fixture Cleaning', price: 15 },
  { id: 'baseboards', label: 'Baseboard Cleaning', price: 10 },
  { id: 'blinds', label: 'Blind Cleaning', price: 35 }
];

export const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  form,
  serviceType,
  selectedExtras,
  onExtrasChange
}) => {
  const handleExtraChange = (extraId: string, checked: boolean) => {
    if (checked) {
      onExtrasChange([...selectedExtras, extraId]);
    } else {
      onExtrasChange(selectedExtras.filter(id => id !== extraId));
    }
  };

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case 'home-cleaning':
        return <HomeDetailsSection form={form} />;
      case 'deep-cleaning':
        return <EnhancedDeepCleaningFields form={form} />;
      case 'move-in-out':
        return <MoveInOutFields form={form} />;
      case 'post-construction':
        return <PostConstructionFields form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Service-specific fields */}
      {renderServiceSpecificFields()}

      {/* Additional Services */}
      <FormFieldGroup 
        title="Additional Services" 
        description="Select any additional services you'd like to include"
      >
        <div className="grid grid-cols-2 gap-4">
          {EXTRAS_OPTIONS.map((extra) => (
            <div key={extra.id} className="flex items-center space-x-2">
              <Checkbox
                id={extra.id}
                checked={selectedExtras.includes(extra.id)}
                onCheckedChange={(checked) => handleExtraChange(extra.id, checked as boolean)}
              />
              <Label htmlFor={extra.id} className="flex-1">
                {extra.label}
              </Label>
              <span className="text-sm text-muted-foreground">
                +€{extra.price}
              </span>
            </div>
          ))}
        </div>
      </FormFieldGroup>

      {/* Special Instructions */}
      <FormFieldGroup title="Special Instructions" description="Any specific requirements or notes">
        <StandardizedFormField
          form={form}
          name="specialInstructions"
          type="textarea"
          label="Special Instructions"
          placeholder="Please describe any specific requirements, areas to focus on, or special instructions..."
          rows={4}
        />
      </FormFieldGroup>
    </div>
  );
};
