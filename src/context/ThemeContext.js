import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";

const setTheme = () => {
  const darkMode = "dark";
  const useThemeState = createPersistedState("colorPerference");
  const themeSettingPreference = useMediaQuery({
    query: "(prefers-color-scheme: dark)"
  },
  undefined,
  darkPreference => setIsDark(darkPreference)
  );

  const [ isDark, setIsDark ] = useThemeState(themeSettingPreference);

  useEffect( () => {
    if (isDark) document.documentElement.classList.add(darkMode);
    if (!isDark) document.documentElement.classList.remove(darkMode);
  }, [isDark])

  return [ isDark, setIsDark ];
};

export default setTheme;