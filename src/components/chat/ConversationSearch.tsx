
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquarePlus } from 'lucide-react';

interface ConversationSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewConversation: () => void;
}

const ConversationSearch = ({
  searchQuery,
  onSearchChange,
  onNewConversation
}: ConversationSearchProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Button
        size="icon"
        onClick={onNewConversation}
        title="New conversation"
      >
        <MessageSquarePlus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ConversationSearch;
