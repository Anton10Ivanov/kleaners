
import { useState } from 'react';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/ui/button';
import ConversationList from '@/components/chat/ConversationList';

interface MessagesSidebarProps {
  providerId: string;
  selectedConversationId: string | undefined;
  onSelectConversation: (
    conversationId: string,
    participantId: string,
    participantName: string
  ) => void;
  onNewConversation: () => void;
}

const MessagesSidebar = ({
  providerId,
  selectedConversationId,
  onSelectConversation,
  onNewConversation
}: MessagesSidebarProps) => {
  return (
    <div className="md:col-span-1 h-[calc(100vh-200px)]">
      <ConversationList
        userId={providerId}
        selectedConversationId={selectedConversationId}
        onSelectConversation={onSelectConversation}
        onNewConversation={onNewConversation}
      />
    </div>
  );
};

export default MessagesSidebar;
