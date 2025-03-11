
import { Box } from '@/components/layout/Box';
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
    <div className="md:col-span-2 h-[calc(100vh-200px)] transition-all duration-200">
      {selectedConversation ? (
        <ChatInterface
          conversationId={selectedConversation.id}
          userId={providerId}
          recipientId={selectedConversation.participantId}
          recipientName={selectedConversation.participantName}
        />
      ) : (
        <Box className="h-full flex items-center justify-center bg-background/50 backdrop-blur-sm border rounded-xl shadow-sm">
          <div className="text-center max-w-md mx-auto px-4">
            <h3 className="font-medium text-lg mb-2 text-foreground">No conversation selected</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Select a conversation from the list or start a new one to begin messaging
            </p>
            <button
              onClick={onNewConversation}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Start new conversation
            </button>
          </div>
        </Box>
      )}
    </div>
  );
};

export default MessagesContent;
