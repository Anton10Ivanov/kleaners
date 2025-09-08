'use client'


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'system' | 'provider';
  read: boolean;
  link?: string;
  createdAt: Date;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // This would be a real Supabase query in production
      // For now, we'll use mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Booking Confirmed',
          message: 'Your cleaning appointment for May 15th has been confirmed.',
          type: 'booking',
          read: false,
          link: '/client/bookings',
          createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: '2',
          title: 'Cleaner Assigned',
          message: 'Maria has been assigned to your upcoming cleaning appointment.',
          type: 'provider',
          read: true,
          link: '/client/bookings',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: '3',
          title: 'Review Request',
          message: 'Please rate your recent cleaning service with John.',
          type: 'system',
          read: false,
          link: '/client/bookings',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        },
        {
          id: '4',
          title: 'Payment Processed',
          message: 'Your payment of $120 for the cleaning service has been processed.',
          type: 'payment',
          read: true,
          link: '/client/bookings',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
        },
        {
          id: '5',
          title: 'Special Offer',
          message: 'Get 15% off your next deep cleaning service!',
          type: 'system',
          read: false,
          link: '/client/bookings',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // In production, this would update the database
      // For now, we'll just update the local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // This would be real in production:
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('id', id);
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast.error('Failed to update notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update all notifications to read
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Reset unread count
      setUnreadCount(0);
      
      // In production:
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('user_id', userId);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      toast.error('Failed to update notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // In production, we would set up a real-time subscription
    // to listen for new notifications
    // 
    // const subscription = supabase
    //   .channel('public:notifications')
    //   .on(...)
    //   .subscribe();
    // 
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
}
