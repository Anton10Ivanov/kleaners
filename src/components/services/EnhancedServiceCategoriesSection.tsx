
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building, Sparkles, Car, Users, Brush, TreePine, Droplets, HardHat, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const modernServiceCategories = [
  {
    id: 'home-cleaning',
    title: 'Home Cleaning',
    description: 'Comprehensive residential cleaning services for your comfort and peace of mind',
    icon: Home,
    features: ['Regular cleaning', 'Deep cleaning', 'Move-in/out cleaning'],
    category: 'residential'
  },
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning solutions to maintain a productive workplace',
    icon: Building,
    features: ['Daily office maintenance', 'Medical practice cleaning', 'Industrial cleaning'],
    category: 'commercial'
  },
  {
    id: 'specialized-cleaning',
    title: 'Specialized Cleaning',
    description: 'Expert cleaning services for unique requirements and challenging situations',
    icon: Sparkles,
    features: ['Post-construction cleanup', 'Intensive deep cleaning', 'Disinfection services'],
    category: 'specialized'
  },
  {
    id: 'vehicle-cleaning',
    title: 'Vehicle & Garage',
    description: 'Complete vehicle and parking facility cleaning services',
    icon: Car,
    features: ['Car interior/exterior', 'Underground garage cleaning', 'Fleet maintenance'],
    category: 'automotive'
  },
  {
    id: 'care-facilities',
    title: 'Care Facilities',
    description: 'Specialized cleaning for healthcare and care environments',
    icon: Users,
    features: ['Medical facility cleaning', 'Kindergarten cleaning', 'Senior care facilities'],
    category: 'healthcare'
  },
  {
    id: 'surface-cleaning',
    title: 'Surface & Exterior',
    description: 'Professional cleaning for all types of surfaces and outdoor areas',
    icon: Brush,
    features: ['Window cleaning', 'Facade cleaning', 'Stone surface cleaning'],
    category: 'exterior'
  },
  {
    id: 'landscaping',
    title: 'Garden & Outdoor',
    description: 'Complete outdoor maintenance and landscaping services',
    icon: TreePine,
    features: ['Gardening services', 'Pool cleaning', 'Outdoor maintenance'],
    category: 'outdoor'
  },
  {
    id: 'environmental',
    title: 'Environmental',
    description: 'Specialized environmental and restoration cleaning services',
    icon: Droplets,
    features: ['Mold removal', 'Water damage cleanup', 'Graffiti removal'],
    category: 'environmental'
  }
];

export const EnhancedServiceCategoriesSection: React.FC = () => {
  return (
    <section className="section-secondary section-container">
      <div className="container-lg">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Complete Service Range</h2>
          <p className="section-subtitle">
            From everyday maintenance to specialized solutions – we cover all your cleaning needs with professional expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modernServiceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="service-category-card group">
                <div className="flex items-center justify-between mb-4">
                  <div className="service-category-icon-wrapper">
                    <IconComponent className="service-category-icon" />
                  </div>
                </div>
                
                <h3 className="card-title mb-3">{category.title}</h3>
                <p className="card-description mb-4 text-sm">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-secondary-text">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button className="btn-primary-consistent">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            Explore our complete catalog of {modernServiceCategories.length}+ service categories and find the perfect solution for your needs
          </p>
        </div>
      </div>
    </section>
  );
};
