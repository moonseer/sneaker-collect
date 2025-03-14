/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com', 'example.com', 'images.stockx.com'],
  },
  // Enable gzip compression
  compress: true,
};

module.exports = nextConfig; 