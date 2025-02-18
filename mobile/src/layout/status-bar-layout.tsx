import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function StatusBarLayout({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
      {children}
      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.surface}
        style={colorScheme === "light" ? "dark" : "light"}
      ></StatusBar>
    </View>
  );
}
