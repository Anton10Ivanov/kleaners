
import { supabase } from '@/integrations/supabase/client';
import { FileAttachment, Message } from './types';

// Send a message in a conversation
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  recipientId: string,
  content: string,
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

// Load messages for a conversation (mock data for demo)
export const loadMessages = async (conversationId: string): Promise<any[]> => {
  try {
    // In a real app, this would fetch messages from the database
    // For this demo, we'll return mock data
    return [
      {
        id: 'msg1',
        content: 'Hello! How can I help you today?',
        sender_id: 'support123',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        attachments: []
      },
      {
        id: 'msg2',
        content: 'I have a question about your services.',
        sender_id: 'user123',
        created_at: new Date(Date.now() - 3000000).toISOString(), // 50 minutes ago
        attachments: []
      },
      {
        id: 'msg3',
        content: 'Sure, I\'d be happy to help. What would you like to know?',
        sender_id: 'support123',
        created_at: new Date(Date.now() - 2400000).toISOString(), // 40 minutes ago
        attachments: []
      }
    ];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};
