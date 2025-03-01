
import { useState } from "react";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Supported languages with their codes and names
const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "fr", name: "Français" },
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en");
  const navigate = useNavigate();

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // Here you would implement the actual language change logic
    console.log(`Language changed to ${langCode}`);
  };

  const handleAdminPanelClick = () => {
    navigate('/admin');
  };

  return (
    <div className="flex items-center gap-4">
      <Button 
        onClick={handleAdminPanelClick} 
        variant="ghost" 
        className="hover:text-primary transition-colors"
      >
        Panel
      </Button>
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
    </div>
  );
}
