import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "ASP.NET Chat",
  slug: "ASPNET-Chat",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icons/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/icons/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    icon: {
      light: "./assets/icons/ios-light.png",
      dark: "./assets/icons/ios-datk.png",
      tinted: "./assets/icons/ios-tinted.png",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
      monochromeImage: "./assets/icons/adaptive-icon.png",
    },
  },
  web: {
    favicon: "./assets/icons/favicon.png",
  },
});
