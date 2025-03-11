
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { ShieldCheck, CalendarDays, User, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface AdminSectionProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSection: React.FC<AdminSectionProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate('/admin');
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin panel",
    });
  };

  return (
    <div className="rounded-lg border border-border p-4 bg-primary/5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
        <ShieldCheck className="mr-2 h-4 w-4" />
        Admin Access
      </h3>
      <div className="space-y-2 pl-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleAdminClick}
          className="w-full flex items-center justify-start py-2 px-3 rounded-md bg-primary/10 hover:bg-primary/20 border-none"
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          <span className="text-sm">Admin Dashboard</span>
        </Button>
        
        <div className="space-y-1 mt-2 pl-1">
          <SheetClose asChild>
            <Link
              to="/admin/bookings"
              className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
            >
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Manage Bookings</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link
              to="/admin/clients"
              className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
            >
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Manage Clients</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link
              to="/admin/providers"
              className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
            >
              <UserCog className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Manage Providers</span>
            </Link>
          </SheetClose>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
