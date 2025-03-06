
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Check, Building, Clock, Calendar, Shield, Star } from "lucide-react";

const BusinessCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Business Cleaning Services
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Professional cleaning solutions tailored for businesses of all sizes. Keep your workspace pristine and make a lasting impression on clients and employees.
              </p>
            </section>

            {/* Services Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Office Cleaning</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Regular cleaning service for offices, ensuring a clean and productive work environment for your team.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Commercial Spaces</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Comprehensive cleaning solutions for retail stores, restaurants, and other commercial establishments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Process Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Initial Assessment",
                    description: "We evaluate your space and specific needs"
                  },
                  {
                    title: "Custom Plan",
                    description: "We create a tailored cleaning schedule"
                  },
                  {
                    title: "Quality Service",
                    description: "Our professional team executes the plan"
                  },
                  {
                    title: "Regular Reviews",
                    description: "We maintain high standards with quality checks"
                  }
                ].map((step, index) => (
                  <Card key={index} className="relative overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Advantages Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Building, text: "Industry-specific cleaning protocols" },
                  { icon: Shield, text: "Trained and vetted cleaning professionals" },
                  { icon: Calendar, text: "Flexible scheduling around business hours" },
                  { icon: Clock, text: "Consistent cleaning times you can rely on" },
                  { icon: Check, text: "Quality guaranteed with every clean" },
                  { icon: Star, text: "High satisfaction rate among business clients" },
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <advantage.icon className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{advantage.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Industries Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Industries We Serve</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Offices & Coworking",
                  "Retail Stores",
                  "Restaurants & Cafes",
                  "Medical Facilities",
                  "Educational Institutions",
                  "Hotels & Hospitality",
                  "Industrial Facilities",
                  "Event Spaces"
                ].map((industry, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 dark:text-gray-300">{industry}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Ready to elevate your business environment with professional cleaning services?
              </p>
              <Button 
                onClick={() => navigate('/?service=business')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Book Business Cleaning
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessCleaning;
