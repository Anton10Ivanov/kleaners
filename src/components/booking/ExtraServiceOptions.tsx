
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ExtraServiceOptionsProps {
  selectedExtras: string[];
  onExtraChange: (extras: string[]) => void;
}

const ExtraServiceOptions = ({
  selectedExtras,
  onExtraChange,
}: ExtraServiceOptionsProps) => {
  const extraOptions = [
    { id: "inside_fridge", label: "Inside Fridge", price: "+$15", icon: "🧊" },
    { id: "inside_oven", label: "Inside Oven", price: "+$15", icon: "🔥" },
    { id: "inside_cabinets", label: "Inside Cabinets", price: "+$15", icon: "🗄️" },
    { id: "laundry", label: "Laundry", price: "+$15", icon: "👕" },
    { id: "windows", label: "Windows", price: "+$15", icon: "🪟" },
    { id: "basement", label: "Basement", price: "+$15", icon: "🏠" },
  ];

  const handleExtraToggle = (id: string) => {
    if (selectedExtras.includes(id)) {
      onExtraChange(selectedExtras.filter((extra) => extra !== id));
    } else {
      onExtraChange([...selectedExtras, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Extra Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {extraOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedExtras.includes(option.id)
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id={option.id}
                checked={selectedExtras.includes(option.id)}
                onCheckedChange={() => handleExtraToggle(option.id)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label
                  htmlFor={option.id}
                  className="text-base font-medium cursor-pointer"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Label>
                <p className="text-theme-cta font-medium text-sm">
                  {option.price}
                </p>
                <p className="text-xs text-subtext dark:text-gray-400">
                  Deep clean included
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraServiceOptions;
