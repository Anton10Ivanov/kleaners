
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { NotificationPreferences } from '@/hooks/useUserProfileData';

interface NotificationSettingsProps {
  /** User's notification preferences */
  preferences: NotificationPreferences;
  
  /** Function to save updated preferences */
  onSave: (prefs: NotificationPreferences) => Promise<void>;
}

/**
 * NotificationSettings Component
 * 
 * Manages notification preferences for the user
 * 
 * @param {NotificationSettingsProps} props Component props
 * @returns {JSX.Element} Notification settings component
 */
export function NotificationSettings({
  preferences,
  onSave
}: NotificationSettingsProps): JSX.Element {
  const [formData, setFormData] = useState<NotificationPreferences>({ ...preferences });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handleChange = (key: keyof NotificationPreferences) => {
    setFormData(prev => {
      const newValue = !prev[key];
      const newData = { ...prev, [key]: newValue };
      
      // Check if any values differ from original
      const anyChanges = Object.keys(newData).some(
        k => newData[k as keyof NotificationPreferences] !== preferences[k as keyof NotificationPreferences]
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
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Control how you receive notifications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emailBookingUpdates">Email Booking Updates</Label>
            <div className="text-sm text-muted-foreground">
              Receive updates about your booking status
            </div>
          </div>
          <Switch
            id="emailBookingUpdates"
            checked={formData.emailBookingUpdates}
            onCheckedChange={() => handleChange('emailBookingUpdates')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emailPromotions">Email Promotions</Label>
            <div className="text-sm text-muted-foreground">
              Receive promotional offers and deals
            </div>
          </div>
          <Switch
            id="emailPromotions"
            checked={formData.emailPromotions}
            onCheckedChange={() => handleChange('emailPromotions')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="smsReminders">SMS Reminders</Label>
            <div className="text-sm text-muted-foreground">
              Receive text message reminders for upcoming appointments
            </div>
          </div>
          <Switch
            id="smsReminders"
            checked={formData.smsReminders}
            onCheckedChange={() => handleChange('smsReminders')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Receive push notifications on your devices
            </div>
          </div>
          <Switch
            id="pushNotifications"
            checked={formData.pushNotifications}
            onCheckedChange={() => handleChange('pushNotifications')}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
}
