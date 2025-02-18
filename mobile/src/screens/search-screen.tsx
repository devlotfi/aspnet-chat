import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function SearchScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <Text>Search users</Text>
    </View>
  );
}
