
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Conversation } from '@/utils/chat';

export const useConversationList = (userId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      // Query conversations where the user is a participant
      const { data: conversationsData, error } = await supabase
        .from('conversations')
        .select('*')
        .contains('participants', [userId]);
      
      if (error) throw error;

      // Process conversations to match the expected format
      if (conversationsData) {
        const processedConversations: Conversation[] = await Promise.all(
          conversationsData.map(async (convo) => {
            // Find the other participant
            const otherParticipantId = convo.participants.find(
              (id: string) => id !== userId
            ) || '';
            
            // Get the latest message
            const { data: messageData } = await supabase
              .from('messages')
              .select('*')
              .eq('conversation_id', convo.id)
              .order('sent_at', { ascending: false })
              .limit(1)
              .single();
              
            // Count unread messages
            const { count } = await supabase
              .from('messages')
              .select('*', { count: 'exact', head: true })
              .eq('conversation_id', convo.id)
              .eq('recipient_id', userId)
              .eq('is_read', false);
            
            return {
              id: convo.id,
              participants: convo.participants,
              unreadCount: count || 0,
              created_at: convo.created_at,
              updated_at: convo.updated_at,
              participant: {
                id: otherParticipantId,
                name: otherParticipantId.includes('provider') ? 'Service Provider' : 'Client'
              },
              latestMessage: messageData ? {
                content: messageData.content,
                sent_at: new Date(messageData.sent_at),
                is_read: messageData.is_read,
                sender_id: messageData.sender_id,
                isFromMe: messageData.sender_id === userId,
                attachments: messageData.attachments || []
              } : undefined
            };
          })
        );
        
        // Sort by latest message or updated_at
        const sortedConversations = processedConversations.sort((a, b) => {
          const dateA = a.latestMessage ? a.latestMessage.sent_at : new Date(a.updated_at || '');
          const dateB = b.latestMessage ? b.latestMessage.sent_at : new Date(b.updated_at || '');
          return dateB.getTime() - dateA.getTime();
        });
        
        setConversations(sortedConversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchConversations();
  }, [userId]);
  
  useEffect(() => {
    // Subscribe to new messages to update the conversation list
    const channel = supabase
      .channel('messages_changes')
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
      supabase.removeChannel(channel);
    };
  }, [userId]);
  
  const filteredConversations = searchQuery.trim() === ''
    ? conversations
    : conversations.filter(conversation => 
        conversation.participant?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
  return {
    conversations: filteredConversations,
    isLoading,
    searchQuery,
    setSearchQuery,
    refreshConversations: fetchConversations
  };
};
