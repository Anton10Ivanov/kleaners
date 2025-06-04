
import ResponsiveServiceTemplate from "@/components/services/ResponsiveServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { homeCleaningData } from "@/data/services/homeCleaning";

const HomeCleaning = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Home Cleaning" />
      <ResponsiveServiceTemplate data={homeCleaningData} />
    </>
  );
};

export default HomeCleaning;
