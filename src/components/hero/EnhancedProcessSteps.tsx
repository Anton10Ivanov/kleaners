
import React from 'react';
import { Calendar, Users, Sparkles, ThumbsUp } from 'lucide-react';

export const EnhancedProcessSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Book Online",
      description: "Choose your service and preferred time slot in just a few clicks",
      icon: Calendar
    },
    {
      number: 2,
      title: "We Arrive",
      description: "Our vetted professionals arrive on time with all necessary supplies",
      icon: Users
    },
    {
      number: 3,
      title: "We Clean",
      description: "Thorough cleaning using eco-friendly products and proven techniques",
      icon: Sparkles
    },
    {
      number: 4,
      title: "You Relax",
      description: "Enjoy your spotless space while we handle all the cleaning details",
      icon: ThumbsUp
    }
  ];

  return (
    <section className="section-accent section-container">
      <div className="container-lg">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple, reliable, and hassle-free cleaning service in 4 easy steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="process-step">
                <div className="process-step-number smooth-transition scale-on-hover">
                  {step.number}
                </div>
                <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
