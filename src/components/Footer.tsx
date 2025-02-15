
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return <footer className="pt-16 pb-8 bg-sky-200 hover:bg-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-2xl text-primary mb-4">Kleaners.de</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professional cleaning services for homes and businesses. Quality service guaranteed.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/regular-cleaning" className="text-gray-600 dark:text-gray-400 hover:text-primary">Regular Cleaning</Link></li>
              <li><Link to="/services/move-in-out" className="text-gray-600 dark:text-gray-400 hover:text-primary">Move In/Out</Link></li>
              <li><Link to="/services/business-cleaning" className="text-gray-600 dark:text-gray-400 hover:text-primary">Business Cleaning</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>info@kleaners.de</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>Berlin, Germany</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kleaners.de. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
