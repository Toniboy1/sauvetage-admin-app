/** @type {import('next').NextConfig} */
const electronWeb = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

const capacitorWeb = {
  output: "export",
  distDir: "dist/capacitor",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

if (process.env.CAPACITOR) {
  module.exports = capacitorWeb;
} else {
  module.exports = electronWeb;
}
