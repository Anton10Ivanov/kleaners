
import ServiceLayout from "@/components/services/ServiceLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PostConstructionCleaning = () => {
  const navigate = useNavigate();

  return (
    <ServiceLayout 
      title="Post-Construction Cleaning"
      description="Professional cleaning services for newly constructed or renovated spaces"
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Comprehensive Post-Construction Clean-Up
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              After construction or renovation work, our specialized team ensures your space is thoroughly cleaned and ready for use. We handle everything from fine dust removal to detailed surface cleaning.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Removal of construction dust and debris</li>
              <li>• Deep cleaning of all surfaces</li>
              <li>• Window and glass cleaning</li>
              <li>• Floor cleaning and polishing</li>
              <li>• HVAC vent cleaning</li>
              <li>• Paint overspray removal</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Why Choose Our Service?
            </h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <span>Experienced team with specialized equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <span>Detailed cleaning checklist</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <span>Eco-friendly cleaning solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <span>Flexible scheduling</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default PostConstructionCleaning;
