
import { PageHeader } from '@/components/layout/PageHeader';
import MessagesSidebar from '@/components/provider/messages/MessagesSidebar';
import MessagesContent from '@/components/provider/messages/MessagesContent';
import { useConversationManagement } from '@/hooks/useConversationManagement';

const ProviderMessages = () => {
  const providerId = "provider123"; // In a real app, get this from auth state
  
  const {
    selectedConversation,
    handleSelectConversation,
    handleNewConversation
  } = useConversationManagement(providerId);
  
  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <PageHeader title="Messages" description="Manage your conversations with clients" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MessagesSidebar 
          providerId={providerId}
          selectedConversationId={selectedConversation?.id}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
        />
        
        <MessagesContent
          selectedConversation={selectedConversation}
          providerId={providerId}
          onNewConversation={handleNewConversation}
        />
      </div>
    </div>
  );
};

export default ProviderMessages;
