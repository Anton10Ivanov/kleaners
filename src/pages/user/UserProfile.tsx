
import React, { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Bell, ChevronDown, ChevronUp, FileText, User } from 'lucide-react';
import { AccountInfoCard } from '@/components/user/profile/AccountInfoCard';
import { SecuritySettings } from '@/components/user/profile/SecuritySettings';
import { NotificationSettings } from '@/components/user/profile/NotificationSettings';
import { AccountPreferences } from '@/components/user/profile/AccountPreferences';
import { AvatarSection } from '@/components/user/profile/AvatarSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

/**
 * UserProfile Page
 * 
 * Displays and manages user profile information
 * 
 * @returns {JSX.Element} User profile page component
 */
export default function UserProfile(): JSX.Element {
  useTitle("Your Profile | Kleaners");
  
  const {
    profile,
    isLoading: profileLoading,
    error: profileError,
    updateProfile,
    updateAvatar,
    passwordStrength,
    checkPasswordStrength,
    changePassword
  } = useUserProfileData();

  const {
    notifications,
    loading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();
  
  // Loading state for profile
  if (profileLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-8 w-48 mb-4" />
        </div>
        
        <Card>
          <CardContent className="mt-6">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (profileError) {
    return (
      <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
        <h2 className="text-xl font-semibold">Error Loading Profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{profileError.message}</p>
      </div>
    );
  }
  
  // No profile data
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2>No profile data available</h2>
      </div>
    );
  }

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
        return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-blue-500" />
        </div>;
      case 'payment':
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-green-500" />
        </div>;
      case 'provider':
        return <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-purple-500" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-gray-500" />
        </div>;
    }
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Avatar and name section */}
      <div className="flex flex-col items-center mb-8">
        <AvatarSection
          avatarUrl={profile.avatarUrl}
          fullName={profile.fullName}
          onUpdateAvatar={updateAvatar}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {/* Account Information Accordion */}
        <AccordionItem value="account-info" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Account Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountInfoCard
              profile={profile}
              onSave={updateProfile}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Security Settings Accordion */}
        <AccordionItem value="security" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Security Settings</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <SecuritySettings
              passwordStrength={passwordStrength}
              onPasswordCheck={checkPasswordStrength}
              onPasswordChange={changePassword}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Notification Settings Accordion */}
        <AccordionItem value="notification-prefs" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Notification Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <NotificationSettings
              preferences={profile.notificationPreferences}
              onSave={(prefs) => updateProfile({ notificationPreferences: prefs })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Account Preferences Accordion */}
        <AccordionItem value="account-prefs" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span className="font-semibold">Account Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <AccountPreferences
              preferences={profile.accountPreferences}
              onSave={(prefs) => updateProfile({ accountPreferences: prefs })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Notifications Accordion */}
        <AccordionItem value="notifications" className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                <span className="font-semibold">Recent Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {unreadCount}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  Mark all as read
                </Button>
              )}
            </div>
            
            {notificationsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    </CardContent>
                  </Card>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
