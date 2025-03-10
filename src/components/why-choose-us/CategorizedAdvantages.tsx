
import { getAdvantagesByCategories, categoryDisplayNames } from "./WhyChooseUsContent";
import { CategorySection } from "./CategorySection";

export const CategorizedAdvantages = () => {
  const advantagesByCategory = getAdvantagesByCategories();
  
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-8 mb-6">
        {Object.entries(advantagesByCategory).map(([category, items]) => (
          <CategorySection 
            key={category}
            title={categoryDisplayNames[category] || category}
            items={items}
          />
        ))}
      </div>
    </div>
  );
};
