
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Clock, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Change this to your actual logo if needed
const Logo = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2"
      aria-label="Go to homepage"
    >
      <img
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
        alt="Kleaners Logo"
        className="h-9 w-9 object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(48%) sepia(60%) saturate(1200%) hue-rotate(175deg) brightness(98%) contrast(110%)",
        }}
      />
      <span
        className="text-lg md:text-2xl font-bold tracking-wide"
        style={{
          color: "#7ebce6", // Main primary brand color
          letterSpacing: "0.01em",
        }}
      >
        Kleaners
      </span>
    </button>
  );
};

// Central nav items (edit/Add icons as needed)
const navItems = [
  {
    label: "Services",
    icon: <Home className="w-5 h-5" />,
    href: "/services",
    always: true,
  },
  {
    label: "Quick Quote",
    icon: <Clock className="w-5 h-5" />,
    href: "/quote",
    always: true,
  },
  {
    label: "About",
    icon: <User className="w-5 h-5" />,
    href: "/about",
    always: true,
  },
  {
    label: "Contact",
    icon: <Mail className="w-5 h-5" />,
    href: "/contact",
    always: true,
  },
];

// Contextual actions, Example: Only on homepage
const contextualItems = [
  {
    label: "Book Now",
    icon: <Clock className="w-5 h-5" />,
    href: "/booking",
    show: (path: string) => path === "/",
  },
];

const UnifiedNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100/50 dark:border-gray-800 transition-all duration-300",
        "h-[64px] flex items-center"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6">
        {/* Logo - left */}
        <Logo />

        {/* Nav Items - middle (desktop), horizontal scroll on mobile */}
        <ul className="flex-1 flex items-center ml-8 gap-2 overflow-x-auto scrollbar-none">
          {navItems.map((item) =>
            item.always ? (
              <li key={item.href}>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-100 bg-transparent hover:bg-[#7ebce6]/15 hover:text-[#7ebce6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ebce6] text-base"
                  onClick={() => navigate(item.href)}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            ) : null
          )}
          {/* Contextual action buttons */}
          {contextualItems
            .filter((item) => item.show(path))
            .map((item) => (
              <li key={item.href}>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-white bg-[#7ebce6] hover:bg-[#70b0da] transition-colors duration-200"
                  onClick={() => navigate(item.href)}
                  aria-label={item.label}
                  style={{
                    boxShadow:
                      "0 1px 5px 0 rgba(126,188,230,0.13), 0 2px 8px 1px rgba(126,188,230,0.05)",
                  }}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            ))}
        </ul>

        {/* Placeholder for future user/account, role, mobile toggle, etc. */}
        <div />
      </div>
    </nav>
  );
};

export default UnifiedNavbar;

