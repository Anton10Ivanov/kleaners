
import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { officeCleaningData } from "@/data/services/officeCleaning";

const OfficeCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Office Cleaning" />
      <ModernServiceTemplate data={officeCleaningData} />
    </>
  );
};

export default OfficeCleaning;
