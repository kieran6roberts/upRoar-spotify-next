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
      xxxl: "var(--fxxxl)",
    },
    extend: {
      textColor: {
        txt: "var(--clr-txt)",
        pri: "var(--clr-pri)",
        sec: "var(--clr-sec)",
        acc: "var(--clr-acc)",
      },
      backgroundColor: {
        pri: "var(--clr-bg-pri)",
        sec: "var(--clr-bg-sec)",
        txt: "var(--clr-txt)"
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
