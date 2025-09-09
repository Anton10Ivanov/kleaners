'use client'


import React, { useState } from "react";
import { useUserProfileData } from '@/hooks/useUserProfileData';
import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Calendar, Clock, Star, MessageSquare, Bell, X } from "lucide-react";
import { NotificationsList } from '@/components/user/profile/notifications/NotificationsList';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatInterface from '@/components/chat/ChatInterface';
import ConversationList from '@/components/chat/ConversationList';
import { createConversation } from '@/utils/chat';
import { useToast } from '@/hooks/use-toast';

/**
 * ClientDashboard component 
 * 
 * This component represents the client dashboard page optimized for service booking companies
 */
const ClientDashboard = () => {
  const { profile } = useUserProfileData();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const userId = "user123"; // In a real app, get this from auth state
  
  const {
    notifications,
    loading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications();

  // Messages state
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    participantId: string;
    participantName: string;
  } | null>(null);
  const [showMessages, setShowMessages] = useState(false);

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleClearAll = () => {
    toast({
      title: "Success",
      description: "All notifications marked as read"
    });
    markAllAsRead();
  };

  const handleSelectConversation = (
    conversationId: string,
    participantId: string,
    participantName: string
  ) => {
    setSelectedConversation({
      id: conversationId,
      participantId,
      participantName
    });
  };

  const handleNewConversation = async () => {
    try {
      const recipientId = "provider456";
      const recipientName = "Service Provider";
      
      const conversationId = await createConversation(userId, recipientId);
      handleSelectConversation(conversationId, recipientId, recipientName);
      
      toast({
        title: "New conversation created",
        description: `You can now chat with ${recipientName}`,
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Failed to create conversation",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  // Extract the first name from the fullName if available
  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : '';

  return (
    <div className="container mx-auto section-spacing-sm px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome{firstName ? `, ${firstName}` : ''}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Book Now</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Schedule your next cleaning service</p>
            <button 
              onClick={() => window.location.href = '/booking'}
              className="w-full px-4 section-spacing-xs bg-primary text-white rounded-md text-sm"
            >
              Book a Service
            </button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Clock className="h-5 w-5 text-indigo-500" />
              <span>Upcoming Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">View your upcoming scheduled services</p>
            <button 
              onClick={() => window.location.href = '/client/bookings'}
              className="w-full px-4 section-spacing-xs bg-indigo-500 text-white rounded-md text-sm"
            >
              View Schedule
            </button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Star className="h-5 w-5 text-amber-500" />
              <span>Rate Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-4">Rate and review your completed services</p>
            <button 
              onClick={() => window.location.href = '/client/bookings?filter=completed'}
              className="w-full px-4 section-spacing-xs bg-amber-500 text-white rounded-md text-sm"
            >
              Leave Feedback
            </button>
          </CardContent>
        </Card>
      </div>
      
      {/* Notifications Section - Compact for live updates */}
      <Card className="bg-white dark:bg-gray-800 shadow mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Live Updates
            </CardTitle>
            {unreadCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <CardDescription className="text-sm">
            Real-time updates on your cleaning services
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="max-h-32 overflow-y-auto">
            <NotificationsList
              notifications={notifications.slice(0, 3)} // Show only 3 most recent
              loading={notificationsLoading}
              unreadCount={unreadCount}
              onMarkAllAsRead={handleClearAll}
              onNotificationClick={handleNotificationClick}
              simplified={true}
            />
          </div>
          {notifications.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => window.location.href = '/client/notifications'}
            >
              View All Updates
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Messages Section */}
      <Card className="bg-white dark:bg-gray-800 shadow mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Messages
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowMessages(!showMessages)}
            >
              {showMessages ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              {showMessages ? 'Hide' : 'Show'} Messages
            </Button>
          </div>
          <CardDescription className="text-sm">
            Chat with your service providers
          </CardDescription>
        </CardHeader>
        {showMessages && (
          <CardContent className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
              <div className="md:col-span-1">
                <ConversationList
                  userId={userId}
                  selectedConversationId={selectedConversation?.id}
                  onSelectConversation={handleSelectConversation}
                  onNewConversation={handleNewConversation}
                />
              </div>
              
              <div className="md:col-span-2">
                {selectedConversation ? (
                  <ChatInterface
                    conversationId={selectedConversation.id}
                    userId={userId}
                    recipientId={selectedConversation.participantId}
                    recipientName={selectedConversation.participantName}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center border rounded-lg">
                    <div className="text-center">
                      <h3 className="font-medium mb-2">No conversation selected</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        Select a conversation or start a new one
                      </p>
                      <Button
                        onClick={handleNewConversation}
                        size="sm"
                        className="bg-primary text-primary-foreground"
                      >
                        Start New Chat
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
    </div>
  );
};

export default ClientDashboard;
