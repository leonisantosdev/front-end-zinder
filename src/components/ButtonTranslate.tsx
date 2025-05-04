import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const ButtonTranslate = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed bottom-0 right-0 z-10 p-5">
      <Button
            className="hover:cursor-pointer text-sm"
            variant="ghost"
            onClick={toggleLanguage}
          >
            {i18n.language === "pt" ? "🇺🇸" : "🇧🇷"}
      </Button>
    </div>
  )
}