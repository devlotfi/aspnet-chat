import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function ConvsersationsScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Convsersations</Text>
    </View>
  );
}
