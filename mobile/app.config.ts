import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "ASP.NET Chat",
  slug: "ASPNET-Chat",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./icons/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./icons/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    icon: {
      light: "./icons/ios-light.png",
      dark: "./icons/ios-datk.png",
      tinted: "./icons/ios-tinted.png",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
      monochromeImage: "./icons/adaptive-icon.png",
    },
  },
  web: {
    favicon: "./icons/favicon.png",
  },
});
