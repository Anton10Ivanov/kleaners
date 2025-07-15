
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  href: string;
  features: string[];
  category: string;
  icon: any;
  services: any[];
}

interface EnhancedServiceCategoriesSectionProps {
  serviceCategories: ServiceCategory[];
}

export const EnhancedServiceCategoriesSection: React.FC<EnhancedServiceCategoriesSectionProps> = ({ 
  serviceCategories 
}) => {
  return (
    <section className="section-secondary section-container">
      <div className="container-lg">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Professional cleaning solutions tailored to your needs, from regular home maintenance to specialized deep cleaning
          </p>
        </div>
        
        <div className="service-grid">
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="service-category-card group">
                <div className="flex items-start justify-between mb-4">
                  <IconComponent className="service-category-icon" />
                  <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                    {category.price}
                  </span>
                </div>
                
                <h3 className="card-title">{category.title}</h3>
                <p className="card-description mb-6">{category.description}</p>
                
                <div className="mt-auto">
                  <ul className="space-y-2 mb-6">
                    {category.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-secondary-text">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={category.href}>
                    <Button className="btn-primary-consistent w-full group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
