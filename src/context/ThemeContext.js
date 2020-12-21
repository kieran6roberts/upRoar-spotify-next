import { createContext, useContext } from "react";

import useTheme from "@/hooks/useTheme";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useColorTheme () {
  return useContext(ThemeContext);
}
export function useUpdateColorTheme () {
  return useContext(ThemeUpdateContext);
}

function ThemeProvider ({ children }) {
  const [
    isDark,
    setIsDark
  ] = useTheme();

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <ThemeUpdateContext.Provider value={{ setIsDark }}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
