const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
    '@': './', // Maps @ to the project root directory
};

module.exports = withNativeWind(config, { input: "./global.css" });