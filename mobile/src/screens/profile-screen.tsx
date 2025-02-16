import { useContext } from "react";
import { View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { AuthContext } from "../context/auth-context";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  if (!user || !user.firstName || !user.lastName)
    throw new Error("User missing data");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Avatar.Text
        label={`${user.firstName[0]}${user.lastName[0]}`}
      ></Avatar.Text>
      <Text>Profile</Text>
    </View>
  );
}
