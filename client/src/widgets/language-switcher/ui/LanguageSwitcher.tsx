import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { DropdownItemButton } from "shared/ui/buttons";
import { Dropdown } from "shared/ui/dropdown";
import type { LanguageSwitcherProps } from "../lib/LanguageSwitcher.type";
import { twMerge } from "tailwind-merge";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage =
    i18n.language === "uk" ? t("language.ukrainian") : t("language.english");

  return (
    <div className={twMerge("flex items-center", className)}>
      <Dropdown label={currentLanguage}>
        <div className="flex flex-col gap-1 p-1 min-w-32">
          <DropdownItemButton
            onClick={() => changeLanguage("en")}
            active={i18n.language === "en"}
          >
            {t("language.english")}
          </DropdownItemButton>
          <DropdownItemButton
            onClick={() => changeLanguage("uk")}
            active={i18n.language === "uk"}
          >
            {t("language.ukrainian")}
          </DropdownItemButton>
        </div>
      </Dropdown>
    </div>
  );
};
