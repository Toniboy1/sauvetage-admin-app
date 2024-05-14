const config = (api) =>{
  api.cache(true);

  const useExpo = process.env.NEXT_PUBLIC_USE_EXPO === 'true';

  if (useExpo) {
    return {
      presets: ["babel-preset-expo"],
    };
  } else {
    return {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-typescript",
      ],
    };
  }
};
export default config;