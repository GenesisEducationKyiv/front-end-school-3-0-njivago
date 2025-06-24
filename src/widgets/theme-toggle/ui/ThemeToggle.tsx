import type { FC } from "react";
import { useThemeStore } from "shared/lib/hooks";
import { Button } from "shared/ui/buttons";

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="icon"
      size="md"
      onClick={toggleTheme}
      className={className}
      icon={isDarkMode ? "sun" : "moon"}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    />
  );
};
