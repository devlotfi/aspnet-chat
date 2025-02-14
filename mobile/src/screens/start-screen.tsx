import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { Image } from "expo-image";
import StartupNavbar from "../components/startup-navbar";

type Props = NativeStackScreenProps<RootNativeStackParamList, "Start">;

export default function StartScreen() {
  const theme = useTheme();
  const navigation = useNavigation<Props["navigation"]>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StartupNavbar></StartupNavbar>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={require("../assets/chat-phone.png")}
          style={{ height: 300, width: 300 }}
          contentFit="contain"
        ></Image>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: 200,
          }}
        >
          Welcome to ASP.NET Chat
        </Text>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          gap: 30,
        }}
      >
        <Button
          mode="contained"
          contentStyle={{ padding: 7 }}
          onPress={() => navigation.navigate("Login")}
        >
          Get started
        </Button>
      </View>
    </View>
  );
}
