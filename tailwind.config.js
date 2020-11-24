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
    extend: {
      colors: {
        pri: "var(--clr-pr)",
        sec: "var(--clr-sec)",
        light: {
          text: "var(--clr-txt)",
          bg: "var(--clr-bg)"
        },
        dark: {
          text: "var(--clr-txt)",
          bg: "var(--clr-bg)"
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus", "dark"],
      textColor: ["hover", "focus", "dark"],
    },
  },
  plugins: [],
}
