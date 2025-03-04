
import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ProfileTabsProps {
  /** Active tab identifier */
  activeTab: string;
  
  /** Callback for tab change */
  onTabChange: (value: string) => void;
  
  /** Tab content elements */
  children: ReactNode;
}

/**
 * ProfileTabs Component
 * 
 * Displays tabbed interface for user profile sections
 * 
 * @param {ProfileTabsProps} props Component props
 * @returns {JSX.Element} Profile tabs component
 */
export function ProfileTabs({
  activeTab,
  onTabChange,
  children
}: ProfileTabsProps): JSX.Element {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="account" aria-label="Account Information">
          Account
        </TabsTrigger>
        <TabsTrigger value="security" aria-label="Security Settings">
          Security
        </TabsTrigger>
        <TabsTrigger value="notifications" aria-label="Notification Preferences">
          Notifications
        </TabsTrigger>
        <TabsTrigger value="preferences" aria-label="Account Preferences">
          Preferences
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
}
