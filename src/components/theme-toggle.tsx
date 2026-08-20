import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "pe-theme";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const isLight = stored ? stored === "light" : false;
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  const toggle = () => {
    setLight((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem(KEY, next ? "light" : "dark");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="fixed left-5 bottom-5 z-50 h-12 w-12 md:h-13 md:w-13 rounded-full flex items-center justify-center border border-gold/40 bg-card text-gold shadow-[var(--shadow-gold)] hover:scale-110 transition-transform"
    >
      {light ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
