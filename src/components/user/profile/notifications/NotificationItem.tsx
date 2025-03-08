
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    createdAt: Date;
    read: boolean;
  };
  onClick: (notification: any) => void;
}

/**
 * NotificationItem Component
 * 
 * Displays a single notification item with appropriate styling
 * 
 * @param {NotificationItemProps} props Component props
 * @returns {JSX.Element} Notification item component
 */
export function NotificationItem({ notification, onClick }: NotificationItemProps): JSX.Element {
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
    <div>
      <div 
        className={`flex items-start p-3 hover:bg-muted/50 cursor-pointer rounded-lg transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
        onClick={() => onClick(notification)}
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
  );
}
