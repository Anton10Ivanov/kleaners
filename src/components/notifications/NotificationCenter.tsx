
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const NotificationCard: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}> = ({ notification, onMarkAsRead }) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'payment':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'system':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'provider':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Link 
      to={notification.link || '#'} 
      className="block"
      onClick={handleClick}
    >
      <div className={`p-3 mb-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${!notification.read ? 'bg-slate-50 dark:bg-slate-900/60' : ''}`}>
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <Badge 
            variant="outline" 
            className={`text-xs px-2 py-0 h-5 ${getTypeColor(notification.type)}`}
          >
            {notification.type}
          </Badge>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {notification.message}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-slate-500">
            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
          </span>
          {!notification.read && (
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          )}
        </div>
      </div>
    </Link>
  );
};

export function NotificationCenter() {
  const { 
    notifications, 
    loading, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setOpen(true)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-primary text-white rounded-full transform translate-x-1 -translate-y-1">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        align="end"
        alignOffset={-5}
        sideOffset={15}
      >
        <div className="flex justify-between items-center p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => {
                markAllAsRead();
                setOpen(false);
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <Separator />
        
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-sm text-slate-500">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-sm text-slate-500">No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <NotificationCard 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </div>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-2">
          <Link to="/user/notifications">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-primary"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
