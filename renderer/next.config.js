/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}
