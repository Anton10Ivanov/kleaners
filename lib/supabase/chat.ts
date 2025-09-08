/**
 * Chat and messaging utilities for Supabase
 */

import { createClient } from '@/lib/supabase/client'

export interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  recipient_id: string
  content: string
  attachments: FileAttachment[]
  sent_at: Date
  status: 'sent' | 'delivered' | 'read'
  is_read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  unreadCount: number
  created_at: string
  updated_at: string
  participant: {
    id: string
    name: string
  }
  latestMessage?: {
    content: string
    sent_at: Date
    is_read: boolean
    sender_id: string
    isFromMe: boolean
    attachments: FileAttachment[]
  }
}

// Send a message in a conversation
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  recipientId: string,
  content: string,
  attachments: FileAttachment[] = []
): Promise<void> => {
  try {
    const supabase = createClient()
    
    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId)
    
    // Create the message
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        recipient_id: recipientId,
        content: content,
        attachments: attachments.length > 0 ? attachments : [],
        sent_at: new Date().toISOString(),
        status: 'sent',
        is_read: false
      })
      .select()
      .single()
    
    if (error) throw error
    
    // If there's no content, but attachments exist, update the message to reference them
    if (content.trim() === '' && attachments.length > 0) {
      await supabase
        .from('messages')
        .update({
          content: '[Attachment]'
        })
        .eq('id', message.id)
    }
    
    return
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

// Mark messages as read
export const markMessagesAsRead = async (messageIds: string[]): Promise<void> => {
  if (messageIds.length === 0) return
  
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, status: 'read' })
      .in('id', messageIds)
    
    if (error) throw error
  } catch (error) {
    console.error('Error marking messages as read:', error)
    throw error
  }
}

// Get all messages in a conversation
export const getConversation = async (conversationId: string): Promise<Message[]> => {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true })
    
    if (error) throw error
    
    if (!data) return []
    
    // Format dates and handle null values
    return data.map(message => ({
      ...message,
      sent_at: new Date(message.sent_at),
      attachments: message.attachments || []
    }))
  } catch (error) {
    console.error('Error getting conversation:', error)
    throw error
  }
}

// Get unread message count for a user
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    const supabase = createClient()
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('is_read', false)
    
    if (error) throw error
    
    return count || 0
  } catch (error) {
    console.error('Error getting unread message count:', error)
    return 0
  }
}

// Load messages for a conversation
export const loadMessages = async (conversationId: string): Promise<any[]> => {
  try {
    const supabase = createClient()
    // Get real messages from database
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true })
      
    if (error) throw error
    
    return data || []
  } catch (error) {
    console.error('Error loading messages:', error)
    // Fallback to demo data if there's an error
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
    ]
  }
}

// Create a new conversation or return existing one
export const createConversation = async (userId: string, recipientId: string): Promise<string> => {
  try {
    const supabase = createClient()
    
    // Check if a conversation already exists
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .contains('participants', [userId, recipientId])
    
    if (existingConversation && existingConversation.length > 0) {
      return existingConversation[0].id
    }
    
    // Create a new conversation
    const { data: newConversation, error } = await supabase
      .from('conversations')
      .insert({
        participants: [userId, recipientId]
      })
      .select('id')
      .single()
    
    if (error) throw error
    
    return newConversation.id
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
}

// Get all conversations for a user
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    const supabase = createClient()
    
    // Get all conversations where the user is a participant
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participants', [userId])
    
    if (error) throw error

    if (!conversations) return []
    
    // Get the latest message for each conversation
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conversation) => {
        // Get the other participant
        const otherParticipantId = conversation.participants.find(id => id !== userId) || ''
        
        // Get latest message
        const { data: latestMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversation.id)
          .order('sent_at', { ascending: false })
          .limit(1)
          .single()
        
        // Get unread count
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conversation.id)
          .eq('recipient_id', userId)
          .eq('is_read', false)
        
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
        }
      })
    )
    
    // Sort by latest message or created date
    return conversationsWithMessages.sort((a, b) => {
      const dateA = a.latestMessage ? a.latestMessage.sent_at : new Date(a.updated_at)
      const dateB = b.latestMessage ? b.latestMessage.sent_at : new Date(b.updated_at)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error getting user conversations:', error)
    throw error
  }
}
