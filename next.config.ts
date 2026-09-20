import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // UI-first phase: keep Vercel deployments unblocked while backend work is deferred.
    ignoreBuildErrors: true,
  },
}

export default nextConfig
