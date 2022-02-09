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
}