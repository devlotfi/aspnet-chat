import { View } from "react-native";
import { components } from "../__generated__/schema";
import { Text } from "react-native-paper";

interface Props {
  message: components["schemas"]["MessageDto"];
}

export default function MessageItem({ message }: Props) {
  return (
    <View>
      <Text>{message.text}</Text>
    </View>
  );
}
