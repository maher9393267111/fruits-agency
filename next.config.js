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

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
       // fixes proxy-agent dependencies
       net: false,
       dns: false,
       tls: false,
       assert: false,
       // fixes next-i18next dependencies
       path: false,
       fs: false,
       // fixes mapbox dependencies
       events: false,
       // fixes sentry dependencies
       async_hooks: false,
      //  topLevelAwait: true,
      //  layers: true,
      };
    }

    return config;
  },

};
