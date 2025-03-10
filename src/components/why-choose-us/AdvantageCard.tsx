
import { LucideIcon } from "lucide-react";

type AdvantageCardProps = {
  title: string;
  icon: LucideIcon;
  description?: string;
  compact?: boolean;
  color?: string;
};

export const AdvantageCard = ({
  title,
  icon: Icon,
  description,
  compact = false,
  color,
}: AdvantageCardProps) => {
  if (compact) {
    return (
      <div className="p-3 md:p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 bg-white hover:shadow-lg border border-gray-100">
        <div className={`p-2 md:p-3 ${color || "bg-[#E3F4FF]"} rounded-full mb-2 md:mb-3`}>
          <Icon className={`w-5 h-5 md:w-7 md:h-7 ${color ? "text-white" : "text-[#0FA0CE]"}`} />
        </div>
        <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 mb-1 drop-shadow-md">
          {title}
        </h3>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className={`p-2 ${color || "bg-[#E3F4FF]"} rounded-full mr-3`}>
          <Icon className={`w-5 h-5 ${color ? "text-white" : "text-primary"}`} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          {description && (
            <p className="text-gray-600 text-sm">
              {description.split(".")[0]}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
