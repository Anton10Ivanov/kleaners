
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
