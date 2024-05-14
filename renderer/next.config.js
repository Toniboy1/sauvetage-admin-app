const { withExpo } = require("@expo/next-adapter");

const getNextConfig = (useExpo) => {
  if (useExpo) {
    return withExpo({
      reactStrictMode: true,
      swcMinify: true,
      transpilePackages: [
        "react-native",
        "expo",
        // Add more React Native / Expo packages here...
      ],
      experimental: {
        forceSwcTransforms: true,
      },
    });
  } else {
    return {
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
      webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
      },
    };
  }
};

const useExpo = process.env.NEXT_PUBLIC_USE_EXPO === 'true';

module.exports = getNextConfig(useExpo);
