const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "mir-s3-cdn-cf.behance.net",
      "firebasestorage.googleapis.com",
    ],
  },
  i18n,
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "USD",
  },
};
