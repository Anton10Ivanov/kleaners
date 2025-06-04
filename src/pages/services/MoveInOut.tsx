
import ResponsiveServiceTemplate from "@/components/services/ResponsiveServiceTemplate";
import ServiceBreadcrumb from "@/components/ui/service-breadcrumb";
import { moveInOutData } from "@/data/services/moveInOut";

const MoveInOut = () => {
  return (
    <>
      <ServiceBreadcrumb serviceName="Move In/Out Cleaning" />
      <ResponsiveServiceTemplate data={moveInOutData} />
    </>
  );
};

export default MoveInOut;
