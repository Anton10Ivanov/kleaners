
import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { homeCleaningData } from "@/data/services/homeCleaning";

const HomeCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Home Cleaning" />
      <ModernServiceTemplate data={homeCleaningData} />
    </>
  );
};

export default HomeCleaning;
