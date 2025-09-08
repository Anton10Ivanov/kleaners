
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications } from '@/components/providers/NotificationsProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export const NotificationsPopover = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 card-spacing-none" align="end">
        <div className="flex items-center justify-between border-b px-4 section-spacing-xs">
          <h3 className="font-medium">Notifications</h3>
          {hasNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        {hasNotifications ? (
          <ScrollArea className="h-80">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex cursor-pointer flex-col gap-1 px-4 py-3 hover:bg-muted/50",
                    !notification.read && "bg-muted/30"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-20 items-center justify-center">
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
