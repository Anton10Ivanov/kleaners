'use client'

import React from 'react';
import { cn } from '@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card";
import { Badge } from '@/components/ui/badge";
import { ScrollArea } from '@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar";
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations";

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar?: string;
    role: 'provider' | 'admin';
    status: 'online' | 'offline' | 'away';
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  bookingId?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
  showConversations?: boolean;
  onToggleConversations?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  showConversations = true,
  onToggleConversations
}) => {
  const { getMobileSpacing, getComponentSpacing } = useMobileOptimizations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'provider': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="card-primary h-full rounded-none">
      <CardHeader className={getMobileSpacing('md')}>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 card-spacing-none">
        <ScrollArea className="h-full">
          <div className="component-spacing-xs card-spacing-sm">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  onConversationSelect(conversation.id);
                  onToggleConversations?.();
                }}
                className={cn(
                  "flex items-center gap-3 card-spacing-xs hover:bg-muted/50 rounded-lg cursor-pointer transition-colors",
                  activeConversationId === conversation.id && "bg-primary/10"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.participant.avatar} />
                    <AvatarFallback>
                      {conversation.participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                    getStatusColor(conversation.participant.status)
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                      {conversation.participant.name}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getRoleBadgeColor(conversation.participant.role))}
                    >
                      {conversation.participant.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversation.lastMessageTime}
                  </p>
                </div>
                
                {conversation.unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
