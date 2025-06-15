
import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-gray-900 hover:bg-gray-100">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLang === lang.code ? "bg-muted" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
