
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
    <div className="h-[calc(100vh-200px)] bg-background rounded-xl border shadow-sm">
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
