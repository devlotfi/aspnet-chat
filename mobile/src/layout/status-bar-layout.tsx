import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

export default function StatusBarLayout({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <>
      {children}
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.background}
        style={colorScheme === "light" ? "dark" : "light"}
      ></StatusBar>
    </>
  );
}
