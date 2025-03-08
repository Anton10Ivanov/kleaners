
import { supabase } from '@/integrations/supabase/client';
import { useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content?: string;
  attachments?: FileAttachment[];
  sent_at: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  is_read: boolean;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  participant: {
    id: string;
    name: string;
  };
  latestMessage?: Message;
  unreadCount: number;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  file?: File;
}

// Create a new conversation or return existing one
export const createConversation = async (userId: string, recipientId: string): Promise<string> => {
  try {
    // Check if a conversation already exists
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .or(`participants=cs.{${userId},${recipientId}},participants=cs.{${recipientId},${userId}}`)
      .single();
    
    if (existingConversation) {
      return existingConversation.id;
    }
    
    // Create a new conversation
    const { data: newConversation, error } = await supabase
      .from('conversations')
      .insert({
        participants: [userId, recipientId]
      })
      .select('id')
      .single();
    
    if (error) throw error;
    
    return newConversation.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Send a message in a conversation
export const sendMessage = async (
  senderId: string,
  recipientId: string,
  content: string,
  conversationId: string,
  attachments: FileAttachment[] = []
): Promise<void> => {
  try {
    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
    
    // Create the message
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        recipient_id: recipientId,
        content: content,
        attachments: attachments.length > 0 ? attachments : null,
        sent_at: new Date().toISOString(),
        status: 'sent',
        is_read: false
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // If there's no content, but attachments exist, update the message to reference them
    if (content.trim() === '' && attachments.length > 0) {
      await supabase
        .from('messages')
        .update({
          content: '[Attachment]'
        })
        .eq('id', message.id);
    }
    
    return;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Mark messages as read
export const markMessagesAsRead = async (messageIds: string[]): Promise<void> => {
  if (messageIds.length === 0) return;
  
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, status: 'read' })
      .in('id', messageIds);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

// Get all messages in a conversation
export const getConversation = async (conversationId: string): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true });
    
    if (error) throw error;
    
    // Format dates and handle null values
    return data.map(message => ({
      ...message,
      sent_at: new Date(message.sent_at),
      attachments: message.attachments || []
    }));
  } catch (error) {
    console.error('Error getting conversation:', error);
    throw error;
  }
};

// Get all conversations for a user
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // Get all conversations where the user is a participant
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participants', [userId]);
    
    if (error) throw error;
    
    // Get the latest message for each conversation
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conversation) => {
        // Get the other participant
        const otherParticipantId = conversation.participants.find(id => id !== userId);
        
        // Get user details
        const { data: userData } = await supabase
          .from('users')
          .select('id, first_name, last_name')
          .eq('id', otherParticipantId)
          .single();
        
        // Get latest message
        const { data: latestMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversation.id)
          .order('sent_at', { ascending: false })
          .limit(1)
          .single();
        
        // Get unread count
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact' })
          .eq('conversation_id', conversation.id)
          .eq('recipient_id', userId)
          .eq('is_read', false);
        
        return {
          id: conversation.id,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
          participant: {
            id: userData?.id || otherParticipantId,
            name: userData ? `${userData.first_name} ${userData.last_name}` : 'Unknown User'
          },
          latestMessage: latestMessage ? {
            ...latestMessage,
            sent_at: new Date(latestMessage.sent_at),
            attachments: latestMessage.attachments || [],
            isFromMe: latestMessage.sender_id === userId
          } : undefined,
          unreadCount: count || 0
        };
      })
    );
    
    // Sort by latest message or created date
    return conversationsWithMessages.sort((a, b) => {
      const dateA = a.latestMessage ? a.latestMessage.sent_at : new Date(a.updated_at);
      const dateB = b.latestMessage ? b.latestMessage.sent_at : new Date(b.updated_at);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error getting user conversations:', error);
    throw error;
  }
};

// Get unread message count for a user
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('recipient_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    
    return count || 0;
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
};

// Upload file attachments
export const uploadAttachments = async (files: File[], conversationId: string): Promise<FileAttachment[]> => {
  const uploadedAttachments: FileAttachment[] = [];
  
  for (const file of files) {
    const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const filePath = `${conversationId}/${fileId}-${file.name}`;
    
    try {
      const { data, error } = await supabase
        .storage
        .from('message_attachments')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('message_attachments')
        .getPublicUrl(filePath);
      
      uploadedAttachments.push({
        id: fileId,
        name: file.name,
        type: file.type,
        url: publicUrl,
        size: file.size
      });
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  }
  
  return uploadedAttachments;
};

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
