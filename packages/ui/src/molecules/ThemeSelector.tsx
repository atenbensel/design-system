"use client";
import { useOpenBBTheme } from "../src/theme/ThemeProvider";

const LABELS: Record<string,string> = {
  dark: "Dark",
  light: "Light",
  hc: "High Contrast",
  "gs-light": "Greyscale Light",
  "gs-dark": "Greyscale Dark",
  barbie: "Barbie ✨",
};

export function ThemeSelector({ className = "" }:{ className?: string }) {
  const { theme, setTheme, themes } = useOpenBBTheme();
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          className={`px-2 py-1 rounded-md border text-xs
                      hover:opacity-90
                      ${theme===t ? "underline font-semibold" : ""}`}>
          {LABELS[t]}
        </button>
      ))}
    </div>
  );
}
