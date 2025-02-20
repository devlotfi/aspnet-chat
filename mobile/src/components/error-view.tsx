import { View } from "react-native";
import { Text } from "react-native-paper";

export default function ErrorView() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>An error occured</Text>
    </View>
  );
}
