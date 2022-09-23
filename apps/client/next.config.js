const withTM = require('next-transpile-modules')([
  '@fuse-labs/core-client',
  '@fuse-labs/core-ui',
]);

const config = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/workspace',
        permanent: true
      },
      {
        source: '/settings',
        destination: '/settings/general',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/settings',
        destination: '/settings/general',
      },
    ]
  },

  webpack: (config, options) => {
    // To avoid warning missing bufferutil anf utf-8
    // See: https://github.com/netlify/netlify-lambda/issues/179
    if (options.isServer) {
      // Server side
      config.externals = [
        ...config.externals,
        'utf-8-validate',
        'bufferutil'
      ]
    }

    //console.log('Adding loader - ', options.isServer ? 'SERVER' : 'CLIENT')

    // SVG Loader for @fuse-labs/core-ui package
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withTM(config);