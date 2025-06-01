import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const FeaturedServices = () => {
  return <div className="hidden lg:flex items-center space-x-6">
      <Link to="/services" className="text-theme-blue hover:text-primary transition-colors font-medium">
        Services
      </Link>
      
      {/* Highlighted Business Solutions */}
      <Link to="/business-solutions" className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/15 rounded-lg transition-all duration-200 group">
        <Building2 className="h-4 w-4 text-primary" />
        <span className="text-primary font-semibold">Business Solutions</span>
        
      </Link>
    </div>;
};
export default FeaturedServices;