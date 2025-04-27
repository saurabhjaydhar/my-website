/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['user-images.githubusercontent.com'],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    config.module.rules.push({
      test: /framer-motion/,
      sideEffects: false
    });
    return config;
  },
  transpilePackages: ['framer-motion']
}

module.exports = nextConfig