module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize:{
      xxs: "var(--fxxs)",
      xs: "var(--fxs)",
      sm: "var(--fsm)",
      md: "var(--fmd)",
      lg: "var(--flg)",
      xl: "var(--fxl)",
      xxl: "var(--fxxl)",
    },
    screens: {
      "mobile": "350px",
      "mobile-wide": "480px",
      "tablet": "768px",
      "tablet-wide": "976px",
      "desktop": "1200px",
      "desktop-large": "1440px"
    },
    extend: {
      colors: {
        primary: "var(--clr-pr)",
        secondary: "var(--clr-sc)",
        light: {
          "text-clr": "var(--clr-txt)",
          "bg-clr": "var(--clr-bg)"
        },
        dark: {
          "text-clr": "var(--clr-txt)",
          "bg-clr": "var(--clr-bg)"
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus", "dark"],
      textColor: ["hover", "focus", "dark"]
    },
  },
  plugins: [],
}
