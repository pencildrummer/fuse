module.exports = {
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
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  }
}