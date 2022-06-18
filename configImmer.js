const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts = ["jsx", "js", "ts", "tsx", "mjs"];

module.exports = defaultConfig;
