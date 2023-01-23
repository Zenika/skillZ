const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.fakercloud.com",
      "loremflickr.com",
      "s.gravatar.com",
    ],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
