
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  lastMessage: {
    content: string;
    sent_at: Date;
    is_read: boolean;
  };
  participant: {
    id: string;
    name: string;
    avatar?: string;
    isTyping?: boolean;
  };
  unreadCount: number;
}

interface ConversationListProps {
  userId: string;
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string, participantId: string, participantName: string) => void;
  onNewConversation?: () => void;
}

export const ConversationList = ({
  userId,
  selectedConversationId,
  onSelectConversation,
  onNewConversation
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        // Fetch conversations with the most recent message
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            id,
            participants:conversation_participants(
              user_id,
              user:profiles(id, first_name, last_name)
            ),
            messages:messages(
              id, content, sent_at, is_read, sender_id, recipient_id
            )
          `)
          .or(`participants.user_id.eq.${userId}`)
          .order('updated_at', { ascending: false });
          
        if (error) throw error;
        
        // Process the data to get the format we need
        const processedConversations = data.map((conversation: any) => {
          // Filter out messages involving the current user
          const relevantMessages = conversation.messages.filter(
            (message: any) => message.sender_id === userId || message.recipient_id === userId
          );
          
          // Sort messages by date
          const sortedMessages = relevantMessages.sort(
            (a: any, b: any) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
          );
          
          // Get the last message
          const lastMessage = sortedMessages[0] || null;
          
          // Get unread count
          const unreadCount = relevantMessages.filter(
            (message: any) => message.recipient_id === userId && !message.is_read
          ).length;
          
          // Find the other participant (not the current user)
          const otherParticipant = conversation.participants.find(
            (p: any) => p.user_id !== userId
          );
          
          const participantUser = otherParticipant?.user;
          const participantName = participantUser 
            ? `${participantUser.first_name} ${participantUser.last_name}`
            : 'Unknown';
            
          return {
            id: conversation.id,
            lastMessage: lastMessage ? {
              content: lastMessage.content,
              sent_at: new Date(lastMessage.sent_at),
              is_read: lastMessage.is_read
            } : null,
            participant: {
              id: otherParticipant?.user_id || '',
              name: participantName,
              avatar: undefined
            },
            unreadCount
          };
        });
        
        setConversations(processedConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
    
    // Set up real-time subscription for typing indicators
    const typingSubscription = supabase
      .channel('typing_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'typing_indicators'
        },
        (payload) => {
          const typingData = payload.new as {
            conversation_id: string;
            user_id: string;
            is_typing: boolean;
          };
          
          if (typingData.user_id !== userId) {
            setConversations(prevConversations => 
              prevConversations.map(conversation => {
                if (conversation.id === typingData.conversation_id) {
                  return {
                    ...conversation,
                    participant: {
                      ...conversation.participant,
                      isTyping: typingData.is_typing
                    }
                  };
                }
                return conversation;
              })
            );
          }
        }
      )
      .subscribe();
      
    // Set up real-time subscription for new messages
    const messageSubscription = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new as {
            conversation_id: string;
            sender_id: string;
            recipient_id: string;
            content: string;
            sent_at: string;
            is_read: boolean;
          };
          
          // Only update if the message involves the current user
          if (newMessage.sender_id === userId || newMessage.recipient_id === userId) {
            setConversations(prevConversations => {
              // Find the conversation
              const conversationIndex = prevConversations.findIndex(
                c => c.id === newMessage.conversation_id
              );
              
              if (conversationIndex >= 0) {
                // Update existing conversation
                const updatedConversations = [...prevConversations];
                const conversation = updatedConversations[conversationIndex];
                
                // Update with new message
                updatedConversations[conversationIndex] = {
                  ...conversation,
                  lastMessage: {
                    content: newMessage.content,
                    sent_at: new Date(newMessage.sent_at),
                    is_read: newMessage.is_read
                  },
                  unreadCount: newMessage.recipient_id === userId && !newMessage.is_read
                    ? conversation.unreadCount + 1
                    : conversation.unreadCount
                };
                
                // Move conversation to top
                const [movedConversation] = updatedConversations.splice(conversationIndex, 1);
                return [movedConversation, ...updatedConversations];
              }
              
              return prevConversations;
            });
          }
        }
      )
      .subscribe();
      
    // Set up real-time subscription for read receipts
    const readReceiptSubscription = supabase
      .channel('read_receipts')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${userId}`
        },
        (payload) => {
          const updatedMessage = payload.new as {
            conversation_id: string;
            is_read: boolean;
          };
          
          if (updatedMessage.is_read) {
            setConversations(prevConversations => 
              prevConversations.map(conversation => {
                if (conversation.id === updatedMessage.conversation_id) {
                  return {
                    ...conversation,
                    lastMessage: conversation.lastMessage 
                      ? { ...conversation.lastMessage, is_read: true }
                      : null
                  };
                }
                return conversation;
              })
            );
          }
        }
      )
      .subscribe();
    
    return () => {
      typingSubscription.unsubscribe();
      messageSubscription.unsubscribe();
      readReceiptSubscription.unsubscribe();
    };
  }, [userId]);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatLastMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          
          {onNewConversation && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full"
              onClick={onNewConversation}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading conversations...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery 
              ? 'No conversations found'
              : 'No conversations yet'}
          </div>
        ) : (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant="ghost"
                className={cn(
                  "w-full flex items-start p-3 h-auto justify-start rounded-none",
                  selectedConversationId === conversation.id && "bg-muted"
                )}
                onClick={() => onSelectConversation(
                  conversation.id, 
                  conversation.participant.id,
                  conversation.participant.name
                )}
              >
                <div className="relative mr-3">
                  <Avatar>
                    <AvatarImage 
                      src={conversation.participant.avatar || `https://avatar.vercel.sh/${conversation.participant.id}`} 
                    />
                    <AvatarFallback>
                      {conversation.participant.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center"
                      variant="destructive"
                    >
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">
                      {conversation.participant.name}
                    </span>
                    
                    {conversation.lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatLastMessageTime(conversation.lastMessage.sent_at)}
                      </span>
                    )}
                  </div>
                  
                  <div className="truncate text-sm text-muted-foreground">
                    {conversation.participant.isTyping ? (
                      <span className="text-primary italic">Typing...</span>
                    ) : conversation.lastMessage ? (
                      conversation.lastMessage.content
                    ) : (
                      "No messages yet"
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
