
import { useConversationList } from '@/hooks/useConversationList';
import ConversationItem from './ConversationItem';
import ConversationSearch from './ConversationSearch';
import { EmptyState, LoadingState } from './ConversationListStates';

interface ConversationListProps {
  userId: string;
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string, participantId: string, participantName: string) => void;
  onNewConversation: () => void;
}

export const ConversationList = ({
  userId,
  selectedConversationId,
  onSelectConversation,
  onNewConversation
}: ConversationListProps) => {
  const {
    conversations,
    isLoading,
    searchQuery,
    setSearchQuery
  } = useConversationList(userId);
  
  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden bg-background">
      <div className="p-3 border-b">
        <h3 className="font-medium mb-3">Messages</h3>
        
        <ConversationSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewConversation={onNewConversation}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingState />
        ) : conversations.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <div className="divide-y">
            {conversations.map(conversation => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                onSelect={() => onSelectConversation(
                  conversation.id, 
                  conversation.participant.id,
                  conversation.participant.name
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
