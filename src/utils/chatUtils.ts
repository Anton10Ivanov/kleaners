
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

// Types
export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  sent_at: Date;
  is_read: boolean;
  attachments?: FileAttachment[];
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  file?: File; // Only used client-side for uploading
}

export interface Conversation {
  messages: Message[];
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isTyping?: boolean;
    lastSeen?: Date;
  }[];
}

// Supabase real-time subscription for messages
export const useMessageSubscription = (
  userId: string,
  onNewMessage: (message: Message) => void
) => {
  useEffect(() => {
    // Subscribe to new messages where the user is the recipient
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const newMessage = payload.new as any;
          onNewMessage({
            ...newMessage,
            sent_at: new Date(newMessage.sent_at),
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, onNewMessage]);
};

// Typing indicator functionality
export const useTypingIndicator = (
  conversationId: string,
  userId: string,
  timeout = 3000
) => {
  const [isTyping, setIsTyping] = useState(false);
  let typingTimer: ReturnType<typeof setTimeout> | null = null;

  // Send typing status to the server
  const sendTypingStatus = async (typing: boolean) => {
    try {
      await supabase
        .from('typing_indicators')
        .upsert({
          conversation_id: conversationId,
          user_id: userId,
          is_typing: typing,
          updated_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error updating typing status:', error);
    }
  };

  // Start typing indicator
  const startTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      sendTypingStatus(true);
    }

    // Clear existing timer
    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    // Set new timer to stop typing indicator after timeout
    typingTimer = setTimeout(() => {
      setIsTyping(false);
      sendTypingStatus(false);
    }, timeout);
  };

  // Stop typing indicator immediately
  const stopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      sendTypingStatus(false);
      
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    }
  };

  // Subscribe to typing status changes from other users
  const useTypingStatusSubscription = (
    conversationId: string,
    onTypingChange: (userId: string, isTyping: boolean) => void
  ) => {
    useEffect(() => {
      const subscription = supabase
        .channel(`typing:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'typing_indicators',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            const typingData = payload.new as {
              user_id: string;
              is_typing: boolean;
            };
            
            if (typingData.user_id !== userId) {
              onTypingChange(typingData.user_id, typingData.is_typing);
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }, [conversationId, onTypingChange]);
  };

  return {
    isTyping,
    startTyping,
    stopTyping,
    useTypingStatusSubscription,
  };
};

// Read receipts functionality
export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    await supabase
      .from('messages')
      .update({ is_read: true, status: 'read' })
      .eq('id', messageId);
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (messageIds: string[]): Promise<void> => {
  if (!messageIds.length) return;
  
  try {
    await supabase
      .from('messages')
      .update({ is_read: true, status: 'read' })
      .in('id', messageIds);
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

// Get unread message count
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('is_read', false);
      
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
};

// File handling functions
export const uploadAttachment = async (
  file: File,
  conversationId: string
): Promise<FileAttachment> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('message_attachments')
      .upload(`${conversationId}/${fileName}`, file);
      
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('message_attachments')
      .getPublicUrl(`${conversationId}/${fileName}`);
      
    return {
      id: data.path,
      name: file.name,
      type: file.type,
      url: urlData.publicUrl,
      size: file.size
    };
  } catch (error) {
    console.error('Error uploading attachment:', error);
    throw error;
  }
};

export const uploadAttachments = async (
  files: File[],
  conversationId: string
): Promise<FileAttachment[]> => {
  return Promise.all(
    files.map(file => uploadAttachment(file, conversationId))
  );
};

// Send message with optimistic updates
export const sendMessage = async (
  senderId: string,
  recipientId: string,
  content: string,
  conversationId: string,
  attachments?: FileAttachment[]
): Promise<Message> => {
  // Create message object
  const messageData = {
    sender_id: senderId,
    recipient_id: recipientId,
    conversation_id: conversationId,
    content,
    sent_at: new Date().toISOString(),
    is_read: false,
    attachments: attachments || [],
    status: 'sending',
  };
  
  try {
    // Insert message into database
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();
      
    if (error) throw error;
    
    // Update message status to sent
    await supabase
      .from('messages')
      .update({ status: 'sent' })
      .eq('id', data.id);
      
    return {
      ...data,
      status: 'sent',
      sent_at: new Date(data.sent_at),
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get conversation history
export const getConversation = async (
  conversationId: string,
  limit = 50,
  before?: string
): Promise<Message[]> => {
  try {
    let query = supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: false })
      .limit(limit);
      
    if (before) {
      query = query.lt('sent_at', before);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data.map((message) => ({
      ...message,
      sent_at: new Date(message.sent_at),
    }));
  } catch (error) {
    console.error('Error getting conversation:', error);
    return [];
  }
};

// Get or create conversation between two users
export const getOrCreateConversation = async (
  userId1: string,
  userId2: string
): Promise<string> => {
  try {
    // Check if conversation exists
    const { data, error } = await supabase
      .from('conversations')
      .select('id')
      .or(`participant1_id.eq.${userId1},participant2_id.eq.${userId1}`)
      .or(`participant1_id.eq.${userId2},participant2_id.eq.${userId2}`)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error;
    }
    
    if (data) {
      return data.id;
    }
    
    // Create new conversation
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert({
        participant1_id: userId1,
        participant2_id: userId2,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (createError) throw createError;
    
    return newConversation.id;
  } catch (error) {
    console.error('Error getting or creating conversation:', error);
    throw error;
  }
};

// Get user's conversations
export const getUserConversations = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        id, 
        created_at,
        participant1_id,
        participant2_id,
        profiles1:participant1_id(id, first_name, last_name),
        profiles2:participant2_id(id, first_name, last_name),
        latest_message:messages(
          id, 
          content, 
          sent_at, 
          sender_id, 
          is_read,
          attachments
        )
      `)
      .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Process conversations to add last message and other participant details
    return data.map(conversation => {
      const isParticipant1 = conversation.participant1_id === userId;
      const otherParticipant = isParticipant1 
        ? conversation.profiles2
        : conversation.profiles1;
        
      // Find the latest message
      let latestMessage = null;
      if (conversation.latest_message && conversation.latest_message.length > 0) {
        // Sort messages by sent_at descending
        latestMessage = conversation.latest_message.sort((a: any, b: any) => 
          new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
        )[0];
      }
      
      return {
        id: conversation.id,
        participant: {
          id: otherParticipant.id,
          name: `${otherParticipant.first_name || ''} ${otherParticipant.last_name || ''}`.trim() || 'Unknown',
        },
        latestMessage: latestMessage ? {
          ...latestMessage,
          sent_at: new Date(latestMessage.sent_at),
          isFromMe: latestMessage.sender_id === userId
        } : null,
        unreadCount: conversation.latest_message
          ? conversation.latest_message.filter((m: any) => 
              m.recipient_id === userId && !m.is_read
            ).length
          : 0
      };
    });
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
};
