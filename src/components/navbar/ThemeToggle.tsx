
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useUserSettingsStore from "@/store/useUserSettingsStore";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { preferences, setDarkMode } = useUserSettingsStore();

  // Sync theme changes with our user settings store
  useEffect(() => {
    if (mounted && theme) {
      setDarkMode(theme === "dark");
    }
  }, [theme, setDarkMode, mounted]);

  // Only render theme toggle client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync user preferences with theme
  useEffect(() => {
    if (mounted && preferences.darkMode !== undefined) {
      setTheme(preferences.darkMode ? "dark" : "light");
    }
  }, [preferences.darkMode, setTheme, mounted]);

  if (!mounted) {
    return <div className="w-10 h-9"></div>; // Placeholder with same size
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 h-9 w-9 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
