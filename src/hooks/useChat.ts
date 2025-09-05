
import { useState, useEffect } from 'react';
import { Message, FileAttachment, sendMessage } from '@/utils/chat';
import { supabase } from '@/integrations/supabase/client';
import { logError } from '@/utils/console-cleanup';

export const useChat = (conversationId: string, userId: string, recipientId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const response = await supabase
          .from('messages')
          .select('*')
          .eq('conversationId', conversationId)
          .order('timestamp', { ascending: true });

        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        logError('Error loading messages', error, 'useChat');
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [conversationId]);

  const handleSendMessage = async (content: string, attachments: FileAttachment[] = []) => {
    const newMessage: Partial<Message> = {
      conversationId,
      senderId: userId,
      content,
      attachments,
      timestamp: new Date().toISOString(),
      read: false,
      status: 'sending'
    };

    try {
      const sentMessage = await sendMessage(newMessage);
      setMessages(prev => [...prev, sentMessage]);
      return sentMessage;
    } catch (error) {
      logError('Error sending message', error, 'useChat');
      throw error;
    }
  };

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage: handleSendMessage
  };
};
