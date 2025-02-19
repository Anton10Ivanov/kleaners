
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-[#FEF7CD] dark:bg-gray-800 hover:bg-[#FEC6A1]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="font-bold text-2xl text-primary mb-4 hover:text-primary/80 transition-colors">
                Kleaners.de
              </h3>
            </Link>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Professional cleaning services for homes and businesses. Quality service guaranteed.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-gray-900 dark:text-white">Services</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/services/regular-cleaning" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Regular Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/move-in-out" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Move In/Out
                </Link>
              </li>
              <li>
                <Link to="/services/business-cleaning" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Business Cleaning
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Phone size={14} />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Mail size={14} />
                <span>info@kleaners.de</span>
              </li>
              <li className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <MapPin size={14} />
                <span>Berlin, Germany</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 text-gray-900 dark:text-white">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="text-primary hover:text-primary-hover transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary-hover transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary-hover transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 md:pt-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kleaners.de. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
