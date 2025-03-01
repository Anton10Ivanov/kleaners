
import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// Supported languages with their codes and names
const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "fr", name: "Français" },
];

interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: () => void;
}

export default function LanguageSelector({ currentLanguage = "en", onLanguageChange }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState(currentLanguage);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // Here you would implement the actual language change logic
    console.log(`Language changed to ${langCode}`);
    if (onLanguageChange) onLanguageChange();
  };

  return (
    <div className="relative">
      <button
        className="hover:text-primary transition-colors"
        onClick={() => document.getElementById("langMenu")?.classList.toggle("hidden")}
      >
        <Globe className="w-5 h-5" />
      </button>
      <div
        id="langMenu"
        className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`block px-4 py-2 text-sm w-full text-left ${
              currentLang === lang.code
                ? "bg-gray-100 dark:bg-gray-700 text-primary"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
