/** @type {import('next').NextConfig} */

const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com', 'example.com'],
  },
  // Enable gzip compression
  compress: true,
  // Configure webpack
  webpack: (config, { dev, isServer }) => {
    // Only run in production build
    if (!dev) {
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for third-party libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
          // Common chunk for code shared between pages
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,
};

module.exports = withBundleAnalyzer(nextConfig); 