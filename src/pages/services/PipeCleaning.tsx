
import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { pipeCleaningData } from "@/data/services/pipeCleaning";

const PipeCleaning = () => {
  return <ModernServiceTemplate data={pipeCleaningData} />;
};

export default PipeCleaning;
