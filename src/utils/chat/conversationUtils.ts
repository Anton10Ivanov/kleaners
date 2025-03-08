
import { supabase } from '@/integrations/supabase/client';
import { Conversation, Message } from './types';

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
