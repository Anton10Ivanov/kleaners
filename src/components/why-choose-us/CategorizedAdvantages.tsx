
import { advantagesByCategory } from "./WhyChooseUsContent";
import { CategorySection } from "./CategorySection";

export const CategorizedAdvantages = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.entries(advantagesByCategory).map(([category, items]) => (
          <CategorySection 
            key={category}
            title={category === 'trust' ? 'Trust & Security' : 
                 category === 'convenience' ? 'Convenience' : 'Flexibility'}
            items={items}
          />
        ))}
      </div>
    </div>
  );
};
