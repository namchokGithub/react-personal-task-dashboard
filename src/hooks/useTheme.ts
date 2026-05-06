import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const themeStorageKey = "personal-task-dashboard:theme";

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(themeStorageKey, theme);
  }, [isDarkMode, theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return {
    isDarkMode,
    theme,
    toggleTheme,
  };
}
