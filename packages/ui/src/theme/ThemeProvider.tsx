"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const THEMES = ["dark","light","hc","gs-light","gs-dark","barbie"] as const;
export type Theme = typeof THEMES[number];

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; themes: readonly Theme[] };
const ThemeCtx = createContext<Ctx | null>(null);

export function OpenBBThemeProvider({ defaultTheme = "dark", children }:{
  defaultTheme?: Theme; children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const apply = (t: Theme) => {
    setTheme(t);
    const el = document.documentElement;
    el.setAttribute("data-theme", t);
    // keep legacy support: toggle .dark class for darkish themes
    el.classList.toggle("dark", t === "dark" || t === "hc" || t === "gs-dark");
    try { localStorage.setItem("openbb:theme", t); } catch {}
  };
  useEffect(() => {
    const saved = (localStorage.getItem("openbb:theme") as Theme) || defaultTheme;
    apply(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = useMemo(() => ({ theme, setTheme: apply, themes: THEMES }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useOpenBBTheme(){
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useOpenBBTheme must be used within OpenBBThemeProvider");
  return ctx;
}
