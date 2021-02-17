module.exports = {
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
  distDir: ".next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
};
