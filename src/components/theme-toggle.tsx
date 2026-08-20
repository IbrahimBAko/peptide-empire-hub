import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "pe-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem(KEY, next ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors ${className}`}
    >
      {light ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
