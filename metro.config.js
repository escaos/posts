const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { resolve } = require("path");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      "@": resolve(__dirname, "src"),
    },
  },
};

module.exports = withNativeWind(
  mergeConfig(getDefaultConfig(__dirname), config),
  {
    input: "./global.css",
  },
);
