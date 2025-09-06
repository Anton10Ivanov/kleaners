
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, ArrowUp, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { popularServices } from '@/components/navbar/navigationData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-8 bg-dark-bg text-dark-foreground relative">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-[12px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png" 
                alt="Kleaners.de Logo" 
                className="h-8 w-8 object-contain" 
                style={{
                  filter: 'brightness(0) saturate(100%) invert(100%)'
                }} 
              />
              <h3 className="font-bold text-2xl text-dark-foreground">
                Kleaners.de
              </h3>
            </Link>
            <p className="text-sm text-dark-foreground md:text-xs font-medium text-left opacity-80 mb-4">
              Cleanliness creates trust.
            </p>
            
            {/* Enhanced Business Solutions Promotion */}
            <div className="bg-secondary border border-accent/30 rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-accent/20 rounded-lg">
                  <Star className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-bold text-accent">Business Partners</span>
                <Badge variant="secondary" className="bg-warning text-primary border-0 text-xs px-2 py-0.5">
                  Save 25%
                </Badge>
              </div>
              <p className="text-xs text-dark-foreground opacity-90 mb-3 leading-relaxed">
                Join our exclusive corporate partnership program and unlock premium benefits for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/business-solutions" className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    Explore Benefits
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact" className="flex-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-8 text-xs border-dark-foreground/30 text-dark-foreground hover:bg-dark-foreground/10 hover:border-dark-foreground/50 transition-all duration-200"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-dark-foreground">Popular Services</h4>
            <ul className="space-y-2 text-sm md:text-base">
              {popularServices.map((service, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Link to={service.href} className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors flex-1">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-dark-foreground/20">
                <Link to="/services" className="text-accent hover:text-accent/80 transition-colors font-medium text-sm">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-dark-foreground">About</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/about/values" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  Company Values
                </Link>
              </li>
              <li>
                <Link to="/about/faq" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-dark-foreground">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/contact" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/contact?tab=join" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  Join Our Team
                </Link>
              </li>
              <li className="flex items-center gap-1 text-dark-foreground opacity-80 mt-3">
                <Phone size={14} />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-1 text-dark-foreground opacity-80">
                <Mail size={14} />
                <span>info@kleaners.de</span>
              </li>
              <li className="flex items-center gap-1 text-dark-foreground opacity-80">
                <MapPin size={14} />
                <span>Berlin, Germany</span>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2 text-dark-foreground">Business Hours</h5>
              <div className="space-y-1 text-xs text-dark-foreground opacity-80">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="text-xs text-accent mt-2">
                  Emergency services 24/7
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2 text-dark-foreground">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-dark-foreground opacity-80 hover:text-accent hover:opacity-100 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-foreground/20 pt-4 md:pt-8">
          <div className="text-center text-sm text-dark-foreground opacity-80">
            <p>&copy; {new Date().getFullYear()} Kleaners.de. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Back to Top Arrow - moved to LEFT corner */}
      <Button
        onClick={scrollToTop}
        size="sm"
        className="absolute bottom-4 left-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </Button>
    </footer>
  );
};

export default Footer;
