
import { LoadingSpinner } from "./loading-spinner";

interface SectionLoadingProps {
  height?: string;
}

export const SectionLoading = ({ height = "200px" }: SectionLoadingProps) => {
  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: height }}>
      <LoadingSpinner size="md" />
    </div>
  );
};

export default SectionLoading;
