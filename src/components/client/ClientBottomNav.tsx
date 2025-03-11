
import { NavLink } from 'react-router-dom';
import { Home, Calendar, MessageSquare, Receipt, User, Settings } from 'lucide-react';

const ClientBottomNav = () => {
  const navItems = [
    { to: '/client/dashboard', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { to: '/client/bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { to: '/client/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { to: '/client/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { to: '/client/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-10">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-2 py-1 rounded-md ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default ClientBottomNav;
