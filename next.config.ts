import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended to enable for better error handling and warnings
  images: {
    domains: ['m.media-amazon.com', 'manhoos.pk'], // Allow external images from Amazon's media domain
  },
  // Additional configurations can go here as needed

  // Example: Enabling TypeScript support for pages
  typescript: {
    // Fail the build on type errors
    ignoreBuildErrors: false,
  },

  // Example: Enabling Next.js's experimental features
  experimental: {
    esmExternals: true, // Example of experimental features (optional)
  },

  // Additional Next.js features could be configured here, e.g.:
  // i18n (for internationalization), redirects, rewrites, etc.
};

export default nextConfig;
