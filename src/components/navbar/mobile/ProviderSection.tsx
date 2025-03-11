
import React from 'react';
import { Link } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { UserCog, LayoutDashboard, CalendarDays, Settings } from 'lucide-react';

const ProviderSection: React.FC = () => {
  return (
    <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
        <UserCog className="mr-2 h-4 w-4" />
        Provider Access
      </h3>
      <div className="space-y-2 pl-2">
        <SheetClose asChild>
          <Link to="/provider/dashboard" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Provider Dashboard</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/provider/bookings" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Assignments</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/provider/profile" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
            <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Provider Profile</span>
          </Link>
        </SheetClose>
      </div>
    </div>
  );
};

export default ProviderSection;
