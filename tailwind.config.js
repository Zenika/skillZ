module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  // purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    colors: {
      dark: {
        light: "#292929",
        med: "#1e1e1e",
        dark: "#121212",
        graytext: "rgba(255, 255, 255, 0.87)",
        graybutton: "rgba(255, 255, 255, 0.1)",
        panel: "#292929",
        yellow: "#F4C042",
        violet: "#D264EC",
        cyan: "#00E3EC",
        blue: "#52B9FF",
        red: "#bf1d67",
      },
    },
    backgroundPosition: {
      search: "right 10% bottom 50%",
    },
    minHeight: {
      homePanel: "300px",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
