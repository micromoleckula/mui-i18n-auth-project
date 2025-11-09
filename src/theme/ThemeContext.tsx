import { createContext, useContext } from "react";

type Mode = "light" | "dark";

export type ThemeModeContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined
);

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
};
