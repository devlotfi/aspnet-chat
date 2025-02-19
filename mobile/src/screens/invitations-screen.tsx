import { useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { $api } from "../api/openapi-client";
import { Image } from "expo-image";
import InvitationItem from "../components/invitation-item";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function RecievedInvitations() {
  const { data, isLoading } = $api.useQuery("get", "/invitations/recieved");

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  }

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <InvitationItem
            key={item.id}
            invitation={item}
            mode="RECIEVER"
          ></InvitationItem>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/empty.png")}
          contentFit="contain"
          style={{ height: 180, width: 180 }}
        ></Image>
        <Text style={{ fontSize: 20 }}>The list is empty</Text>
      </View>
    );
  }
}

function SentInvitations() {
  const { data, isLoading } = $api.useQuery("get", "/invitations/sent");

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  }

  if (data && data.length > 0) {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {data.map((item) => (
          <InvitationItem
            key={item.id}
            invitation={item}
            mode="SENDER"
          ></InvitationItem>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/empty.png")}
          contentFit="contain"
          style={{ height: 180, width: 180 }}
        ></Image>
        <Text style={{ fontSize: 20 }}>The list is empty</Text>
      </View>
    );
  }
}

export default function InvitationsScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<"RECIEVED" | "SENT">("RECIEVED");

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={{
          backgroundColor: theme.colors.surface,
          padding: 15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Button
          mode={tab === "RECIEVED" ? "contained" : "outlined"}
          style={{ flex: 1 }}
          onPress={() => setTab("RECIEVED")}
          icon={({ color, size }) => (
            <FontAwesomeIcon
              icon={faArrowDown}
              color={color}
              size={size}
            ></FontAwesomeIcon>
          )}
        >
          Recieved
        </Button>
        <Button
          mode={tab === "SENT" ? "contained" : "outlined"}
          style={{ flex: 1 }}
          onPress={() => setTab("SENT")}
          icon={({ color, size }) => (
            <FontAwesomeIcon
              icon={faArrowUp}
              color={color}
              size={size}
            ></FontAwesomeIcon>
          )}
        >
          Sent
        </Button>
      </View>
      {tab === "RECIEVED" ? (
        <RecievedInvitations></RecievedInvitations>
      ) : (
        <SentInvitations></SentInvitations>
      )}
    </View>
  );
}
