
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PreferenceItemProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

/**
 * PreferenceItem Component
 * 
 * Displays a single notification preference with a switch
 * 
 * @param {PreferenceItemProps} props Component props
 * @returns {JSX.Element} Preference item component
 */
export function PreferenceItem({
  id,
  label,
  description,
  checked,
  onChange
}: PreferenceItemProps): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}
