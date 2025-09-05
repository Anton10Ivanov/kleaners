
import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

export const EnhancedProfessionalTrustSection = () => {
  const trustBadges = [
    {
      icon: Shield,
      number: "100%",
      label: "Insured & Bonded"
    },
    {
      icon: Award,
      number: "4.9★",
      label: "Average Rating"
    },
    {
      icon: Users,
      number: "2,500+",
      label: "Happy Customers"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available"
    }
  ];

  return (
    <section className="section-secondary section-container-compact">
      <div className="container-lg">
        <div className="text-center mb-12">
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="section-subtitle">
            Professional cleaning services with guaranteed satisfaction and peace of mind
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="trust-badge smooth-transition hover-lift">
                <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="trust-number">{badge.number}</div>
                <div className="trust-label">{badge.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
