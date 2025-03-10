
import { AdvantageItem } from "./WhyChooseUsTypes";
import { AdvantageCard } from "./AdvantageCard";

type CategoryProps = {
  title: string;
  items: AdvantageItem[];
  maxItems?: number;
};

export const CategorySection = ({ title, items, maxItems = 6 }: CategoryProps) => {
  return (
    <div className="w-full md:w-auto">
      <h3 className="text-xl font-bold text-center md:text-left mb-4 capitalize">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, maxItems).map((item, index) => (
          <AdvantageCard
            key={`${title}-${index}`}
            title={item.title}
            icon={item.icon}
            description={item.description}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};
