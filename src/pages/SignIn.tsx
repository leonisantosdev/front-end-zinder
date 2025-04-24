import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SignInForm } from "@/components/ui/signin-form";

export const SignIn = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <SignInForm />
        <div className="absolute bottom-0 right-0 z-10 p-5">
          <Button
            className="hover:cursor-pointer text-sm"
            variant="ghost"
            onClick={toggleLanguage}
          >
            {i18n.language === "pt" ? "🇺🇸" : "🇧🇷"}
          </Button>
        </div>
      </div>
    </div>
  );
};
