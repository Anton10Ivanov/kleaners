
import { useState, useEffect } from 'react';
import { FileAttachment, loadMessages, sendMessage } from '@/utils/chat';
import { supabase } from '@/integrations/supabase/client';

export const useChat = (conversationId: string, userId: string, recipientId: string, recipientName: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  // Load messages when the conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const loadedMessages = await loadMessages(conversationId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (conversationId) {
      fetchMessages();
      
      // Set up real-time subscription for new messages
      const channel = supabase
        .channel(`messages:${conversationId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        }, (payload) => {
          const newMessage = payload.new;
          
          // Add the message to our state if it's not already there
          setMessages(prev => {
            const exists = prev.some(msg => msg.id === newMessage.id);
            if (!exists) {
              return [...prev, newMessage];
            }
            return prev;
          });
          
          // If the message is from the recipient, show typing indicator
          if (newMessage.sender_id === recipientId) {
            setIsTyping(false);
          }
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, recipientId]);
  
  // Generate random replies for the demo
  const getRandomReply = (name: string) => {
    const replies = [
      `Hi there! This is ${name}. How can I help you today?`,
      `Thanks for your message. I'll get back to you shortly.`,
      `I'm available to clean on Tuesday and Thursday next week.`,
      `Yes, I can bring my own cleaning supplies.`,
      `The service usually takes about 3 hours for a standard apartment.`,
      `Would you like me to focus on any particular areas during the cleaning?`
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  };
  
  const handleSendMessage = async (message: string, fileAttachments: FileAttachment[]) => {
    if ((!message.trim() && fileAttachments.length === 0) || isLoading) return;
    
    try {
      // Add message to UI immediately for better UX
      const tempId = `temp-${Date.now()}`;
      const newMessage = {
        id: tempId,
        content: message,
        sender_id: userId,
        recipient_id: recipientId,
        created_at: new Date().toISOString(),
        attachments: fileAttachments,
        is_read: true,
        status: 'sending'
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Send to backend
      await sendMessage(
        conversationId,
        userId,
        recipientId,
        message,
        fileAttachments
      );
      
      // Simulate typing indicator for demo
      setTimeout(() => {
        setIsTyping(true);
        
        // Simulate reply after a delay
        setTimeout(() => {
          setIsTyping(false);
          
          const replyContent = getRandomReply(recipientName);
          const replyMessage = {
            id: `temp-reply-${Date.now()}`,
            content: replyContent,
            sender_id: recipientId,
            recipient_id: userId,
            created_at: new Date().toISOString(),
            attachments: [],
            is_read: false,
            status: 'sent'
          };
          
          setMessages(prev => [...prev, replyMessage]);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return {
    messages,
    isLoading,
    isTyping,
    sendMessage: handleSendMessage
  };
};
