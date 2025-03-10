
import { advantagesByCategory } from "./WhyChooseUsContent";
import { CategorySection } from "./CategorySection";

export const CategorizedAdvantages = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-8 mb-6">
        {Object.entries(advantagesByCategory).map(([category, items]) => (
          <CategorySection 
            key={category}
            title={category === 'trust' ? 'Trust & Security' : 
                 category === 'convenience' ? 'Convenience' : 'Flexibility & Quality'}
            items={items}
          />
        ))}
      </div>
    </div>
  );
};
