import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PropertySizeField } from './fields/PropertySizeField';
import { ServiceLevelField } from './fields/ServiceLevelField';
import { FrequencyField } from './fields/FrequencyField';

interface WebFriendlyFieldsRefactoredProps {
  form: UseFormReturn<any>;
}

export const WebFriendlyFieldsRefactored: React.FC<WebFriendlyFieldsRefactoredProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <PropertySizeField form={form} />
      <ServiceLevelField form={form} />
      <FrequencyField form={form} />
    </div>
  );
};
