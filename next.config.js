const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    domains: [
      {
        domain: "fr.staging.skillz.zenika.com",
        defaultLocale: "fr",
      },
      {
        domain: "en.staging.skillz.zenika.com",
        defaultLocale: "en",
      },
      {
        domain: "fr.skillz.zenika.com",
        defaultLocale: "fr",
      },
      {
        domain: "en.skillz.zenika.com",
        defaultLocale: "en",
      },
    ],
  },
});
