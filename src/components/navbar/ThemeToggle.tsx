
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 h-16">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};
