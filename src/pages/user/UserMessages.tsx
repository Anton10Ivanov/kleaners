
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ConversationList } from '@/components/chat/ConversationList';
import { Skeleton } from '@/components/ui/skeleton';
import { Message } from '@/utils/chatUtils';

const UserMessages = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    participantId: string;
    participantName: string;
  } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    if (selectedConversation && userId) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation, userId]);
  
  const fetchMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('sent_at', { ascending: true });
        
      if (error) throw error;
      
      const formattedMessages: Message[] = data.map(message => ({
        id: message.id,
        sender_id: message.sender_id,
        recipient_id: message.recipient_id,
        content: message.content,
        sent_at: new Date(message.sent_at),
        is_read: message.is_read,
        status: message.status || 'sent',
        attachments: message.attachments
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
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
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <Skeleton className="h-full" />
          <Skeleton className="h-full md:col-span-2" />
        </div>
      </div>
    );
  }
  
  if (!userId) {
    return (
      <div className="container mx-auto py-6 px-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="bg-muted p-4 rounded-lg text-center">
          Please sign in to view your messages.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        <div className="h-full">
          <ConversationList
            userId={userId}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={() => {/* TODO: Implement new conversation flow */}}
          />
        </div>
        
        <div className="h-full md:col-span-2">
          {selectedConversation ? (
            loadingMessages ? (
              <Skeleton className="h-full" />
            ) : (
              <ChatInterface
                conversationId={selectedConversation.id}
                currentUserId={userId}
                recipientId={selectedConversation.participantId}
                recipientName={selectedConversation.participantName}
                initialMessages={messages}
              />
            )
          ) : (
            <div className="h-full border rounded-lg flex items-center justify-center bg-muted/50">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Select a conversation from the list or start a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
