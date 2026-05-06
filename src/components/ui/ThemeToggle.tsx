import { Button } from "./Button";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button aria-pressed={isDarkMode} onClick={toggleTheme} variant="secondary">
      {isDarkMode ? "Light mode" : "Dark mode"}
    </Button>
  );
}
