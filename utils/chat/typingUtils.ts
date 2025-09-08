'use client'


import { supabase } from '@/integrations/supabase/client';
import { useCallback, useEffect } from 'react';

// Hook for handling typing indicators
export const useTypingIndicator = (conversationId: string, userId: string) => {
  const startTyping = useCallback(async () => {
    try {
      await supabase.realtime.channel('typing-channel')
        .send({
          type: 'broadcast',
          event: 'typing',
          payload: { userId, conversationId, isTyping: true }
        });
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  }, [conversationId, userId]);
  
  const stopTyping = useCallback(async () => {
    try {
      await supabase.realtime.channel('typing-channel')
        .send({
          type: 'broadcast',
          event: 'typing',
          payload: { userId, conversationId, isTyping: false }
        });
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  }, [conversationId, userId]);
  
  const useTypingStatusSubscription = (
    conversationId: string,
    callback: (userId: string, isTyping: boolean) => void
  ) => {
    useEffect(() => {
      const channel = supabase.realtime.channel('typing-channel');
      
      channel
        .on('broadcast', { event: 'typing' }, (payload) => {
          const { userId, conversationId: typingConversationId, isTyping } = payload.payload;
          
          if (typingConversationId === conversationId) {
            callback(userId, isTyping);
          }
        })
        .subscribe();
      
      return () => {
        channel.unsubscribe();
      };
    }, [conversationId, callback]);
  };
  
  return {
    isTyping: false,
    startTyping,
    stopTyping,
    useTypingStatusSubscription
  };
};
