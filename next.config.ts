import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
  },
}

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')
export default withNextIntl(nextConfig)
