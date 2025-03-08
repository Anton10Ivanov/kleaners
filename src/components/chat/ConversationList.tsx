
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquarePlus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserConversations, getUnreadMessageCount } from '@/utils/chatUtils';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface ConversationListProps {
  userId: string;
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string, participantId: string, participantName: string) => void;
  onNewConversation: () => void;
}

export const ConversationList = ({
  userId,
  selectedConversationId,
  onSelectConversation,
  onNewConversation
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchConversations();
  }, [userId]);
  
  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const conversationsData = await getUserConversations(userId);
      setConversations(conversationsData);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const subscription = supabase
      .channel('new_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${userId}`,
      }, () => {
        fetchConversations();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  const filteredConversations = searchQuery.trim() === ''
    ? conversations
    : conversations.filter(conversation => 
        conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
  const renderConversationItem = (conversation: any) => {
    const isSelected = selectedConversationId === conversation.id;
    const hasUnread = conversation.unreadCount > 0;
    
    return (
      <div
        key={conversation.id}
        className={cn(
          "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
          isSelected 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted",
          hasUnread && !isSelected && "bg-accent/20"
        )}
        onClick={() => onSelectConversation(
          conversation.id, 
          conversation.participant.id,
          conversation.participant.name
        )}
      >
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={`https://avatar.vercel.sh/${conversation.participant.id}`} />
          <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className={cn(
              "font-medium truncate",
              hasUnread && !isSelected && "font-bold"
            )}>
              {conversation.participant.name}
            </h4>
            
            {conversation.latestMessage && (
              <span className={cn(
                "text-xs",
                isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {formatDistanceToNow(conversation.latestMessage.sent_at, { addSuffix: false })}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {conversation.latestMessage?.isFromMe && (
              <Check className={cn(
                "h-3 w-3 flex-shrink-0",
                conversation.latestMessage.is_read 
                  ? "text-green-500" 
                  : "text-gray-400"
              )} />
            )}
            
            <p className={cn(
              "text-sm truncate",
              isSelected 
                ? "text-primary-foreground/70" 
                : "text-muted-foreground",
              hasUnread && !isSelected && "text-foreground font-medium"
            )}>
              {conversation.latestMessage 
                ? (conversation.latestMessage.attachments?.length 
                    ? '📎 Attachment' 
                    : conversation.latestMessage.content || 'New message')
                : 'No messages yet'}
            </p>
            
            {hasUnread && !isSelected && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden bg-background">
      <div className="p-3 border-b">
        <h3 className="font-medium mb-3">Messages</h3>
        
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Button
            size="icon"
            onClick={onNewConversation}
            title="New conversation"
          >
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-3 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {searchQuery.trim() !== '' 
              ? 'No conversations matching your search.' 
              : 'No conversations yet.'}
          </div>
        ) : (
          <div className="divide-y">
            {filteredConversations.map(renderConversationItem)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
