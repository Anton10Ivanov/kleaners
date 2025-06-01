
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-8 bg-gray-900 text-theme-blue dark:bg-gray-900 dark:text-theme-blue relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[12px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png" 
                alt="Kleaners.de Logo" 
                className="h-8 w-8 object-contain" 
                style={{
                  filter: 'brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(190deg) brightness(100%) contrast(100%)'
                }} 
              />
              <h3 className="font-bold text-2xl text-theme-blue">
                Kleaners.de
              </h3>
            </Link>
            <p className="text-sm text-theme-blue md:text-xs font-medium text-left opacity-80">Cleanliness creates trust.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-theme-blue">Services</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/services/home-cleaning" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/office-cleaning" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Office Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/move-in-out" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Move In/Out
                </Link>
              </li>
              <li>
                <Link to="/business-solutions" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Business Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-theme-blue">About</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/about/values" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Company Values
                </Link>
              </li>
              <li>
                <Link to="/about/faq" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-theme-blue">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/contact" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/join-team" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  Join Our Team
                </Link>
              </li>
              <li className="flex items-center gap-1 text-theme-blue opacity-80 mt-3">
                <Phone size={14} />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-1 text-theme-blue opacity-80">
                <Mail size={14} />
                <span>info@kleaners.de</span>
              </li>
              <li className="flex items-center gap-1 text-theme-blue opacity-80">
                <MapPin size={14} />
                <span>Berlin, Germany</span>
              </li>
            </ul>

            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2 text-theme-blue">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-theme-blue opacity-80 hover:text-primary hover:opacity-100 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-theme-blue/20 pt-4 md:pt-8">
          <div className="text-center text-sm text-theme-blue opacity-80">
            <p>&copy; {new Date().getFullYear()} Kleaners.de. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Back to Top Arrow */}
      <Button
        onClick={scrollToTop}
        size="sm"
        className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </Button>
    </footer>
  );
};

export default Footer;
