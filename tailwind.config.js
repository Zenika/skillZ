module.exports = {
    important: true,
    // Active dark mode on class basis
    darkMode: "class",
    i18n: {
      locales: ["en-US", "fr-FR"],
      defaultLocale: "en-US"
    },
    purge: {
      content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"]
      // These options are passed through directly to PurgeCSS
    },
    theme: {},
    variants: {
      extend: {
        backgroundColor: ["checked"],
        borderColor: ["checked"],
        inset: ["checked"],
        zIndex: ["hover", "active"]
      }
    },
    plugins: [],
    future: {
      purgeLayersByDefault: true
    }
  };
  