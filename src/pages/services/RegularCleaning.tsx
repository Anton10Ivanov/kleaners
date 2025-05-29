
import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { regularCleaningData } from "@/data/services/regularCleaning";

const RegularCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Regular Cleaning" />
      <ModernServiceTemplate data={regularCleaningData} />
    </>
  );
};

export default RegularCleaning;
