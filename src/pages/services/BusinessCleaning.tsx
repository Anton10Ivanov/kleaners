
import React from 'react';
import ServiceLayout from '@/components/services/ServiceLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BusinessCleaning = () => {
  const navigate = useNavigate();

  return (
    <ServiceLayout
      title="Business Cleaning Services"
      description="Professional cleaning solutions for your business space"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Office Cleaning</h3>
              <p className="text-gray-600">
                Regular cleaning service for offices, ensuring a clean and productive work environment.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Commercial Spaces</h3>
              <p className="text-gray-600">
                Comprehensive cleaning solutions for retail stores, restaurants, and other commercial establishments.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Process</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">
                We follow a systematic approach to ensure your business premises are maintained to the highest standards:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                <li>Initial assessment of your space</li>
                <li>Customized cleaning plan</li>
                <li>Regular quality checks</li>
                <li>Flexible scheduling options</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Professional Staff</h3>
              <p className="text-gray-600">Trained and vetted cleaning professionals</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Work around your business hours</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Satisfaction guaranteed with every clean</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-8">
          <Button 
            onClick={() => navigate('/?service=moving')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Book Business Cleaning
          </Button>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default BusinessCleaning;
