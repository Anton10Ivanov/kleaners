
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
export type { Message, Conversation, FileAttachment } from './chat';

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
