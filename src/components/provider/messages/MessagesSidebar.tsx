
import ConversationList from '@/components/chat/ConversationList';
import { Card, CardHeader } from '@/components/ui/card';

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
    <Card className="h-[calc(100vh-200px)] shadow-sm overflow-hidden">
      <CardHeader className="p-3 border-b">
        <h3 className="text-lg font-medium">Conversations</h3>
      </CardHeader>
      <div className="h-[calc(100%-60px)]">
        <ConversationList
          userId={providerId}
          selectedConversationId={selectedConversationId}
          onSelectConversation={onSelectConversation}
          onNewConversation={onNewConversation}
        />
      </div>
    </Card>
  );
};

export default MessagesSidebar;
