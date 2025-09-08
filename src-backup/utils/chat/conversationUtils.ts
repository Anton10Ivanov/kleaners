
import { supabase } from '@/integrations/supabase/client';
import { Conversation, Message } from './types';

// Create a new conversation or return existing one
export const createConversation = async (userId: string, recipientId: string): Promise<string> => {
  try {
    // Check if a conversation already exists
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .contains('participants', [userId, recipientId]);
    
    if (existingConversation && existingConversation.length > 0) {
      return existingConversation[0].id;
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

    if (!conversations) return [];
    
    // Get the latest message for each conversation
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conversation) => {
        // Get the other participant
        const otherParticipantId = conversation.participants.find(id => id !== userId) || '';
        
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
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conversation.id)
          .eq('recipient_id', userId)
          .eq('is_read', false);
        
        return {
          id: conversation.id,
          participants: conversation.participants, // Use the participants array from the database
          unreadCount: count || 0,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
          // Add the compatible fields for UI components
          participant: {
            id: otherParticipantId,
            name: otherParticipantId.includes('provider') ? 'Service Provider' : 'Client'
          },
          latestMessage: latestMessage ? {
            content: latestMessage.content,
            sent_at: new Date(latestMessage.sent_at),
            is_read: latestMessage.is_read,
            sender_id: latestMessage.sender_id,
            isFromMe: latestMessage.sender_id === userId,
            attachments: latestMessage.attachments || []
          } : undefined
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
