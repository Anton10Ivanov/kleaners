
import { NavLink } from 'react-router-dom';
import { BookOpenCheck, Calendar, Home, MessageSquare, Receipt, Settings, User } from 'lucide-react';

const ClientSidebar = () => {
  const navItems = [
    { to: '/client/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { to: '/client/bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { to: '/client/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { to: '/client/invoices', label: 'Invoices', icon: <Receipt className="h-5 w-5" /> },
    { to: '/client/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { to: '/client/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-primary">Kleaners</h2>
        <p className="text-sm text-muted-foreground">Client Portal</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kleaners
        </p>
      </div>
    </div>
  );
};

export default ClientSidebar;
