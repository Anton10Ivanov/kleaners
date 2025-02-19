
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
};
