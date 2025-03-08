
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatBannerProps {
  onChatClick: () => void;
}

const ChatBanner = ({ onChatClick }: ChatBannerProps) => {
  return (
    <div className="bg-primary/10 p-4 rounded-lg my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-medium text-lg">Need help with your cleaning?</h3>
            <p className="text-muted-foreground">Chat with our customer support team instantly!</p>
          </div>
        </div>
        
        <Button 
          onClick={onChatClick}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Start Chat
          <MessageCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBanner;
