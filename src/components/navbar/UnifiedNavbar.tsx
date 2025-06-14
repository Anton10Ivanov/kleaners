
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Modern, clean, brand-first left nav
const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/quote" }, // repurpose "quote" route as pricing/quote
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Logo = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      // Font consistency
      className="flex items-center gap-2 font-sans font-bold text-2xl tracking-wide"
      aria-label="Go to homepage"
      tabIndex={0}
      style={{
        color: "#7ebce6",
        letterSpacing: "0.01em",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <img
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
        alt="Kleaners Logo"
        className="h-8 w-8 object-contain"
        style={{
          fontFamily: "'Poppins', sans-serif"
        }}
      />
      <span>Kleaners</span>
    </button>
  );
};

const UnifiedNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50",
        "backdrop-blur-[7px] bg-white/90 shadow-md border-b border-transparent",
        "transition-all duration-300"
      )}
      role="navigation"
      aria-label="Main navigation"
      style={{
        // Subtle blue/gradient touch behind
        backgroundImage: "linear-gradient(93deg,rgba(126,188,230,0.18) 0%,#fff 70%)",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-8 h-[68px]">
        {/* Brand left */}
        <Logo />

        {/* Nav Items center/right */}
        <ul className="hidden md:flex items-center space-x-3 lg:space-x-6 font-sans">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  "text-base font-medium px-3 py-2 transition-colors duration-150 rounded-md font-sans",
                  location.pathname === item.href
                    ? "text-[#7ebce6] bg-[#7ebce6]/10"
                    : "text-gray-800 dark:text-gray-100 hover:text-[#7ebce6] hover:bg-[#7ebce6]/10"
                )}
                onClick={() => navigate(item.href)}
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Auth right (no CTA) */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button
            className="text-base font-medium text-gray-700 hover:text-[#7ebce6] bg-transparent px-4 py-2 rounded-md transition-colors font-sans min-h-[44px]"
            onClick={() => navigate('/login')}
            tabIndex={0}
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UnifiedNavbar;

