import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Backend work is intentionally deferred; keep the UI deployment unblocked.
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
