
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import ServiceLayout from "@/components/services/ServiceLayout";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useBookingForm } from "@/hooks/useBookingForm";
import BusinessBookingForm from "@/components/booking/business/BusinessBookingForm";
import { toast } from "sonner";

const BusinessCleaning = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { form, watch } = useBookingForm();
  const postalCode = watch('postalCode') || '';

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
    if (currentStep === 1) {
      toast.success("Great! Let's complete your business cleaning details.");
    }
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
      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <BusinessBookingForm form={form} postalCode={postalCode} />
            <div className="flex justify-between mt-8">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {currentStep < 3 && (
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
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
