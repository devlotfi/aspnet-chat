import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Avatar, Button, IconButton, Text, useTheme } from "react-native-paper";
import { RootNativeStackParamList } from "../navigation-types";
import { useNavigation } from "@react-navigation/native";
import { getOtherUserInfo } from "../utils/get-other-user-info";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

type Props = NativeStackScreenProps<RootNativeStackParamList, "Chat">;

export default function ChatScreen({ route }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<Props["navigation"]>();
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);

  if (!user) throw new Error("Missing user details");

  const otherUser = getOtherUserInfo(conversation, user);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 12,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <IconButton
          mode="contained"
          containerColor={theme.colors.background}
          size={20}
          icon={({ size }) => (
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              size={size}
              color={theme.colors.onBackground}
            ></FontAwesomeIcon>
          )}
          onPress={() => navigation.goBack()}
        ></IconButton>
        <Avatar.Text
          size={40}
          label={`${otherUser.firstName[0]}${otherUser.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 16 }}>
          {otherUser.firstName} {otherUser.lastName}
        </Text>
      </View>
      <Text>Chat {JSON.stringify(conversation)}</Text>
    </View>
  );
}
