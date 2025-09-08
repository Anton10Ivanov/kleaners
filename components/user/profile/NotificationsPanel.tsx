
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NotificationPreferences } from '@/hooks/useUserProfileData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';
import { NotificationsList } from './notifications/NotificationsList';
import { PreferencesList } from './notifications/PreferencesList';

interface NotificationsPanelProps {
  /** User's notification preferences */
  preferences: NotificationPreferences;
  
  /** Function to save updated preferences */
  onSave: (prefs: NotificationPreferences) => Promise<void>;
}

/**
 * NotificationsPanel Component
 * 
 * Combines notification preferences and recent notifications in a tabbed interface
 * 
 * @param {NotificationsPanelProps} props Component props
 * @returns {JSX.Element} Notifications panel component
 */
export function NotificationsPanel({
  preferences,
  onSave
}: NotificationsPanelProps): JSX.Element {
  const [formData, setFormData] = useState<NotificationPreferences>({ ...preferences });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const {
    notifications,
    loading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();
  
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
  
  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleClearAll = () => {
    toast.success('All notifications marked as read');
    markAllAsRead();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardDescription className="text-zinc-800 font-normal text-base">Notifications</CardDescription>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </CardHeader>
      
      <Tabs defaultValue="recent" className="w-full">
        <CardContent>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recent">Recent Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Notification Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-2">
            <NotificationsList
              notifications={notifications}
              loading={notificationsLoading}
              unreadCount={unreadCount}
              onMarkAllAsRead={handleClearAll}
              onNotificationClick={handleNotificationClick}
            />
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-2">
            <PreferencesList
              preferences={formData}
              onChange={handleChange}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-end border-t pt-4">
        {hasChanges && (
          <Button
            onClick={handleSubmit}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
