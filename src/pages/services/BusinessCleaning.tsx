
import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { businessCleaningData } from "@/data/services/businessCleaning";

const BusinessCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Business Cleaning" />
      <ModernServiceTemplate data={businessCleaningData} />
    </>
  );
};

export default BusinessCleaning;
