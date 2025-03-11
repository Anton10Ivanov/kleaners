
import React from 'react';
import { Link } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { User, CalendarDays, MessageSquare, Settings } from 'lucide-react';

const ClientSection: React.FC = () => {
  return (
    <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
        <User className="mr-2 h-4 w-4" />
        Client Access
      </h3>
      <div className="space-y-2 pl-2">
        <SheetClose asChild>
          <Link to="/client/bookings" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>My Bookings</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/client/messages" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Messages</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/client/profile" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Profile Settings</span>
          </Link>
        </SheetClose>
      </div>
    </div>
  );
};

export default ClientSection;
