module.exports = {
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
      config.externals = [
        ...config.externals,
        'utf-8-validate',
        'bufferutil'
      ]
    }
    return config
  },
}