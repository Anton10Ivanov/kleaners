
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { NotificationPreferences } from '@/hooks/useUserProfileData';
import { Bell, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
          <Bell className="h-5 w-5 text-blue-500" />
        </div>;
      case 'payment':
        return <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
          <FileText className="h-5 w-5 text-green-500" />
        </div>;
      case 'provider':
        return <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
          <Bell className="h-5 w-5 text-purple-500" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Bell className="h-5 w-5 text-gray-500" />
        </div>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <CardDescription>
          Manage your notifications and preferences
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="recent" className="w-full">
        <CardContent>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recent">Recent Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Notification Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-2">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Mark all as read
                </Button>
              )}
            </div>
            
            {notificationsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-start p-3 rounded-lg">
                      <Skeleton className="h-10 w-10 rounded-full mr-4" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground">
                  You don't have any notifications yet
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div key={notification.id}>
                    <div 
                      className={`flex items-start p-3 hover:bg-muted/50 cursor-pointer rounded-lg transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium mb-1 ${!notification.read ? 'text-primary' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6 mt-2">
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
