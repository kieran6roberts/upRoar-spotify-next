import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";

function useTheme () {
    const DARK_CLASS = "dark";
    const useThemeState = createPersistedState("colorPerference");
    const themeSettingPreference = useMediaQuery(
      {
        query: "(prefers-color-scheme: dark)"
      },
      undefined,
      (darkPreference) => setIsDark(darkPreference)
    );

    const [
      isDark,
      setIsDark
    ] = useThemeState(themeSettingPreference);

    useEffect(() => {
      if (isDark) {
        document.documentElement.classList.add(DARK_CLASS);
      }
      if (!isDark) {
        document.documentElement.classList.remove(DARK_CLASS);
      }
    }, [isDark]);

    return [
      isDark,
      setIsDark
    ];
  }

export default useTheme;
