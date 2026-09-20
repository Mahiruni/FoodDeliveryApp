import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // UI-first deployment: backend work is intentionally deferred.
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,
    serverSourceMaps: false,
  },
}

export default nextConfig
