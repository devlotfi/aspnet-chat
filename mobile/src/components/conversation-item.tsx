import { Pressable, View } from "react-native";
import { components } from "../__generated__/schema";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { useContext, useState } from "react";
import { $api } from "../api/openapi-client";
import { AuthContext } from "../context/auth-context";
import { useQueryClient } from "@tanstack/react-query";
import { DateUtils } from "../utils/date-utils";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  BottomTabsParamList,
  RootNativeStackParamList,
} from "../navigation-types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getOtherUserInfo } from "../utils/get-other-user-info";

interface Props {
  conversation: components["schemas"]["ConversationDto"];
}

type NavigationProps = NativeStackScreenProps<RootNativeStackParamList, "Home">;

export default function ConversationItem({ conversation }: Props) {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps["navigation"]>();

  if (!user) throw new Error("Missing user details");

  const otherUser = getOtherUserInfo(conversation, user);

  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("Chat", {
            conversation,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <Avatar.Text
          size={50}
          label={`${otherUser.firstName[0]}${otherUser.lastName[0]}`}
        ></Avatar.Text>
        <Text style={{ fontSize: 20 }}>
          {otherUser.firstName} {otherUser.lastName}
        </Text>
      </Pressable>
      <Divider style={{ backgroundColor: theme.colors.outline }}></Divider>
    </>
  );
}
