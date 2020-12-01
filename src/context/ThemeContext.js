import { useState, createContext, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = useContext(ThemeContext);

const getInitTheme = () => {
  const persistedThemePreference = window.localStorage.getItem("theme");
  if (typeof persistedThemePreference === "string") {
    return persistedThemePreference && persistedThemePreference;
  }

  const userPrefersThemePreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  if (typeof userPrefersThemePreference === "boolean") {
       return userPrefersThemePreference ? "dark" : "light";
     }

  else return "light";
};

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(getInitTheme);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    setTheme(prevTheme  => {
      if (typeof prevTheme !== "string") throw new Error("theme must be string");
      if (prevTheme === "light") return "dark";
      else return "light";
    });

    window.localStorage.setItem("theme", themeValue);

  };

  return (
    <ThemeProvider value={theme, toggleTheme}>
      {children}
    </ThemeProvider>
  )
};

export default ThemeProvider;