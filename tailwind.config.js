module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US", "fr-FR"],
    defaultLocale: "en-US",
  },
  // purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  purge: "false",
  theme: {
    colors: {
      dark: {
        light: "#292929",
        med: "#1e1e1e",
        dark: "#121212",
        graytext: "rgba(255, 255, 255, 0.87)",
        panel: "#292929",
        yellow: "#F4C042",
        violet: "#D264EC",
        cyan: "#00E3EC",
        blue: "#52B9FF",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
};
