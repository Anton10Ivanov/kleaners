
import { useState, useEffect } from 'react';
import { getUserConversations } from '@/utils/chat';
import { supabase } from '@/integrations/supabase/client';
import { Conversation } from '@/utils/chat';

export const useConversationList = (userId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    fetchConversations();
  }, [userId]);
  
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
      
  return {
    conversations: filteredConversations,
    isLoading,
    searchQuery,
    setSearchQuery,
    refreshConversations: fetchConversations
  };
};
