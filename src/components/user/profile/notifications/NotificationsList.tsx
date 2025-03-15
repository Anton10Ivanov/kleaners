
import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsListProps {
  notifications: any[];
  loading: boolean;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: any) => void;
}

/**
 * NotificationsList Component
 * 
 * Displays a list of notifications with loading and empty states
 * 
 * @param {NotificationsListProps} props Component props
 * @returns {JSX.Element} Notifications list component
 */
export function NotificationsList({
  notifications,
  loading,
  unreadCount,
  onMarkAllAsRead,
  onNotificationClick
}: NotificationsListProps): JSX.Element {
  if (loading) {
    return (
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
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-6">
        <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
        <h3 className="text-lg font-medium">No notifications</h3>
        <p className="text-muted-foreground">
          You're all caught up! No notifications to display.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          Recent Activity
          {unreadCount > 0 && (
            <span className="bg-primary rounded-full px-2 py-0.5 text-xs text-white">
              {unreadCount} unread
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-1">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id}
              notification={notification}
              onClick={onNotificationClick}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
