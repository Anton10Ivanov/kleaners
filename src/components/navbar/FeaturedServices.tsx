
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from '@/hooks/use-media-query';

const FeaturedServices = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={`${isMobile ? 'flex' : 'hidden lg:flex'} items-center`}>
      {/* Business Solutions - now the main featured item */}
      <Link 
        to="/business-solutions" 
        className={`flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/15 rounded-lg transition-all duration-200 group touch-target ${
          isMobile ? 'text-sm' : ''
        }`}
      >
        <Building2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-primary`} />
        <span className="text-primary font-semibold">
          {isMobile ? 'Business' : 'Business Solutions'}
        </span>
        {!isMobile && <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">New</Badge>}
      </Link>
    </div>
  );
};

export default FeaturedServices;
