
import React, { memo } from "react";
import { Bell, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  /** User display name (optional) */
  userName?: string;
  /** Handler for search input changes */
  onSearch?: (query: string) => void;
  /** Handler for notification button click */
  onNotificationsClick?: () => void;
}

/**
 * AdminHeader Component
 * 
 * Top header for the admin panel showing search, notifications, and user info.
 * Optimized with React.memo to prevent unnecessary re-renders.
 * 
 * @param {AdminHeaderProps} props Component props
 * @returns {JSX.Element} Admin header component
 */
export const AdminHeader = memo(function AdminHeader({ 
  userName = "Admin User",
  onSearch,
  onNotificationsClick
}: AdminHeaderProps): JSX.Element {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Search bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 pr-4"
          aria-label="Search admin panel"
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Right-side actions */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        
        {/* User avatar */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Admin user" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-sm font-medium md:block">{userName}</div>
        </div>
      </div>
    </div>
  );
});

export default AdminHeader;
