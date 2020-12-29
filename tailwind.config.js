module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: [
      "./src/components/**/*.js",
      "./src/containers/**/*.js",
      "./pages/**/*.js"
    ],
    enabled: false,
    options: {
      safelist: ["dark, light"]
    }
  },
  darkMode: "class",
  theme: {
    fontSize: {
      xxs: "var(--fxxs)",
      xs: "var(--fxs)",
      sm: "var(--fsm)",
      md: "var(--fmd)",
      lg: "var(--flg)",
      xl: "var(--fxl)",
      xxl: "var(--fxxl)",
      xxxl: "var(--fxxxl)"
    },
    extend: {
      textColor: {
        txt: "var(--clr-txt)",
        pri: "var(--clr-pri)",
        sec: "var(--clr-sec)",
        acc: "var(--clr-acc)"
      },
      backgroundColor: {
        pri: "var(--clr-bg-pri)",
        sec: "var(--clr-bg-sec)",
        txt: "var(--clr-txt)"
      },
      animation: {
        bounceFirst: "bounce 1500ms ease-in-out infinite",
        bounceSecond: "bounce 1500ms ease-in-out 200ms infinite",
        bounceThird: "bounce 1500ms ease-in-out 400ms infinite"
      },
      keyframes: {
        bounce: {
          "0%": { transform: "translateY(0)" },
          "33%": { transform: "translateY(4px)" },
          "66%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0)" }
        }
       }
    }
  },
  variants: {
    extend: {
      backgroundColor: [
        "hover",
        "focus",
        "dark"
      ],
      textColor: [
        "hover",
        "focus",
        "dark"
      ]
    }
  },
  plugins: []
};
