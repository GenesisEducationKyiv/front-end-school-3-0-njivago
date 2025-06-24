import type { PropsWithChildren } from "react";
import { useThemeStore } from "shared/lib/hooks";
import { useEffect } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return children;
};
