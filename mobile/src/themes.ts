import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { MD3Colors, MD3Theme } from "react-native-paper/lib/typescript/types";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#A47CFF",
    background: "#F3F1F9",
    surface: "#FFFFFF",
    outline: "#C5BDD4",
    errorContainer: "#DD2525",
  } as MD3Colors,
} as MD3Theme;

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#A47CFF",
    background: "#192133",
    surface: "#222D46",
    outline: "#435680",
    errorContainer: "#DD2525",
  } as MD3Colors,
} as MD3Theme;
