module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US", "fr-FR"],
    defaultLocale: "en-US",
  },
  purge: {
    content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
    // These options are passed through directly to PurgeCSS
  },
  theme: {
    colors: {
      dark: {
        light: "#292929",
        med: "#1e1e1e",
        dark: "#121212",
        graytext: "rgba(255, 255, 255, 0.87)",
        homepanel: "#292929",
        yellow: "#F4C042",
        bgyellow: "linear-gradient(276.04deg, #F4C042 4.78%, #EE2238 272.32%)",
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
  future: {
    purgeLayersByDefault: true,
  },
};
