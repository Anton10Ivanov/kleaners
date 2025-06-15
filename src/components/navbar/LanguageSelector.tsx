
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Supported languages with their codes and names
const languages = [
  { code: "en", name: "EN" },
  { code: "de", name: "DE" },
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

  const currentLanguageDisplay = languages.find(lang => lang.code === currentLang)?.name || "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-10 px-3 text-gray-900 hover:bg-gray-100 font-medium">
          {currentLanguageDisplay}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-16">
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
