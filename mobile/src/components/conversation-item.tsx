import { Pressable, View } from "react-native";
import { components } from "../__generated__/schema";
import {
  ActivityIndicator,
  Avatar,
  Button,
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
import { BottomTabsParamList } from "../navigation-types";

interface Props {
  conversation: components["schemas"]["ConversationDto"];
}

type NavigationProps = BottomTabScreenProps<BottomTabsParamList, "Search">;

export default function ConversationItem({ conversation }: Props) {
  const theme = useTheme();
  const { user: currrentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProps["navigation"]>();

  if (!currrentUser || !currrentUser.firstName || !currrentUser.lastName)
    throw new Error("Missing user details");

  return (
    <Pressable
      onPress={() => {}}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      }}
    >
      <Avatar.Text size={60} label={`LD`}></Avatar.Text>
      <Text style={{ fontSize: 20 }}>Test LOl</Text>
    </Pressable>
  );
}
