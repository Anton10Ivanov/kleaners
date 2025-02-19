import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceLayout from "@/components/services/ServiceLayout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import BusinessBookingForm from "@/components/booking/business/BusinessBookingForm";

const BusinessCleaning = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<BookingFormData>();

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    {
      title: "Step 1: Initial Consultation",
      description: "Discuss your business needs and requirements"
    },
    {
      title: "Step 2: Customized Plan",
      description: "Receive a tailored cleaning plan and quote",
      details: [
        "Frequency of cleaning",
        "Specific areas and requirements",
        "Special equipment needs",
        "Staff requirements",
        "Scheduling preferences"
      ]
    },
    {
      title: "Step 3: Service Agreement",
      description: "Review and finalize cleaning contract",
      details: [
        "Scope of services",
        "Schedule confirmation",
        "Payment terms",
        "Quality assurance measures",
        "Communication protocols"
      ]
    }
  ];

  const features = [
    "Customized cleaning schedules",
    "Professional cleaning staff",
    "Quality assurance program",
    "Green cleaning options",
    "Regular inspections",
    "24/7 support",
    "Flexible contract terms",
    "Insurance coverage"
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/* Steps Section */}
            <section className="mb-16">
              <div className="grid gap-8 md:grid-cols-3">
                {steps.map((step, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Why Choose Our Business Cleaning Service?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center">
              <Button 
                onClick={handleNext} 
                className="bg-primary hover:bg-primary/90"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <div className="max-w-3xl mx-auto">
            <BusinessBookingForm form={form} postalCode="" />
            <div className="flex justify-between mt-8">
              <Button onClick={handleBack} variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ServiceLayout
      title="Business Cleaning Service"
      description="Professional cleaning solutions tailored for your business needs"
    >
      {renderStepContent()}
    </ServiceLayout>
  );
};

export default BusinessCleaning;
