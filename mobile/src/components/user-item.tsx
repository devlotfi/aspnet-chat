import { View } from "react-native";
import { components } from "../__generated__/schema";
import { Avatar, Text, useTheme } from "react-native-paper";

interface Props {
  user: components["schemas"]["UserPublicInfoDto"];
}

export default function UserItem({ user }: Props) {
  const theme = useTheme();

  if (!user.firstName || !user.lastName)
    throw new Error("Missing user details");

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Avatar.Text
          size={60}
          label={`${user.firstName[0]}${user.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 20 }}>{user.firstName}</Text>
      </View>

      <Text>{user.firstName}</Text>
    </View>
  );
}
