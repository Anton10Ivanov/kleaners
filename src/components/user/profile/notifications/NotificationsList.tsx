
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
  simplified?: boolean;
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
  onNotificationClick,
  simplified = false
}: NotificationsListProps): JSX.Element {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="animate-pulse">
            <div className="flex items-start p-3 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full mr-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-3">
        <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-2 opacity-50" />
        <h3 className="text-base font-medium">No notifications</h3>
        <p className="text-muted-foreground text-sm">
          You're all caught up!
        </p>
      </div>
    );
  }

  return (
    <div>
      {!simplified && unreadCount > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-sm font-medium flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="bg-primary rounded-full px-2 py-0.5 text-xs text-white">
                {unreadCount} unread
              </span>
            )}
          </h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Mark all read</span>
          </Button>
        </div>
      )}
      
      <ScrollArea className={simplified ? "h-[200px]" : "h-[300px]"} pr-3>
        <div className="space-y-1">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id}
              notification={notification}
              onClick={onNotificationClick}
              simplified={simplified}
            />
          ))}
        </div>
      </ScrollArea>
      
      {simplified && unreadCount > 0 && (
        <div className="mt-2 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            <span>Clear all</span>
          </Button>
        </div>
      )}
    </div>
  );
}
