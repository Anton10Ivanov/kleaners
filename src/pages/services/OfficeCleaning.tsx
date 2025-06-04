
import ResponsiveServiceTemplate from "@/components/services/ResponsiveServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { officeCleaningData } from "@/data/services/officeCleaning";

const OfficeCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Office Cleaning" />
      <ResponsiveServiceTemplate data={officeCleaningData} />
    </>
  );
};

export default OfficeCleaning;
