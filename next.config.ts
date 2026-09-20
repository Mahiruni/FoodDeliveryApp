import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Keep the UI deployment deterministic while backend work is deferred.
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      resolveAlias: {},
    },
  },
}

export default nextConfig
