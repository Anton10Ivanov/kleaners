
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/chat/ChatInterface';

interface MessagesContentProps {
  selectedConversation: {
    id: string;
    participantId: string;
    participantName: string;
  } | null;
  providerId: string;
  onNewConversation: () => void;
}

const MessagesContent = ({ 
  selectedConversation, 
  providerId,
  onNewConversation 
}: MessagesContentProps) => {
  return (
    <div className="md:col-span-2 h-[calc(100vh-200px)]">
      {selectedConversation ? (
        <ChatInterface
          conversationId={selectedConversation.id}
          userId={providerId}
          recipientId={selectedConversation.participantId}
          recipientName={selectedConversation.participantName}
        />
      ) : (
        <Box className="h-full flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-medium mb-2">No conversation selected</h3>
            <p className="text-muted-foreground mb-4">
              Select a conversation from the list or start a new one
            </p>
            <Button
              onClick={onNewConversation}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Start new conversation
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
};

export default MessagesContent;
