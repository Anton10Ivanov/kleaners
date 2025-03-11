
import { Message, Conversation, FileAttachment } from './types';

export type { Message, Conversation, FileAttachment };

export const createConversation = async (userId: string, recipientId: string): Promise<string> => {
  // Mock implementation
  return 'conversation-123';
};

export const sendMessage = async (message: Partial<Message>): Promise<Message> => {
  // Mock implementation
  return {
    id: 'msg-123',
    conversationId: message.conversationId || '',
    senderId: message.senderId || '',
    content: message.content || '',
    timestamp: new Date().toISOString(),
    read: false
  };
};

export const markMessagesAsRead = async (conversationId: string, userId: string): Promise<void> => {
  // Mock implementation
  console.log('Marking messages as read', { conversationId, userId });
};

export const getConversation = async (conversationId: string): Promise<Conversation> => {
  // Mock implementation
  return {
    id: conversationId,
    participants: [],
    unreadCount: 0
  };
};

export const loadMessages = async (conversationId: string): Promise<Message[]> => {
  // Mock implementation
  return [];
};

export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  // Mock implementation
  return 0;
};

export const uploadAttachments = async (files: File[]): Promise<FileAttachment[]> => {
  // Mock implementation
  return [];
};

export const useTypingIndicator = (conversationId: string) => {
  // Mock implementation
  return { isTyping: false };
};
