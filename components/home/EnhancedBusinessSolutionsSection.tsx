
import React from 'react';
import Link from 'next/link';
import { Building2, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EnhancedBusinessSolutionsSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "After-hours and weekend cleaning to fit your business operations"
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage for complete peace of mind"
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "Consistent, professional results with satisfaction guarantee"
    }
  ];

  return (
    <section className="section-accent section-container">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                For Businesses
              </span>
            </div>
            
            <h2 className="section-title text-left mb-6">
              Professional Office & Commercial Cleaning
            </h2>
            
            <p className="text-lg text-secondary-text leading-relaxed mb-8">
              Keep your workplace spotless and professional with our comprehensive commercial cleaning services. 
              From daily office maintenance to specialized facility cleaning, we ensure your business environment 
              reflects your commitment to excellence.
            </p>
            
            <div className="form-spacing-loose mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-heading-color mb-1">{feature.title}</h3>
                      <p className="text-secondary-text text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Link href="/business-solutions">
              <Button className="btn-primary-consistent group">
                Learn More About Business Solutions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl card-spacing-lg shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-heading-color mb-6">Popular Business Services</h3>
              <div className="form-spacing-relaxed">
                {[
                  "Daily Office Cleaning",
                  "Restroom Sanitization",
                  "Floor Care & Maintenance",
                  "Window Cleaning",
                  "Specialized Equipment Cleaning"
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-secondary-text">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
