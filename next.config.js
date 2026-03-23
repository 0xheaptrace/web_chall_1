/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      '/api/resource': ['./secrets/**/*', './assets/**/*'],
    },
  },
}

module.exports = nextConfig
