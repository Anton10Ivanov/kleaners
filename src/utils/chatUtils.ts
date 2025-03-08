
// This file is deprecated and only exists for backwards compatibility
// Please import from '@/utils/chat' instead
import {
  createConversation,
  sendMessage,
  markMessagesAsRead,
  getConversation,
  getUserConversations,
  getUnreadMessageCount,
  uploadAttachments,
  useTypingIndicator,
  loadMessages
} from './chat';

// Re-export types with 'export type' to fix the 'isolatedModules' error
export type { Message } from './chat';
export type { Conversation } from './chat';
export type { FileAttachment } from './chat';

export {
  createConversation,
  sendMessage,
  markMessagesAsRead,
  getConversation,
  getUserConversations,
  getUnreadMessageCount,
  uploadAttachments,
  useTypingIndicator,
  loadMessages
};
