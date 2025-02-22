import { View } from "react-native";
import { components } from "../__generated__/schema";
import { Avatar, Text, useTheme } from "react-native-paper";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { DateUtils } from "../utils/date-utils";

interface Props {
  message: components["schemas"]["MessageDto"];
}

export default function MessageItem({ message }: Props) {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  if (!user) throw new Error("No user");

  const sender = message.user.id === user.id;

  return (
    <View
      style={{
        alignItems: sender ? "flex-end" : "flex-start",
        paddingVertical: 14,
      }}
    >
      <View
        style={{
          flexDirection: sender ? "row" : "row-reverse",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            alignItems: sender ? "flex-end" : "flex-start",
            position: "relative",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: sender
                ? theme.colors.primary
                : theme.colors.surface,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{message.text}</Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              opacity: 0.5,
              position: "absolute",
              bottom: -15,
              paddingLeft: 5,
            }}
          >
            {DateUtils.formatDateTime(new Date(message.timestamp))}
          </Text>
        </View>
        <Avatar.Text
          size={38}
          label={`${message.user.firstName[0]}${message.user.lastName[0]}`}
        ></Avatar.Text>
      </View>
    </View>
  );
}
