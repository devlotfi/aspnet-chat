import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";

export default function MainNavbar() {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        gap: 10,
        backgroundColor: theme.colors.surface,
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 30, width: 30 }}
        contentFit="contain"
      ></Image>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          ASP.NET
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Chat
        </Text>
      </View>
    </View>
  );
}
