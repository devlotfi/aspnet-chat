import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";

export default function StartupNavbar() {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        gap: 10,
        backgroundColor: theme.colors.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 40, width: 40 }}
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
