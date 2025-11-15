const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Configure MDX support
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Environment variables available in browser
  env: {
    NEXT_PUBLIC_ANALYTICS_API: process.env.NEXT_PUBLIC_ANALYTICS_API || 'https://analytics.weather-mcp.dev/v1',
    NEXT_PUBLIC_REFRESH_INTERVAL: process.env.NEXT_PUBLIC_REFRESH_INTERVAL || '30000',
  },

  // Optimize images
  images: {
    domains: ['weather-mcp.dev'],
  },

  // Cache headers for static assets
  // Note: Security headers (CSP, X-Frame-Options, etc.) are now set in middleware.ts
  async headers() {
    return [
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
