/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for development
  images: {
    domains: ['images.unsplash.com'], // Allows Unsplash images used in Dashboard.js
  },
  webpack(config) {
    // Add support for SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;