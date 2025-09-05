
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccountPreferences as AccountPreferencesType } from '@/hooks/useUserProfileData';

interface AccountPreferencesProps {
  /** User's account preferences */
  preferences: AccountPreferencesType;

  /** Function to save updated preferences */
  onSave: (prefs: AccountPreferencesType) => Promise<void>;
}

/**
 * AccountPreferences Component
 * 
 * Manages account preferences for the user
 * 
 * @param {AccountPreferencesProps} props Component props
 * @returns {JSX.Element} Account preferences component
 */
export function AccountPreferences({
  preferences,
  onSave
}: AccountPreferencesProps): JSX.Element {
  const [formData, setFormData] = useState<AccountPreferencesType>({
    ...preferences
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handleToggleChange = (key: keyof AccountPreferencesType) => {
    if (typeof formData[key] === 'boolean') {
      setFormData(prev => {
        const newValue = !prev[key];
        const newData = {
          ...prev,
          [key]: newValue
        } as AccountPreferencesType;

        // Check if any values differ from original
        const anyChanges = Object.keys(newData).some(k => 
          newData[k as keyof AccountPreferencesType] !== preferences[k as keyof AccountPreferencesType]
        );
        setHasChanges(anyChanges);
        return newData;
      });
    }
  };
  
  const handleSelectChange = (value: string, key: keyof AccountPreferencesType) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [key]: value
      } as AccountPreferencesType;

      // Check if any values differ from original
      const anyChanges = Object.keys(newData).some(k => 
        newData[k as keyof AccountPreferencesType] !== preferences[k as keyof AccountPreferencesType]
      );
      setHasChanges(anyChanges);
      return newData;
    });
  };
  
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="language" className="text-foreground">Preferred Language</Label>
        <Select value={formData.language} onValueChange={value => handleSelectChange(value, 'language')}>
          <SelectTrigger id="language" className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="showEmail" className="text-foreground">Show Email</Label>
          <div className="text-sm text-muted-foreground">
            Make your email visible to service providers
          </div>
        </div>
        <Switch 
          id="showEmail" 
          checked={formData.showEmail} 
          onCheckedChange={() => handleToggleChange('showEmail')} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="showPhone" className="text-foreground">Show Phone Number</Label>
          <div className="text-sm text-muted-foreground">
            Make your phone number visible to service providers
          </div>
        </div>
        <Switch 
          id="showPhone" 
          checked={formData.showPhone} 
          onCheckedChange={() => handleToggleChange('showPhone')} 
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSubmit} 
          disabled={!hasChanges || isSaving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
