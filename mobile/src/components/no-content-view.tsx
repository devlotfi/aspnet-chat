import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function NoContentView() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/empty.png")}
        contentFit="contain"
        style={{ height: 180, width: 180 }}
      ></Image>
      <Text style={{ fontSize: 20 }}>The list is empty</Text>
    </View>
  );
}
