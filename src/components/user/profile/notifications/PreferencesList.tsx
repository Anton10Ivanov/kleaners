
import React from 'react';
import { PreferenceItem } from './PreferenceItem';
import { NotificationPreferences } from '@/hooks/useUserProfileData';

interface PreferencesListProps {
  preferences: NotificationPreferences;
  onChange: (key: keyof NotificationPreferences) => void;
}

/**
 * PreferencesList Component
 * 
 * Displays a list of notification preferences
 * 
 * @param {PreferencesListProps} props Component props
 * @returns {JSX.Element} Preferences list component
 */
export function PreferencesList({
  preferences,
  onChange
}: PreferencesListProps): JSX.Element {
  const preferencesConfig = [
    {
      id: 'emailBookingUpdates',
      label: 'Email Booking Updates',
      description: 'Receive updates about your booking status',
    },
    {
      id: 'emailPromotions',
      label: 'Email Promotions',
      description: 'Receive promotional offers and deals',
    },
    {
      id: 'smsReminders',
      label: 'SMS Reminders',
      description: 'Receive text message reminders for upcoming appointments',
    },
    {
      id: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive push notifications on your devices',
    },
  ];

  return (
    <div className="space-y-6">
      {preferencesConfig.map((config) => (
        <PreferenceItem
          key={config.id}
          id={config.id}
          label={config.label}
          description={config.description}
          checked={preferences[config.id as keyof NotificationPreferences]}
          onChange={() => onChange(config.id as keyof NotificationPreferences)}
        />
      ))}
    </div>
  );
}
