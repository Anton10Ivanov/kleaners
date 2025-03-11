
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: FileAttachment[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  
  // Additional fields for UI components compatibility
  latestMessage?: {
    content: string;
    sent_at: Date;
    is_read: boolean;
    sender_id: string;
    isFromMe: boolean;
    attachments?: FileAttachment[];
  };
  participant?: {
    id: string;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  file?: File; // Add file property for FileUpload component
}
