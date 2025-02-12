
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render theme switch until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-dark-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="font-raleway font-bold text-2xl text-primary dark:text-primary">Kleaners.de</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md font-raleway font-medium transition-colors">
              Get Quote
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark-background rounded-lg shadow-lg mt-2">
              <MobileNavLink href="#home">Home</MobileNavLink>
              <MobileNavLink href="#services">Services</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
              <button className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md font-raleway font-medium transition-colors mt-2">
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="font-raleway font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
  >
    {children}
  </a>
);

export default Navbar;
